import { User } from "./entity/User";
import { sign, verify } from "jsonwebtoken";
import { MyContext } from "./MyContext";

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "60m",
  });
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d", // if user haven't visited site in 7 days, make them log in again
    }
  );
};

export default class UnauthorizedError extends Error {}

export const getUserInfo = async (context: MyContext) => {
  const authentication = context.req.headers["authorization"];

  if (!authentication) {
    throw new UnauthorizedError("UNAUTHENTICATED");
  }

  try {
    const token = authentication.split(" ")[1];
    const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    const user = await User.findOne(payload.userId);
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};
