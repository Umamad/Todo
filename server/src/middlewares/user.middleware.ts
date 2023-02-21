import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.status(403).send("access denide");

  const token = authHeader.split(" ")[1];

  if (token == null) return res.status(403).send("access denide");
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) {
        return res.status(403).send("access denide");
      } else {
        if (req.session) req.session.user = user;
        next();
      }
    }
  );
}
