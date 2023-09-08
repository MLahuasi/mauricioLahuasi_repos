import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tribe } from "./tribe";

@Entity({ name: "organizations" })
export class Organization {
  @PrimaryGeneratedColumn("increment")
  _id: number;

  @Column("varchar", { nullable: false })
  name: string;

  @Column("integer", { nullable: false })
  status: number;

  //One-To-Many (Organization has Tribes)
  @OneToMany(() => Tribe, (tribe) => tribe.organization, {
    nullable: false,
    onDelete: "CASCADE",
  })
  tribes?: Tribe[];
}
