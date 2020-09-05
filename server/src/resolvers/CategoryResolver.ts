import { Resolver, Query, Arg, Int, Mutation, Ctx } from "type-graphql";
import { Category } from "../entity/Category";
import { JournalEntry } from "../entity/JournalEntry";
import { MyContext } from "../MyContext";
import { getUserInfo } from "../auth";
import { JournalCategoryResponse } from "./JournalEntryResolver";

@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  async getUserCategories(@Ctx() context: MyContext) {
    try {
      const user = await getUserInfo(context);
      const categories = await Category.find({ where: { userId: user!.id } });
      return categories;
    } catch (err) {
      throw new Error(err);
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

  @Mutation(() => JournalCategoryResponse)
  async deleteCategory(
    @Ctx() context: MyContext,
    @Arg("categoryId", () => Int) categoryId: number
  ): Promise<JournalCategoryResponse> {
    try {
      const user = await getUserInfo(context);

      const toDelete = await Category.findOne({ id: categoryId });
      if (toDelete?.description === "Uncategorized") {
        throw new Error(`Cannot delete the "Uncategorized" category.`);
      }

      const uncategorized = await Category.findOne({
        where: { userId: user!.id, description: "Uncategorized" },
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

      const updateEntries = await JournalEntry.find({ userId: user!.id });
      const updatedCategories = await Category.find({ userId: user!.id });

      return {
        entries: updateEntries,
        categories: updatedCategories,
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  @Mutation(() => JournalCategoryResponse)
  async editCategory(
    @Ctx() context: MyContext,
    @Arg("categoryId", () => Int) categoryId: number,
    @Arg("updatedDescription", () => String) updatedDescription: string
  ): Promise<JournalCategoryResponse> {
    try {
      const user = await getUserInfo(context);

      const toEdit = await Category.findOne({ id: categoryId });
      if (toEdit?.description === "Uncategorized") {
        throw new Error(`Cannot delete the "Uncategorized" category.`);
      }

      if (updatedDescription.toLowerCase() === "uncategorized") {
        throw new Error(`Cannot delete rename categories to "Uncategorized".`);
      }

      await Category.update(
        { id: categoryId },
        { description: updatedDescription }
      );

      const updateEntries = await JournalEntry.find({ userId: user!.id });
      const updatedCategories = await Category.find({ userId: user!.id });

      return {
        entries: updateEntries,
        categories: updatedCategories,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}
