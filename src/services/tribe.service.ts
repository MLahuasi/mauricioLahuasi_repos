import { AppDataSource } from "../models/db/datasource";
import { Metric, Repository, Tribe } from "../models/db/entities";
import axios from "axios";
import { stringify } from "csv-stringify/sync";
import {
  ICustomQueryDTO,
  IMockDTO,
  IResponseMetricDTO,
} from "../interfaces/dto";
import { errors } from "../settings";

export class TribeService {
  private tribeRepository;
  private metricRepository;

  constructor() {
    this.tribeRepository = AppDataSource.getRepository(Tribe);
    this.metricRepository = AppDataSource.getRepository(Metric);
  }

  async getSvcRepositoriesByTribe(param: string) {
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

      const csv = stringify(result);

      return csv;
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

  getVerificationStateName(id: number) {
    return id == 604 ? "Verificado" : id == 605 ? "En Espera" : "Aprobado";
  }

  async buildResponse(tribes: Tribe[]) {
    let result: ICustomQueryDTO[] = [];
    for (let i = 0; i < tribes.length; i++) {
      const tribe = tribes[i];
      if (tribe.repositories)
        for (let j = 0; j < tribe.repositories.length; j++) {
          const repository = tribe.repositories[j];

          const responseInfo = await this.builResponseInfo(repository, tribe);
          if (!responseInfo) return [];

          const { queryCustom, coverage_number } = responseInfo;

          const currentYear = new Date().getFullYear();
          if (
            repository.state === "E" &&
            coverage_number > 75 &&
            repository.created_at.getFullYear() == currentYear
          )
            result.push(queryCustom);
        }
    }

    return result;
  }

  async builResponseInfo(
    repository: Repository,
    tribe: Tribe
  ): Promise<{ queryCustom: ICustomQueryDTO; coverage_number: number } | null> {
    const metricaInfo = await this.getMetric(repository._id);

    if (!metricaInfo) return null;

    const { coverage_number, ...resto } = metricaInfo;

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
      ...resto,
    };

    return {
      coverage_number,
      queryCustom,
    };
  }

  async getMetric(repositoryId: number): Promise<IResponseMetricDTO | null> {
    const metrica = await this.metricRepository
      .createQueryBuilder("tr")
      .innerJoin("tr.repository", "pr")
      .where("pr._id = :repositoryId", { repositoryId })
      .getOne();

    const verificationStateData = await this.getVerificationStateData();
    const verificationStateDataResult = verificationStateData.filter(
      (verificationState) => verificationState.id == repositoryId
    );

    let currentVerificationState =
      verificationStateDataResult.length > 0
        ? verificationStateDataResult[0]
        : null;

    if (metrica)
      return {
        coverage: `${metrica.coverage}%`,
        coverage_number: metrica.coverage,
        codeSmells: metrica.code_smells,
        bugs: metrica.bugs,
        vulnerabilities: metrica.vulnerabilities,
        hotspots: metrica.hostpot,
        verificationState: currentVerificationState
          ? this.getVerificationStateName(currentVerificationState.state)
          : "",
      };
    else return null;
  }

  async getTribes(id: number) {
    const tribes = await this.tribeRepository.find({
      where: {
        _id: id,
      },
      relations: ["organization", "repositories"],
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
}
