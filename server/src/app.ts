import express, { Request, Response } from "express";
import cookieSession from "cookie-session";

import router from "./routes/router";

const Keys = ["keyone", "keytwo"];

const app = express();

app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: Keys,
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(router);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send("Hello World!");
});

export default app;
