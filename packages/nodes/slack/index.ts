import { NodePlugin } from "../../core/src/node";
import { WebClient } from "@slack/web-api";

export const SlackSendMessage: NodePlugin = {
  type: "slack.sendMessage",
  label: "Send Slack Message",
  description: "Send a message to a Slack channel or user",
  inputs: [
    { name: "token", type: "string", required: true },
    { name: "channel", type: "string", required: true },
    { name: "text", type: "string", required: true },
  ],
  outputs: [
    { name: "ts", type: "string" },
    { name: "channel", type: "string" },
  ],
  run: async (inputs: Record<string, any>) => {
    const client = new WebClient(inputs.token);
    const result = await client.chat.postMessage({
      channel: inputs.channel,
      text: inputs.text,
    });
    return { ts: result.ts, channel: result.channel };
  },
};
