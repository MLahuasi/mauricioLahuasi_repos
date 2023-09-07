import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IMetric, IRepository } from "../../../interfaces";
import { Repository } from "./repository";

@Entity({ name: "metrics" })
export class Metric implements IMetric {
  @PrimaryGeneratedColumn("identity")
  _id: number;
  @Column("numeric", { nullable: false })
  coverage: number;
  @Column("numeric", { nullable: false })
  bugs: number;
  @Column("numeric", { nullable: false })
  vulnerabilities: number;
  @Column("numeric", { nullable: false })
  hostpot: number;
  @Column("numeric", { nullable: false })
  code_smells: number;

  @OneToOne(() => Repository, {
    nullable: false,
  })
  @JoinColumn()
  repository: number | IRepository;
}
