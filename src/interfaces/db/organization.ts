import { ITribe } from "./tribe";

export interface IOrganizationInsertDTO {
  name: string;
  status: number;
}

export interface IOrganizationUpdateDTO extends IOrganizationInsertDTO {
  _id: number;
}

export interface IOrganizationResultDTO extends IOrganizationUpdateDTO {}

export interface IOrganization extends IOrganizationUpdateDTO {
  tribes?: ITribe[] | number[];
}
