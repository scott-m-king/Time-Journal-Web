import { Resolver, Query, Arg, Int, Mutation } from "type-graphql";
import { Category } from "../entity/Category";
import { JournalEntry } from "../entity/JournalEntry";

@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  async getUserCategories(@Arg("userId", () => Int) userId: number) {
    const users = await Category.find({ where: { userId: userId } });
    return users;
  }

  @Mutation(() => Boolean)
  async createCategory(
    @Arg("userId", () => Int) userId: number,
    @Arg("description", () => String) description: string
  ) {
    try {
      await Category.create({
        description: description,
        userId: userId,
      }).save();
    } catch (err) {
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg("userId", () => Int) userId: number,
    @Arg("categoryId", () => Int) categoryId: number
  ) {
    try {
      const toDelete = await Category.findOne({ id: categoryId });
      if (toDelete?.description === "Uncategorized") {
        throw new Error(`Cannot delete the "Uncategorized" category.`);
      }

      const uncategorized = await Category.findOne({
        where: { userId: userId, description: "Uncategorized" },
      });

      await Category.update(
        { id: uncategorized!.id },
        { duration: uncategorized!.duration + toDelete!.duration }
      );

      const entries = await JournalEntry.find({
        where: { categoryId: categoryId },
      });

      for (let entry of entries) {
        await JournalEntry.update(
          { id: entry.id },
          { categoryId: uncategorized!.id }
        );
      }

      await Category.delete({ id: categoryId });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
