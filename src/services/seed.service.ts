import { AppDataSource } from "../models/db/datasource";
import { Organization, Tribe, Repository, Metric } from "../models/db/entities";
import { errors } from "../settings";

export class SeedService {
  private organizationRepository;
  private tribeRepository;
  private repositoryRepository;
  private metricRepository;

  constructor() {
    this.organizationRepository = AppDataSource.getRepository(Organization);
    this.tribeRepository = AppDataSource.getRepository(Tribe);
    this.repositoryRepository = AppDataSource.getRepository(Repository);
    this.metricRepository = AppDataSource.getRepository(Metric);
  }

  private async truncate() {
    await this.organizationRepository.query(
      "TRUNCATE TABLE organizations CASCADE"
    );
    await this.tribeRepository.query("TRUNCATE TABLE tribes CASCADE");
    await this.repositoryRepository.query(
      "TRUNCATE TABLE repositories CASCADE"
    );
    await this.metricRepository.query("TRUNCATE TABLE metrics CASCADE");
  }

  async start() {
    try {
      await this.truncate();
      //Organization
      const nOrganization = this.organizationRepository.create({
        name: "Banco Pichincha",
        status: 1,
      });

      await this.organizationRepository.save(nOrganization);

      //Tribes
      const nTribe = this.tribeRepository.create({
        name: "Centro Digital",
        status: 1,
        organization: nOrganization,
      });

      await this.tribeRepository.save(nTribe);

      //Repository
      // state
      //    E: Enable
      //    D: Disable
      //    A: Archived
      // status
      //    A: Active
      //    I: Inactive
      //
      //name: cd-common-utils  state: E -> Habilitado
      const repo1 = this.repositoryRepository.create({
        name: "cd-common-utils",
        state: "E",
        status: "A",
        created_at: new Date().toISOString(),
        tribe: nTribe,
      });
      await this.repositoryRepository.save(repo1);
      //name: cd-common-text   state: A -> Archivado
      const repo2 = this.repositoryRepository.create({
        name: "cd-common-text",
        state: "A",
        status: "A",
        created_at: new Date().toISOString(),
        tribe: nTribe,
      });
      await this.repositoryRepository.save(repo2);

      //Metrics
      const metric1 = this.metricRepository.create({
        repository: repo1,
        coverage: 35,
        code_smells: 0,
        bugs: 0,
        vulnerabilities: 0,
        hostpot: 0,
      });
      await this.metricRepository.save(metric1);

      const metric2 = this.metricRepository.create({
        repository: repo2,
        coverage: 75,
        code_smells: 1,
        bugs: 0,
        vulnerabilities: 2,
        hostpot: 0,
      });
      await this.metricRepository.save(metric2);

      return {
        OK: true,
        MESSAGE: "Successful process",
      };
    } catch (error) {
      const { type, message } = errors.getMessage(error, "SeedService.start");
      if (message) throw error;

      throw new Error(`${type}|message`);
    }
  }
}
