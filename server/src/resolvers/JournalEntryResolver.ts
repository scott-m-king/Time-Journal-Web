import {
  Resolver,
  Query,
  Arg,
  Int,
  Mutation,
  Ctx,
  ObjectType,
  Field,
} from "type-graphql";
import { JournalEntry } from "../entity/JournalEntry";
import { Category } from "../entity/Category";
import { MyContext } from "../MyContext";
import { getUserInfo } from "../auth";

@ObjectType()
export class JournalCategoryResponse {
  @Field(() => [JournalEntry])
  entries: JournalEntry[];
  @Field(() => [Category])
  categories: Category[];
}

@Resolver()
export class JournalEntryResolver {
  @Query(() => [JournalEntry])
  async getAllUserEntries(@Ctx() context: MyContext) {
    try {
      const user = await getUserInfo(context);
      const entries = await JournalEntry.find({ where: { userId: user!.id } });
      return entries;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Query(() => [JournalEntry])
  async getEntriesByCategory(
    @Arg("userId", () => Int) userId: number,
    @Arg("categoryId", () => Int) categoryId: number
  ) {
    try {
      const entries = await JournalEntry.find({
        where: { userId: userId, categoryId: categoryId },
      });
      return entries;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // need to return list of categories here to reload entry form properly
  @Mutation(() => JournalCategoryResponse)
  async createEntry(
    @Ctx() context: MyContext,
    @Arg("categoryId", () => Int) categoryId: number,
    @Arg("title", () => String) title: string,
    @Arg("notes", () => String, { nullable: true }) notes: String,
    @Arg("duration", () => Int) duration: number,
    @Arg("date", () => String, { nullable: true }) date: String
  ) {
    let user;

    try {
      user = await getUserInfo(context);
    } catch (err) {
      console.log(err);
      return "User not authenticated";
    }

    try {
      await JournalEntry.create({
        userId: user!.id,
        categoryId: categoryId,
        title: title,
        notes: notes,
        duration: duration,
        date: date,
      }).save();

      const cat = await Category.findOne({ id: categoryId });

      await Category.update(
        { id: categoryId },
        { duration: cat!.duration + duration }
      );

      const entries = await JournalEntry.find({ userId: user!.id });
      const categories = await Category.find({ userId: user!.id });

      return {
        entries: entries,
        categories: categories,
      };
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  @Mutation(() => JournalCategoryResponse)
  async deleteEntry(
    @Arg("id", () => Int) id: number,
    @Ctx() context: MyContext
  ): Promise<JournalCategoryResponse> {
    try {
      const user = await getUserInfo(context);

      const toDelete = await JournalEntry.findOne({
        where: { userId: user!.id, id: id },
      });

      const category = await Category.findOne({ id: toDelete?.categoryId });
      await Category.update(
        { id: category!.id },
        { duration: category!.duration - toDelete!.duration }
      );

      await JournalEntry.delete({ id: id });

      const entries = await JournalEntry.find({ userId: user!.id });
      const categories = await Category.find({ userId: user!.id });

      return {
        entries: entries,
        categories: categories,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}
