import { NodePlugin } from "../../core/src/node";
import OpenAI from "openai";

export const AISummarize: NodePlugin = {
  type: "ai.summarize",
  label: "AI Summarize",
  description: "Summarize long text or GitHub PRs using OpenAI",
  inputs: [
    { name: "apiKey", type: "string", required: true },
    { name: "text", type: "string", required: true },
  ],
  outputs: [{ name: "summary", type: "string" }],
  run: async (inputs: Record<string, any>) => {
    const client = new OpenAI({ apiKey: inputs.apiKey });
    const result = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: `Summarize this:\n${inputs.text}` }],
    });
    return { summary: result.choices[0].message.content };
  },
};
