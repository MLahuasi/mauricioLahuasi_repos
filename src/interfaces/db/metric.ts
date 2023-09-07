import { IRepository } from "./repository";

export interface IMetricInsertDTO {
  coverage: number;
  bugs: number;
  vulnerabilities: number;
  hostpot: number;
  code_smells: number;
  repository: IRepository | number;
}

export interface IMetricUpdateDTO extends IMetricInsertDTO {
  _id: number;
}

export interface IMetricResultDTO extends IMetricUpdateDTO {}

export interface IMetric extends IMetricUpdateDTO {}
