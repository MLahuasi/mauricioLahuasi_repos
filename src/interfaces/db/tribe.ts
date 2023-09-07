import { IOrganization } from "./organization";

export interface ITribeInsertDTO {
  name: string;
  status: number;
  organization: IOrganization | number;
}

export interface ITribeUpdateDTO extends ITribeInsertDTO {
  _id: number;
}

export interface ITribeResultDTO extends ITribeUpdateDTO {}

export interface ITribe extends ITribeInsertDTO {}
