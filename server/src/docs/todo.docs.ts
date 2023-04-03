const todoDoc = {
  components: {
    schemas: {
      Todo: {
        properties: {
          id: {
            type: "number",
            description: "uniq identity of todo",
          },
          user_id: {
            type: "number",
            description: "the id of todo owner",
          },
          title: {
            type: "string",
            description: "title of todo",
          },
          description: {
            type: "string",
            description: "the notes of descriptions about todo",
            nullable: true,
          },
          is_done: {
            type: "number",
            description: "status of todo",
            enum: [0, 1],
          },
          priority: {
            type: "string",
            enum: ["low", "medium", "high"],
            description: "importance of todo",
          },
          created_at: {
            type: "string",
            description: "creation date of todo",
          },
          updated_at: {
            type: "string",
            description: "modification date of todo",
          },
        },
      },
    },
  },
  paths: {
    "/todo": {
      get: {
        description: "Get list of todo related to signed in user",
        tags: ["Todo"],
        responses: {
          "200": {
            description: "You have list",
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    $ref: "#components/schemas/Todo",
                  },
                },
              },
            },
          },
          "403": {
            $ref: "#components/responses/403",
          },
          "5XX": {
            $ref: "#components/responses/5XX",
          },
        },
      },
      post: {
        description: "Create a new todo",
        tags: ["Todo"],
        requestBody: {
          description: "post a todo",
          required: true,
          content: {
            "application/json": {
              schema: {
                properties: {
                  title: {
                    type: "string",
                    description: "title of todo",
                  },
                  description: {
                    type: "string",
                    description: "the notes of descriptions about todo",
                    nullable: true,
                  },
                  is_done: {
                    type: "number",
                    description: "status of todo",
                    enum: [0, 1],
                    nullable: true,
                  },
                  priority: {
                    type: "string",
                    enum: ["low", "medium", "high"],
                    description: "importance of todo",
                  },
                },
                example: {
                  title: "test todo 2",
                  description: "test description 2",
                  priority: "high",
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "You will receive fresh list of todo",
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    $ref: "#components/schemas/Todo",
                  },
                },
              },
            },
          },
          "400": {
            $ref: "#components/responses/400",
          },
          "403": {
            $ref: "#components/responses/403",
          },
          "5XX": {
            $ref: "#components/responses/5XX",
          },
        },
      },
    },
    "/todo/{id}": {
      patch: {
        description: "Edit a todo",
        tags: ["Todo"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "number",
              description: "id of todo",
            },
            required: true,
          },
        ],
        requestBody: {
          description: "edit a todo",
          required: true,
          content: {
            "application/json": {
              schema: {
                properties: {
                  title: {
                    type: "string",
                    description: "title of todo",
                  },
                  description: {
                    type: "string",
                    description: "the notes of descriptions about todo",
                    nullable: true,
                  },
                  is_done: {
                    type: "number",
                    description: "status of todo",
                    enum: [0, 1],
                    nullable: true,
                  },
                  priority: {
                    type: "string",
                    enum: ["low", "medium", "high"],
                    description: "importance of todo",
                  },
                },
                example: {
                  title: "test edited todo 2",
                  description: "test edited description 2",
                  is_done: 1,
                  priority: "low",
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "You will receive fresh list of todo",
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    $ref: "#components/schemas/Todo",
                  },
                },
              },
            },
          },
          "400": {
            $ref: "#components/responses/400",
          },
          "403": {
            $ref: "#components/responses/403",
          },
          "5XX": {
            $ref: "#components/responses/5XX",
          },
        },
      },
      delete: {
        description: "Delete a todo",
        tags: ["Todo"],
        parameters: [
          {
            in: "query",
            name: "id",
            schema: {
              type: "number",
              description: "id of todo",
            },
            required: true,
          },
        ],
        responses: {
          "204": {
            description: "Successful",
          },
          "400": {
            $ref: "#components/responses/400",
          },
          "403": {
            $ref: "#components/responses/403",
          },
          "5XX": {
            $ref: "#components/responses/5XX",
          },
        },
      },
    },
  },
};

export default todoDoc;
