import express from "express";

import userRouter from "./user.router";
import { validateToken } from "../middlewares/user.middleware";

const router = express.Router();

router.use("/user", userRouter);
router.get(
  "/secret",
  validateToken,
  (req: express.Request, res: express.Response) => {
    return res.json({
      secret: 85,
    });
  }
);

export default router;
