import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IOrganization } from "../../../interfaces";
import { Tribe } from "./tribe";

@Entity({ name: "organizations" })
export class Organization implements IOrganization {
  @PrimaryGeneratedColumn("identity")
  _id: number;
  @Column("varchar", { nullable: false })
  name: string;
  @Column("integer", { nullable: false })
  status: number;
  //One-To-Many (Organization has Tribes)
  @OneToMany(() => Tribe, (tribe) => tribe.organization, {
    nullable: false,
    onDelete: "NO ACTION",
  })
  tribes?: Tribe[];
}
