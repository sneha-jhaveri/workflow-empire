import { WebClient } from "@slack/web-api";
import { createTransport } from "nodemailer";

interface WorkflowNode {
  type: string;
  data: Record<string, any>;
}

export const executeWorkflow = async (workflowDefinition: WorkflowNode[]) => {
  for (const node of workflowDefinition) {
    switch (node.type) {
      case "slack.sendMessage": {
        const client = new WebClient(node.data.token);
        await client.chat.postMessage({
          channel: node.data.channel,
          text: node.data.text,
        });
        console.log(`Message sent to ${node.data.channel}`);
        break;
      }
      case "email.send": {
        const transporter = createTransport(node.data.smtpConfig);
        await transporter.sendMail({
          from: node.data.from,
          to: node.data.to,
          subject: node.data.subject,
          text: node.data.text,
        });
        console.log(`Email sent to ${node.data.to}`);
        break;
      }
      case "http.request": {
        const response = await fetch(node.data.url, {
          method: node.data.method,
          headers: node.data.headers,
          body: JSON.stringify(node.data.body),
        });
        console.log(
          `HTTP request to ${node.data.url} completed with status ${response.status}`
        );
        break;
      }
      default: {
        console.log(`Unknown node type: ${node.type}`);
      }
    }
  }
};
