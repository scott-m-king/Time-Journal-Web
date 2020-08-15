import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./User";
import { JournalEntry } from "./JournalEntry";

@ObjectType()
@Entity("categories")
export class Category extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  description: string;

  @Field(() => Int)
  @Column("int", { default: 0 })
  duration: number;

  @Field(() => Int)
  @Column()
  userId: number;
  @ManyToOne(() => User, (user) => user.categories)
  @JoinColumn({ name: "userId" })
  user: User;

  @Field(() => [JournalEntry])
  @OneToMany(() => JournalEntry, (entry) => entry.category)
  entries: JournalEntry[];
}
