const userDoc = {
  components: {
    schemas: {
      "user login body": {
        properties: {
          email: {
            type: "string",
            required: true,
          },
          password: {
            type: "string",
            required: true,
          },
        },
      },
    },
  },
  paths: {
    "/user/login": {
      post: {
        description: "user login",
        tags: ["User"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#components/schemas/user login body",
              },
              example: {
                email: "test1@gmail.com",
                password: "hello12345",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Now you have access to all apis",
            "application/json": {
              schema: {
                properties: {
                  accessToken: {
                    type: "string",
                  },
                  refreshToken: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                },
              },
            },
          },
          "404": {
            $ref: "#components/responses/404",
          },
          "401": {
            description: "Wrong password",
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
            $ref: "#components/responses/5XX",
          },
        },
      },
    },
    "/user/refresh-token": {
      patch: {
        description: "refresh access token using refresh token",
        tags: ["User"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                properties: {
                  token: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Now you have new access and refresh token",
            "application/json": {
              schema: {
                properties: {
                  accessToken: {
                    type: "string",
                  },
                  refreshToken: {
                    type: "string",
                  },
                },
              },
            },
          },
          "400": {
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
            $ref: "#components/responses/5XX",
          },
        },
      },
    },
    "/user/logout": {
      delete: {
        description: "logout user",
        tags: ["User"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                properties: {
                  token: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          "204": {
            description: "You're logged out successfully",
          },
          "400": {
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
            $ref: "#components/responses/5XX",
          },
        },
      },
    },
  },
};

export default userDoc;
