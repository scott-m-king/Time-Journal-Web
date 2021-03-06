import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Field, Int, ObjectType, InputType } from "type-graphql";
import { Category } from "./Category";
import { User } from "./User";

@InputType("EntryInput")
@ObjectType()
@Entity("entries")
export class JournalEntry extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  date: String;

  @Field()
  @Column()
  title: string;

  @Field(() => Int)
  @Column()
  duration: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  notes: String;

  @Field(() => Int)
  @Column()
  categoryId: number;
  @ManyToOne(() => Category, (category) => category.entries)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @Column()
  userId: number;
  @ManyToOne(() => User, (user) => user.entries)
  @JoinColumn({ name: "userId" })
  user: User;
}
