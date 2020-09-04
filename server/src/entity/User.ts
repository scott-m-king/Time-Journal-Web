import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { IsOptional } from "class-validator";
import { Category } from "./Category";
import { JournalEntry } from "./JournalEntry";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @IsOptional()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Column("int", { default: 0 })
  tokenVersion: number;

  @Field()
  @Column()
  theme: string;

  @Field(() => [Category])
  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @Field(() => [JournalEntry])
  @OneToMany(() => JournalEntry, (entry) => entry.user)
  entries: JournalEntry[];
}
