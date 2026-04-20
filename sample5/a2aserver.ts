/**
 * sample5/a2aserver.ts
 *
 * A2A server that dynamically loads agents.
 * Usage: SAMPLE_TYPE=5 npx tsx sample5/a2aserver.ts
 */
import { LlmAgent, toA2a } from "@google/adk";
import express from "express";
import "dotenv/config";

// 各サンプルからエージェントをインポート
import { rootAgent as agent1 } from "../sample1/agent.ts";
import { rootAgent as agent2 } from "../sample2/agent.ts";
import { rootAgent as agent3 } from "../sample3/agent.ts";
import { rootAgent as agent4 } from "../sample4/agent.ts";

/**
 * 統合オーケストレーター・エージェント (Sample 5)
 */
const agent5 = new LlmAgent({
  name: "multi_agent_orchestrator",
  description:
    "Advanced orchestrator capable of serial, parallel, and iterative task execution.",
  model: "gemini-3-flash-preview",
  instruction: `You are a Senior Multi-Agent Orchestrator. Your role is to analyze user prompts and delegate tasks to the most suitable sub-agents.

### Available Sub-Agents & Expertise:
- "general_logic_analyst" (agent1): Logic validation, summarization, and final report drafting.
- "api_manager_agent" (agent2): Real-time currency exchange and weather data retrieval.
- "local_file_expert" (agent3): Local file system operations within the workspace.
- "workspace_doc_guide" (agent4): Google Workspace APIs and Apps Script documentation.

### Operational Protocols:
1. **Selection & Purpose**: Clearly identify which agent(s) you are using and why.
2. **Execution Strategy**:
   - **Serial**: When one agent's output is needed as input for another.
   - **Parallel**: When multiple independent data points are needed.
   - **Iterative**: When you need to re-run an agent or call a new one based on fresh findings.
3. **Reporting (Strict Requirement)**: You MUST start your response with an "Execution Log".

### Mandatory Output Format (in English):
---
## Execution Log
- **Agents Involved**: [List names of agents used]
- **Execution Strategy**: [Single / Serial / Parallel / Iterative]
- **Purpose & Logic**: [Briefly explain why these agents were chosen and how they were coordinated]

## Result
[Provide the comprehensive final answer in the language requested by the user]
---`,
  subAgents: [agent1, agent2, agent3, agent4],
});

const agents: Record<string, LlmAgent> = {
  "1": agent1,
  "2": agent2,
  "3": agent3,
  "4": agent4,
  "5": agent5,
};

async function startServer() {
  const type = process.env.SAMPLE_TYPE || "5";
  const targetAgent = agents[type];

  if (!targetAgent) {
    console.error(`Invalid SAMPLE_TYPE: ${type}.`);
    process.exit(1);
  }

  const port = 8000;
  const host = "localhost";
  const app = express();

  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // A2Aプロトコル設定
  await toA2a(targetAgent, {
    protocol: "http",
    basePath: "",
    host,
    port,
    app,
  });

  app.listen(port, () => {
    console.log(`Server started on http://${host}:${port}`);
    console.log(`Try: http://${host}:${port}/.well-known/agent-card.json`);
  });
}

startServer().catch(console.error);
