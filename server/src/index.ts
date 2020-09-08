import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import cors from "cors";
import { sendRefreshToken } from "./sendRefreshToken";
import { createAccessToken, createRefreshToken } from "./auth";
import { User } from "./entity/User";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import { JournalEntryResolver } from "./resolvers/JournalEntryResolver";
import path from "path";
import { createConnection } from "typeorm";

const port = process.env.PORT || 4000;
export const app = express();

(async () => {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(cookieParser());

  // specifically designed to refresh jwt token
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;

    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;

    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      res.send({ ok: false, accessToken: "" });
    }

    // token is valid and we can send back an access valid token
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, CategoryResolver, JournalEntryResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.use(express.static(path.join(__dirname, "public")));

  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  });

  app.listen(port, () => {
    console.log(`server started at ${port}`);
  });
})();
