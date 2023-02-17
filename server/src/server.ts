import http from "http";
import { config } from "dotenv";
import express, { Request, Response } from "express";

config();
const app = express();

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send("fuck you for now");
});

const server = http.createServer(app);

server.listen(3000, () => console.log("listening on http://localhost:3000"));
