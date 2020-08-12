import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
@ObjectType()
@Entity("entries")
export class JournalEntry extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  date: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Int)
  @Column()
  categoryId: number;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => Int)
  @Column()
  duration: number;
}
