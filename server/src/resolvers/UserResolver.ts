import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  Field,
  ObjectType,
  Int,
} from "type-graphql";
import { User } from "../entity/User";
import { hash, compare } from "bcryptjs";
import { MyContext } from "../MyContext";
import { sendRefreshToken } from "../sendRefreshToken";
import { createRefreshToken, createAccessToken, getUserInfo } from "../auth";
import { Category } from "../entity/Category";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => User)
  findUser(@Arg("userId", () => Int) userId: number) {
    return User.findOne({ id: userId });
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() context: MyContext) {
    try {
      const user = await getUserInfo(context);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email", () => String) email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error("could not find user");
      }

      const valid = await compare(password, user.password);

      if (!valid) {
        throw new Error("bad password");
      }

      sendRefreshToken(res, createRefreshToken(user));

      return {
        accessToken: createAccessToken(user),
        user,
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");
    return true;
  }

  @Mutation(() => User)
  async registerUser(
    @Arg("firstName") firstName: string,
    @Arg("lastName", { nullable: true }) lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const duplicate = await User.findOne({ email: email });

    if (duplicate !== undefined) {
      throw new Error("Email already exists.");
    }

    const hashedPassword = await hash(password, 12);
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      theme: "light",
    };

    try {
      const user = await User.create(newUser).save();

      await Category.create({
        description: "Uncategorized",
        user: user,
        userId: user.id,
      }).save();

      return user;
    } catch (err) {
      console.log(err);
      throw new Error("Unable to create user.");
    }
  }

  @Mutation(() => User)
  async updateUserTheme(
    @Ctx() context: MyContext,
    @Arg("theme") theme: string
  ): Promise<User> {
    try {
      const user = await getUserInfo(context);
      await User.update({ id: user!.id }, { theme: theme });
      return user!;
    } catch (err) {
      console.log(err);
      throw new Error("Unable to change theme.");
    }
  }
}
