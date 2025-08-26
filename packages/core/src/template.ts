import { Workflow } from "./workflow";

export const sampleTemplates: Workflow[] = [
  {
    id: "1",
    name: "Social Media Blast",
    description: "Post content to Twitter, LinkedIn, Slack at once",
    createdAt: new Date(),
    updatedAt: new Date(),
    nodes: [
      {
        id: "node1",
        type: "twitter.post",
        inputs: { text: "Hello world" },
        label: "Post to Twitter",
      },
      {
        id: "node2",
        type: "linkedin.post",
        inputs: { text: "Hello world" },
        label: "Post to LinkedIn",
      },
      {
        id: "node3",
        type: "slack.sendMessage",
        inputs: { text: "Hello team!" },
        label: "Send Slack Message",
      },
    ],
    edges: [
      { id: "edge1", source: "node1", target: "node2", to: "node2" },
      { id: "edge2", source: "node2", target: "node3", to: "node3" },
    ],
  },
  {
    id: "2",
    name: "Email Newsletter → Notion",
    description: "Log every Mailchimp send into Notion database",
    createdAt: new Date(),
    updatedAt: new Date(),
    nodes: [
      { id: "node1", type: "mailchimp.send", inputs: {}, label: "Send Email" },
      {
        id: "node2",
        type: "notion.createPage",
        inputs: {},
        label: "Create Notion Page",
      },
    ],
    edges: [{ id: "edge1", source: "node1", target: "node2", to: "node2" }],
  },
  {
    id: "3",
    name: "Shopify → Google Sheets",
    description: "Sync new orders into Google Sheets",
    createdAt: new Date(),
    updatedAt: new Date(),
    nodes: [
      {
        id: "node1",
        type: "shopify.newOrder",
        inputs: {},
        label: "New Shopify Order",
      },
      {
        id: "node2",
        type: "googlesheets.appendRow",
        inputs: {},
        label: "Append to Google Sheets",
      },
    ],
    edges: [{ id: "edge1", source: "node1", target: "node2", to: "node2" }],
  },
  {
    id: "4",
    name: "Calendar → Slack",
    description: "Send daily agenda from Google Calendar to Slack",
    createdAt: new Date(),
    updatedAt: new Date(),
    nodes: [
      {
        id: "node1",
        type: "googlecalendar.getEvents",
        inputs: {},
        label: "Get Calendar Events",
      },
      {
        id: "node2",
        type: "slack.sendMessage",
        inputs: {},
        label: "Send Slack Message",
      },
    ],
    edges: [{ id: "edge1", source: "node1", target: "node2", to: "node2" }],
  },
  {
    id: "5",
    name: "GitHub PR → AI Summary → Slack",
    description: "Summarize GitHub PRs with AI and send to Slack",
    createdAt: new Date(),
    updatedAt: new Date(),
    nodes: [
      {
        id: "node1",
        type: "github.newPullRequest",
        inputs: {},
        label: "New GitHub PR",
      },
      { id: "node2", type: "ai.summarize", inputs: {}, label: "Summarize PR" },
      {
        id: "node3",
        type: "slack.sendMessage",
        inputs: {},
        label: "Send Slack Message",
      },
    ],
    edges: [
      { id: "edge1", source: "node1", target: "node2", to: "node2" },
      { id: "edge2", source: "node2", target: "node3", to: "node3" },
    ],
  },
];
