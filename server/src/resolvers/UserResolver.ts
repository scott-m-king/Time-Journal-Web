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
import { getRepository, getConnection } from "typeorm";
import { MyContext } from "../MyContext";
import { sendRefreshToken } from "../sendRefreshToken";
import { createRefreshToken, createAccessToken } from "../auth";
import { verify } from "jsonwebtoken";

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
  me(@Ctx() context: MyContext) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      throw new Error("not authenticated");
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email", () => String) email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
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
    };

    try {
      const user = await User.create(newUser).save();
      return user;
    } catch (err) {
      console.log(err);
      throw new Error("Unable to create user.");
    }
  }

  // don't use this route unless absolutely needed!
  @Mutation(() => Boolean)
  async deleteAllUsers() {
    const { max } = await getRepository(User)
      .createQueryBuilder("users")
      .select("MAX(users.id)", "max")
      .getRawOne();

    const { min } = await getRepository(User)
      .createQueryBuilder("users")
      .select("MIN(users.id)", "min")
      .getRawOne();

    for (let i = min; i <= max; i++) {
      try {
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(User)
          .where("id = :id", { id: i })
          .execute();
      } catch {
        // skip over this one
      }
    }
    return true;
  }
}
