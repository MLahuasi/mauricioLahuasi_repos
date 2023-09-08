import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IRepository } from "../../../interfaces";
import { Tribe } from "./tribe";
import { Metric } from "./metrics";

@Entity({ name: "repositories" })
export class Repository implements IRepository {
  @PrimaryGeneratedColumn("increment")
  _id: number;

  @Column("varchar", { nullable: false })
  name: string;

  @Column("char", { nullable: false })
  state: string;

  @Column("char", { nullable: false })
  status: string;

  @Column("timestamp", { nullable: false })
  created_at: Date;

  //Many-To-One (Repositories has Tribe)
  @ManyToOne(() => Tribe, (tribe) => tribe.repositories, {
    onDelete: "CASCADE",
    nullable: false,
  })
  tribe: Tribe;

  //One-To-One (Repositories has Metric)
  @OneToOne(() => Metric, (metric) => metric.repository)
  metric: Metric;
}
