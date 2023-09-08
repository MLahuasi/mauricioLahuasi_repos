import { IMetric, ITribe } from "..";

export interface IRepositoryInsertDTO {
  name: string;
  state: string;
  status: string;
  created_at: Date;
  tribe: ITribe | number;
}

export interface IRepositoryUpdateDTO extends IRepositoryInsertDTO {
  _id: number;
}

export interface IRepositoryResultDTO extends IRepositoryUpdateDTO {}

export interface IRepository extends IRepositoryUpdateDTO {
  metric?: IMetric;
}
