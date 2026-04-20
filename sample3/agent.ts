import { LlmAgent, MCPToolset } from "@google/adk";

export const rootAgent = new LlmAgent({
  name: "local_file_expert",
  model: "gemini-3-flash-preview",
  instruction:
    "You are a local file manager. Help users organize and understand their files. Here, you can access only a directory of 'sample' given by the MCP server.",
  tools: [
    new MCPToolset({
      type: "StdioConnectionParams",
      serverParams: {
        command: "npx",
        args: [
          "-y",
          "@modelcontextprotocol/server-filesystem",
          "sample3/sample",
        ],
      },
    }),
  ],
});
