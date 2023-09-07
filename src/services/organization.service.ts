import {
  IOrganizationInsertDTO,
  IOrganizationUpdateDTO,
  dto,
} from "../interfaces";
import { AppDataSource } from "../models/db/datasource";
import { Organization } from "../models/db/entities";
import { errors } from "../settings";
import { validation } from "../tools";

export class OrganizationService {
  private organizationRepository;

  constructor() {
    this.organizationRepository = AppDataSource.getRepository(Organization);
  }

  async create(organization: IOrganizationInsertDTO) {
    try {
      const { ...toInsert } = organization;

      const nOrganization = this.organizationRepository.create({
        ...toInsert,
      });

      await this.organizationRepository.save(nOrganization);

      return dto.transformationDtos.OrganizationToDto(nOrganization);
    } catch (error) {
      const { type, message } = errors.getMessage(
        error,
        "OrganizationService.create"
      );
      if (message) throw error;

      throw new Error(`${type}|message`);
    }
  }

  async findById(_id: number) {
    try {
      if (!_id) return null;

      const nOrganization = await this.organizationRepository.findOneBy({
        _id,
      });

      return dto.transformationDtos.OrganizationToDto(nOrganization);
    } catch (error) {
      const { type, message } = errors.getMessage(
        error,
        "OrganizationService.findById"
      );
      if (message) throw error;

      throw new Error(`${type}|message`);
    }
  }

  async findAll() {
    try {
      const users = await this.organizationRepository.find();
      return users.map((user) =>
        dto.transformationDtos.OrganizationToDto(user)
      );
    } catch (error) {
      const { type, message } = errors.getMessage(
        error,
        "OrganizationService.findAll"
      );
      if (message) throw error;

      throw new Error(`${type}|message`);
    }
  }

  async findOne(term: string) {
    try {
      let organization: Organization | null;

      if (validation.isNumber(term))
        organization = await this.organizationRepository.findOneBy({
          _id: Number(term),
        });
      else {
        const queryBuilder =
          this.organizationRepository.createQueryBuilder("organization");
        organization = await queryBuilder
          .where("UPPER(name) like:name", {
            name: term.toUpperCase(),
          })
          .getOne();
      }

      if (!organization)
        throw new Error(
          errors.FIND_DATA.DONT_EXISTS("Organization", "term", term)
        );

      return dto.transformationDtos.OrganizationToDto(organization);
    } catch (error) {
      const { type, message } = errors.getMessage(
        error,
        "OrganizationService.findOne"
      );
      if (message) throw error;

      throw new Error(`${type}|message`);
    }
  }

  async update(organization: IOrganizationUpdateDTO) {
    try {
      const { ...toUpdate } = organization;

      const upOrganization = await this.organizationRepository.preload({
        ...toUpdate,
      });

      if (!upOrganization)
        throw new Error(
          errors.INVALID_ID("Organization", "_id", organization._id)
        );

      await this.organizationRepository.save(upOrganization);

      return dto.transformationDtos.OrganizationToDto(upOrganization);
    } catch (error) {
      const { type, message } = errors.getMessage(
        error,
        "OrganizationService.update"
      );
      if (message) throw error;

      throw new Error(`${type}|message`);
    }
  }

  async delete(_id: number) {
    try {
      const organization = await this.organizationRepository.findOneBy({ _id });
      if (!organization)
        throw new Error(errors.INVALID_ID("Organization", "_id", _id));

      return await this.organizationRepository.remove(organization);
    } catch (error) {
      const { type, message } = errors.getMessage(
        error,
        "OrganizationService.delete"
      );
      if (message) throw error;

      throw new Error(`${type}|message`);
    }
  }
}
