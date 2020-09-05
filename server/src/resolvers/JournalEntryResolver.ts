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
      throw new Error(err);
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
      throw new Error(err);
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
    @Arg("date", () => String) date: String
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
      throw new Error(err);
    }
  }

  @Mutation(() => JournalCategoryResponse)
  async batchUploadJournalEntry(
    @Ctx() context: MyContext,
    @Arg("entryArray", () => [JournalEntry]) entryArray: JournalEntry[],
    @Arg("categoryArray", () => [String]) categoryArray: string[]
  ): Promise<JournalCategoryResponse> {
    try {
      const user = await getUserInfo(context);

      for (let i = 0; i < entryArray.length; i++) {
        let category: Category | undefined;

        category = await Category.findOne({
          where: { userId: user?.id, description: categoryArray[i] },
        });

        if (!category) {
          category = await Category.create({
            description: categoryArray[i],
            userId: user!.id,
          }).save();
        }

        await JournalEntry.create({
          userId: user!.id,
          categoryId: category.id,
          title: entryArray[i].title,
          notes: entryArray[i].notes,
          duration: entryArray[i].duration,
          date: entryArray[i].date,
        }).save();

        await Category.update(
          { id: category!.id },
          { duration: category!.duration + entryArray[i].duration }
        );
      }

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

  @Mutation(() => JournalCategoryResponse)
  async deleteEntry(
    @Arg("idArray", () => [Int]) idArray: number[],
    @Ctx() context: MyContext
  ): Promise<JournalCategoryResponse> {
    try {
      const user = await getUserInfo(context);

      for (let i = 0; i < idArray.length; i++) {
        const toDelete = await JournalEntry.findOne({
          where: { userId: user!.id, id: idArray[i] },
        });

        const category = await Category.findOne({ id: toDelete?.categoryId });
        await Category.update(
          { id: category!.id },
          { duration: category!.duration - toDelete!.duration }
        );

        await JournalEntry.delete({ id: idArray[i] });
      }

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

  @Mutation(() => JournalCategoryResponse)
  async editEntry(
    @Ctx() context: MyContext,
    @Arg("id", () => Int) id: number,
    @Arg("categoryId", () => Int) categoryId: number,
    @Arg("title", () => String) title: string,
    @Arg("notes", () => String, { nullable: true }) notes: String,
    @Arg("duration", () => Int) duration: number,
    @Arg("date", () => String) date: String
  ): Promise<JournalCategoryResponse> {
    try {
      const user = await getUserInfo(context);

      const toEdit = await JournalEntry.findOne({
        where: { userId: user!.id, id: id },
      });

      if (categoryId !== toEdit!.categoryId) {
        const categoryOld = await Category.findOne({
          id: toEdit!.categoryId,
        });
        await Category.update(
          { id: toEdit!.categoryId },
          { duration: categoryOld!.duration - toEdit!.duration }
        );

        const categoryNew = await Category.findOne({ id: categoryId });
        await Category.update(
          { id: categoryId },
          { duration: categoryNew!.duration + duration }
        );
      }

      await JournalEntry.update(
        { id: toEdit!.id },
        {
          categoryId,
          title,
          notes,
          duration,
          date,
        }
      );

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
