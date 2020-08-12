import {
  Resolver,
  Query,
  Mutation,
  Arg,
  // Field,
  // ObjectType,
} from "type-graphql";
import { User } from "../entity/User";
import { hash } from "bcryptjs";

// @ObjectType()
// class LoginResponse {
//   @Field()
//   accessToken: string;
//   @Field(() => User)
//   user: User;
// }

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => User)
  async registerUser(
    @Arg("firstName") firstName: string,
    @Arg("lastName", { nullable: true }) lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
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
}
