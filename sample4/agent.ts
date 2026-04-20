import { LlmAgent, MCPToolset } from "@google/adk";

export const rootAgent = new LlmAgent({
  name: "workspace_doc_guide",
  model: "gemini-3-flash-preview",
  instruction:
    "You are a Google Workspace expert. Use the provided tools to answer questions about Apps Script and Workspace APIs.",
  tools: [
    new MCPToolset({
      type: "StreamableHTTPConnectionParams",
      url: "https://workspace-developer.goog/mcp",
    }),
  ],
});
