import userDoc from "./user.docs";
import todoDoc from "./todo.docs";

const swaggerDefinition = {
  openapi: "3.0.0",
  swagger: "3.0",
  info: {
    version: "1.0.0",
    title: "Todo API",
    description: "Simple Todo API",
  },
  basePath: "http://localhost:3000",
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    schemas: {
      ...userDoc.components.schemas,
      ...todoDoc.components.schemas,
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    responses: {
      "400": {
        description: "Invalid parameter",
        "application/json": {
          schema: {
            properties: {
              message: {
                type: "string",
              },
            },
          },
        },
      },
      "404": {
        description: "Invalid email address",
        "application/json": {
          schema: {
            properties: {
              message: {
                type: "string",
              },
            },
          },
        },
      },
      "403": {
        description: "Invalid access token",
        "application/json": {
          schema: {
            properties: {
              message: {
                type: "string",
              },
            },
          },
        },
      },
      "5XX": {
        description: "Internal server error",
        "application/json": {
          schema: {
            properties: {
              message: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    ...userDoc.paths,
    ...todoDoc.paths,
  },
};

export default swaggerDefinition;
