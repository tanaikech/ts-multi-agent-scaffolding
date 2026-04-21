/**
 * sample6/a2aserver.ts
 *
 * A2A server that dynamically loads agents.
 * Usage: SAMPLE_TYPE=5 npx tsx sample6/a2aserver.ts
 */
import { LlmAgent, toA2a } from "@google/adk";
import express from "express";
import "dotenv/config";

import { rootAgent as agent1 } from "../sample1/agent.ts";
import { rootAgent as agent2 } from "../sample2/agent.ts";
import { rootAgent as agent3 } from "../sample3/agent.ts";
import { rootAgent as agent4 } from "../sample4/agent.ts";
import { rootAgent as agent5 } from "../sample5/agent.ts";

const port = 8000;
const host = "localhost";

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

  const app = express();

  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // For A2A
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
