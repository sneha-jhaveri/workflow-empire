import { Workflow } from "./workflow";

export const sampleTemplates: Workflow[] = [
  {
    id: "1",
    name: "Social Media Blast",
    description: "Post content to Twitter, LinkedIn, Slack at once",
    createdAt: new Date(),
    updatedAt: new Date(),
    nodes: [
      { id: "node1", type: "twitter.post", inputs: { text: "Hello world" } },
      { id: "node2", type: "linkedin.post", inputs: { text: "Hello world" } },
      {
        id: "node3",
        type: "slack.sendMessage",
        inputs: { text: "Hello team!" },
      },
    ],
    edges: [],
  },
  {
    id: "2",
    name: "Email Newsletter → Notion",
    description: "Log every Mailchimp send into Notion database",
    createdAt: new Date(),
    updatedAt: new Date(),
    nodes: [
      { id: "node1", type: "mailchimp.send", inputs: {} },
      { id: "node2", type: "notion.createPage", inputs: {} },
    ],
    edges: [],
  },
  {
    id: "3",
    name: "Shopify → Google Sheets",
    description: "Sync new orders into Google Sheets",
    createdAt: new Date(),
    updatedAt: new Date(),
    nodes: [
      { id: "node1", type: "shopify.newOrder", inputs: {} },
      { id: "node2", type: "googlesheets.appendRow", inputs: {} },
    ],
    edges: [],
  },
  {
    id: "4",
    name: "Calendar → Slack",
    description: "Send daily agenda from Google Calendar to Slack",
    createdAt: new Date(),
    updatedAt: new Date(),
    nodes: [
      { id: "node1", type: "googlecalendar.getEvents", inputs: {} },
      { id: "node2", type: "slack.sendMessage", inputs: {} },
    ],
    edges: [],
  },
  {
    id: "5",
    name: "GitHub PR → AI Summary → Slack",
    description: "Summarize GitHub PRs with AI and send to Slack",
    createdAt: new Date(),
    updatedAt: new Date(),
    nodes: [
      { id: "node1", type: "github.newPullRequest", inputs: {} },
      { id: "node2", type: "ai.summarize", inputs: {} },
      { id: "node3", type: "slack.sendMessage", inputs: {} },
    ],
    edges: [],
  },
];
