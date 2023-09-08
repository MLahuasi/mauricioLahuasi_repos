import { AppDataSource } from "../models/db/datasource";
import { Tribe } from "../models/db/entities";
import axios from "axios";
import { stringify } from "csv-stringify/sync";
import { ICustomQueryDTO, IMockDTO } from "../interfaces/dto";
import { errors } from "../settings";

export class TribeService {
  private tribeRepository;

  constructor() {
    this.tribeRepository = AppDataSource.getRepository(Tribe);
  }

  async getSvcRepositoriesByTribe(param: string) {
    try {
      const result = await this.findRepositoriesByTribe(param);

      const list = result as ICustomQueryDTO[];
      const err = result as {
        error: string;
      };

      if (err.error !== undefined) {
        return stringify([{ error: err.error }]);
      } else {
        return stringify(list);
      }
    } catch (error) {
      const { type, message } = errors.getMessage(
        error,
        "TribeService.getSvcRepositoriesByTribe"
      );
      if (message) throw error;

      throw new Error(`${type}|message`);
    }
  }

  async findRepositoriesByTribe(param: string) {
    try {
      let id = Number(param);

      const tribes = await this.getTribes(id);

      if (tribes.length == 0)
        return {
          error: "La Tribu no se encuentra registrada",
        };

      const result = await this.buildResponse(tribes);

      if (result.length == 0)
        return {
          error:
            "La Tribu no tiene repositorios que cumplan con la cobertura necesaria",
        };

      return result;
    } catch (error) {
      const { type, message } = errors.getMessage(
        error,
        "TribeService.findRepositoriesByTribe"
      );
      if (message) throw error;

      throw new Error(`${type}|message`);
    }
  }

  async buildResponse(tribes: Tribe[]) {
    let result: ICustomQueryDTO[] = [];
    for (let i = 0; i < tribes.length; i++) {
      const tribe = tribes[i];
      if (tribe.repositories)
        for (let j = 0; j < tribe.repositories.length; j++) {
          const repository = tribe.repositories[j];

          const verificationStateData = await this.getVerificationStateData();
          const verificationStateDataResult = verificationStateData.filter(
            (verificationState) => verificationState.id == repository._id
          );

          let currentVerificationState =
            verificationStateDataResult.length > 0
              ? verificationStateDataResult[0]
              : null;

          let queryCustom = {
            id: repository._id.toString(),
            name: repository.name,
            tribe: tribe.name,
            organization: tribe.organization.name,
            state:
              repository.state === "E"
                ? "Habilitado"
                : repository.state === "A"
                ? "Archivado"
                : "Deshabilitado",
            coverage: `${repository.metric.coverage}%`,
            codeSmells: repository.metric.code_smells,
            bugs: repository.metric.bugs,
            vulnerabilities: repository.metric.vulnerabilities,
            hotspots: repository.metric.hostpot,
            verificationState: currentVerificationState
              ? this.getVerificationStateName(currentVerificationState.state)
              : "",
          };

          const currentYear = new Date().getFullYear();
          if (
            repository.state === "E" &&
            repository.metric.coverage > 75 &&
            repository.created_at.getFullYear() == currentYear
          )
            result.push(queryCustom);
        }
    }

    return result;
  }

  async getTribes(id: number) {
    const tribes = await this.tribeRepository.find({
      where: {
        _id: id,
      },
      relations: ["organization", "repositories", "repositories.metric"],
    });
    return tribes;
  }

  async getVerificationStateData() {
    try {
      const response = await axios.get(process.env.MOCK_URL || "");
      const result: IMockDTO[] = response.data.repositories;
      return result;
    } catch (error) {
      const { type, message } = errors.getMessage(
        error,
        "TribeService.findRepositoriesByTribe"
      );
      if (message) throw error;

      throw new Error(`${type}|message`);
    }
  }

  getVerificationStateName(id: number) {
    return id == 604 ? "Verificado" : id == 605 ? "En Espera" : "Aprobado";
  }
}
