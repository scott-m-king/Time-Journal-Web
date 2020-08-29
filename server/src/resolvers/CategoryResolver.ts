import { Resolver, Query, Arg, Int, Mutation, Ctx } from "type-graphql";
import { Category } from "../entity/Category";
import { JournalEntry } from "../entity/JournalEntry";
import { MyContext } from "../MyContext";
import { getUserInfo } from "../auth";

@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  async getUserCategories(@Ctx() context: MyContext) {
    try {
      const user = await getUserInfo(context);
      const categories = await Category.find({ where: { userId: user!.id } });
      return categories;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Query(() => Category)
  async getSingleCategory(@Arg("categoryId", () => Int) categoryId: number) {
    const category = await Category.findOne({ where: { id: categoryId } });
    return category;
  }

  @Mutation(() => [Category])
  async createCategory(
    @Ctx() context: MyContext,
    @Arg("description", () => String) description: string
  ): Promise<Array<Category>> {
    try {
      const user = await getUserInfo(context);
      await Category.create({
        description: description,
        userId: user!.id,
      }).save();

      const categories = await Category.find({ where: { userId: user!.id } });
      return categories;
    } catch (err) {
      throw new Error(err);
    }
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
