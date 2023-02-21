import express, { Request, Response } from "express";
import cookieSession from "cookie-session";
import helmet from "helmet";
import { config } from "dotenv";
config();

// import { database } from "./db/knexfile";
// database.seed.run();

import router from "./routes/router";

const sessionKeys = [process.env.SESSION_KEY_ONE, process.env.SESSION_KEY_TWO];

const app = express();

app.use(helmet());
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: sessionKeys as string[],
    maxAge: 1000 * 60 * 15,
  })
);

app.use(router);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send("Hello World!");
});

export default app;
