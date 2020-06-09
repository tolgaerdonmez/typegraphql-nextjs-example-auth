import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { redis } from "./redis";
import { createSchema } from "./utils/createSchema";
import dotenv from "dotenv";

dotenv.config();

const main = async () => {
  await createConnection();

  const schema = await createSchema();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
  });

  const app = Express();

  const RedisStore = connectRedis(session);

  app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

  app.use(
    session({
      store: new RedisStore({ client: redis as any }),
      name: "qid",
      secret: "aadsadasd123kssd4",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false, // true in prod
        maxAge: 1000 * 60 * 60 * 23 * 7 * 365, // 7 years
      },
    } as any)
  );

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("Server launched on http://localhost:4000/graphql");
  });
};

main();
