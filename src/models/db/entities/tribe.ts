import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ITribe } from "../../../interfaces";
import { Organization } from "./organization";
import { Repository } from "./repository";

@Entity({ name: "tribes" })
export class Tribe implements ITribe {
  @PrimaryGeneratedColumn("identity")
  _id: number;
  @Column("varchar", { nullable: false })
  name: string;
  @Column("integer", { nullable: false })
  status: number;

  //Many-To-One (Tribes have Organization)
  @ManyToOne(() => Organization, (organization) => organization.tribes, {
    onDelete: "NO ACTION",
    nullable: false,
  })
  organization: Organization;
  //One-To-Many (Tribe has Repositories)
  @OneToMany(() => Repository, (repository) => repository.tribe, {
    nullable: false,
    onDelete: "NO ACTION",
  })
  repositories?: Repository[];
}
