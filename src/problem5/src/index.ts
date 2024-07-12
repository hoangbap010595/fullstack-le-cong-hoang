import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import registerTodoApi from "./apis/todo";
import initDatabase from "./database";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import schemas from "../schemas.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todos API Documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
    components: {
      schemas,
    },
  },
  apis: ["./src/apis/**/*.ts"],
};

const openapiSpecification = swaggerJsdoc(options);

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

initDatabase();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (_req: Request, res: Response) => {
  res.redirect("/api-docs");
});

registerTodoApi(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(
    `[server]: Swagger docs are available at http://localhost:${port}/api-docs`
  );
});
