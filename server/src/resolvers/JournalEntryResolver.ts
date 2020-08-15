import { Resolver, Query, Arg, Int, Mutation } from "type-graphql";
import { JournalEntry } from "../entity/JournalEntry";

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

  @Mutation(() => Boolean)
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
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
