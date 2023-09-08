import { ICustomQueryDTO, IMockDTO } from "../interfaces/dto";
import { AppDataSource } from "../models/db/datasource";
import { Metric, Tribe } from "../models/db/entities";
import { errors } from "../settings";
import axios from "axios";

export class TribeService {
  private tribeRepository;
  private metricRepository;

  constructor() {
    this.tribeRepository = AppDataSource.getRepository(Tribe);
    this.metricRepository = AppDataSource.getRepository(Metric);
  }

  async findRepositoriesByTribe(param: string) {
    try {
      let id = Number(param);

      const tribes = await this.tribeRepository.find({
        where: {
          _id: id,
        },
        relations: ["organization", "repositories"],
      });

      if (tribes.length == 0)
        return {
          error: "La Tribu no se encuentra registrada",
        };

      const verificationStateData = await this.getVerificationStateData();

      let result: ICustomQueryDTO[] = [];
      for (let i = 0; i < tribes.length; i++) {
        const tribe = tribes[i];
        if (tribe.repositories)
          for (let j = 0; j < tribe.repositories.length; j++) {
            const repository = tribe.repositories[j];
            let id = repository._id.toString();

            let idPadre = repository._id;
            const metrica = await this.metricRepository
              .createQueryBuilder("tr")
              .innerJoin("tr.repository", "pr")
              .where("pr._id = :idPadre", { idPadre })
              .getOne();

            let metricaInfo = {};

            const verificationStateDataResult = verificationStateData.filter(
              (verificationState) => verificationState.id == Number(id)
            );

            let currentVerificationState =
              verificationStateDataResult.length > 0
                ? verificationStateDataResult[0]
                : null;

            if (metrica)
              metricaInfo = {
                coverage: `${metrica.coverage}%`,
                codeSmells: metrica.code_smells,
                bugs: metrica.bugs,
                vulnerabilities: metrica.vulnerabilities,
                hotspots: metrica.hostpot,
                verificationState: currentVerificationState
                  ? this.getVerificationStateName(
                      currentVerificationState.state
                    )
                  : "",
              };

            let queryCustom = {
              id,
              name: repository.name,
              tribe: tribe.name,
              organization: tribe.organization.name,
              state:
                repository.state === "E"
                  ? "Habilitado"
                  : repository.state === "A"
                  ? "Archivado"
                  : "Deshabilitado",
              ...metricaInfo,
            };

            const currentYear = new Date().getFullYear();
            if (metrica)
              if (
                repository.state === "E" &&
                metrica.coverage > 75 &&
                repository.created_at.getFullYear() == currentYear
              )
                result.push(queryCustom);
          }
      }

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

  getVerificationStateName(id: number) {
    return id == 604 ? "Verificado" : id == 605 ? "En Espera" : "Aprobado";
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
}
