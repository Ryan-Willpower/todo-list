import { RouteShorthandOptions } from "fastify";

const schema: RouteShorthandOptions = {
  schema: {
    headers: {
      type: "object",
      required: ["content-type"],
      properties: {
        "content-type": {
          type: "string",
          pattern: "^application/json$",
        },
      },
    },
    body: {
      type: "object",
      required: ["username"],
      properties: {
        username: { type: "string" },
      },
    },
  },
}

export default schema
