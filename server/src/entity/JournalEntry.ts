import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { Category } from "./Category";
import { User } from "./User";
@ObjectType()
@Entity("entries")
export class JournalEntry extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date, { nullable: true })
  @Column("date", { nullable: true })
  date: Date;

  @Field()
  @Column()
  description: string;

  @Field(() => Int)
  @Column()
  duration: number;

  @Field(() => Int)
  @Column()
  categoryId: number;
  @ManyToOne(() => Category, (category) => category.entries)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @Field(() => Int)
  @Column()
  userId: number;
  @ManyToOne(() => User, (user) => user.entries)
  @JoinColumn({ name: "userId" })
  user: User;
}
