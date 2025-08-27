import { NodePlugin } from "../../core/src/node";
import OpenAI from "openai";

export const AISummarize: NodePlugin = {
  type: "ai.summarize",
  label: "AI Summarize",
  description: "Summarize long text or GitHub PRs using OpenAI",
  inputs: [{ name: "text", type: "string", required: true }],
  outputs: [{ name: "summary", type: "string" }],
  run: async (inputs: Record<string, any>) => {
    const apiKey =
      process.env.AZURE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    const endpoint =
      process.env.AZURE_OPENAI_ENDPOINT || "https://api.openai.com/v1";

    const client = new OpenAI({ apiKey, baseURL: endpoint });
    const result = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME || "gpt-4o-mini",
      messages: [{ role: "user", content: `Summarize this:\n${inputs.text}` }],
    });
    return { summary: result.choices[0].message.content };
  },
};
