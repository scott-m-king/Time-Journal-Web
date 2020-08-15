import { Resolver, Query, Arg, Int, Mutation } from "type-graphql";
import { JournalEntry } from "../entity/JournalEntry";
import { Category } from "../entity/Category";

@Resolver()
export class JournalEntryResolver {
  @Query(() => [JournalEntry])
  async getAllUserEntries(@Arg("userId", () => Int) userId: number) {
    try {
      const entries = await JournalEntry.find({ where: { userId: userId } });
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

  @Mutation(() => String)
  async createEntry(
    @Arg("userId", () => Int) userId: number,
    @Arg("categoryId", () => Int) categoryId: number,
    @Arg("description", () => String) description: string,
    @Arg("duration", () => Int) duration: number,
    @Arg("date", () => Date, { nullable: true }) date: Date
  ) {
    try {
      await JournalEntry.create({
        userId: userId,
        categoryId: categoryId,
        description: description,
        duration: duration,
        date: date,
      }).save();

      const cat = await Category.findOne({ id: categoryId });

      await Category.update(
        { id: categoryId },
        { duration: cat!.duration + duration }
      );

      return "Journal entry successfully added";
    } catch (err) {
      console.log(err);
      return "There was a problem adding the journal entry. Please try again.";
    }
  }

  @Mutation(() => String)
  async deleteEntry(@Arg("id", () => Int) id: number) {
    try {
      const toDelete = await JournalEntry.findOne({ id: id });
      const category = await Category.findOne({ id: toDelete?.categoryId });
      await Category.update(
        { id: category!.id },
        { duration: category!.duration - toDelete!.duration }
      );
      await JournalEntry.delete({ id: id });
      return `Journal entry successfully deleted`;
    } catch (err) {
      console.log(err);
      return `Unable to delete journal entry`;
    }
  }
}
