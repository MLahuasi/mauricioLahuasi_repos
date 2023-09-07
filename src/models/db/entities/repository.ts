import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IRepository } from "../../../interfaces";
import { Tribe } from "./tribe";

@Entity({ name: "repositories" })
export class Repository implements IRepository {
  @PrimaryGeneratedColumn("identity")
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
    onDelete: "NO ACTION",
    nullable: false,
  })
  tribe: Tribe;
}
