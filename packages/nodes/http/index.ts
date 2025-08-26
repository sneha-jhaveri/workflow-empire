import { NodeImpl } from "..";

export const httpRequestNode: NodeImpl = {
  type: "http.request",
  meta: {
    label: "HTTP Request",
    inputs: {
      url: "string",
      method: "string",
      headers: "object",
      body: "string",
    },
    outputs: {
      status: "number",
      data: "object",
    },
  },
  async run({ input }) {
    const response = await fetch(input.url, {
      method: input.method,
      headers: input.headers,
      body: input.body,
    });
    const data = await response.json();
    return { status: response.status, data };
  },
};

export default httpRequestNode;
