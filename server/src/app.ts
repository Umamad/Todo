import express, { Request, Response } from "express";
import cookieSession from "cookie-session";
import helmet from "helmet";
import cors from "cors";
import { config } from "dotenv";
config();
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

// import { database } from "./db/knexfile";
// database.seed.run();
// database.migrate.latest();
// database.migrate.rollback()

// import swaggerDocumentationObject from "./docs/swagger.json";
import router from "./routes/router";
import swaggerDefinition from "./docs/swagger";

const sessionKeys = [process.env.SESSION_KEY_ONE, process.env.SESSION_KEY_TWO];
const swaggerOptions: swaggerJsDoc.Options = {
  apis: [],
  swaggerDefinition,
};
const specs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use(helmet());
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: sessionKeys as string[],
    maxAge: 1000 * 60 * 15,
  })
);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(router);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send("Hello World!");
});

export default app;
