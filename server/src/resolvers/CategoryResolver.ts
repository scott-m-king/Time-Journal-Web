import { Resolver, Query, Arg, Int, Mutation } from "type-graphql";
import { Category } from "../entity/Category";

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
}
