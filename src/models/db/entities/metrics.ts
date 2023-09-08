import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Repository } from "./repository";

@Entity({ name: "metrics" })
export class Metric {
  @PrimaryGeneratedColumn("increment")
  _id: number;

  @Column("numeric", { nullable: false })
  coverage: number;

  @Column("integer", { nullable: false })
  bugs: number;

  @Column("integer", { nullable: false })
  vulnerabilities: number;

  @Column("integer", { nullable: false })
  hostpot: number;

  @Column("integer", { nullable: false })
  code_smells: number;

  @OneToOne(() => Repository, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  repository: number | Repository;
}
