import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";

import { UserType } from "../models/user.model";

export function generateAccessToken(user: UserType) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "1m",
  });
}

// refreshTokens
export let refreshTokens: string[] = [];
export function generateRefreshToken(user: UserType): string {
  const refreshToken = jwt.sign(
    user,
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: "2m",
    }
  );
  refreshTokens.push(refreshToken);
  return refreshToken;
}

export function setRefreshTokens(newRefreshToken: string[]) {
  refreshTokens = newRefreshToken;
}
