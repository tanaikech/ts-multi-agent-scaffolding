<a name="top"></a>

# Multi-Agent Scaffolding with TypeScript and @google/adk

This repository provides a comprehensive scaffolding for building and orchestrating multi-agent systems using the **TypeScript version of @google/adk**. It demonstrates how to integrate local reasoning, API tools, **Model Context Protocol (MCP)**, and **Agent-to-Agent (A2A)** protocols into a unified orchestrator.

## Overview

By leveraging `@google/adk`, this project showcases five progressive levels of AI agent implementation:

1.  **Logic Analyst (Sample 1):** Focuses on reasoning, summarization, and validation.
2.  **API Manager (Sample 2):** Integrates dynamic tools for real-time weather and currency exchange data.
3.  **Local File Expert (Sample 3):** Utilizes **MCP (Filesystem)** to interact with local directories securely.
4.  **Workspace Doc Guide (Sample 4):** Connects to remote **MCP servers** via HTTP for specialized documentation retrieval.
5.  **Multi-Agent Orchestrator (Sample 5):** A senior-level agent that coordinates the above four sub-agents using Serial, Parallel, or Iterative execution strategies.

For a detailed technical walkthrough, please refer to the article:
**[Building Multi-Agent Systems with TypeScript @google/adk and MCP](YOUR_MEDIUM_ARTICLE_LINK_HERE)**

---

## Features

- **Type-Safe Tooling:** Define tools using `Zod` schema for robust validation.
- **MCP Integration:** Seamlessly connect to both local (Stdio) and remote (HTTP) Model Context Protocol servers.
- **Orchestration Logic:** An advanced orchestrator that analyzes prompts to delegate tasks to specialized sub-agents.
- **A2A Server:** Turn any agent into an A2A-compliant server using `express` and `toA2a`.

---

## Setup Instructions

### 1. Prerequisites

- Node.js (v18 or later)
- Gemini API Key (Set as `GOOGLE_API_KEY` in your environment or `.env` file)

### 2. Installation

```bash
git clone https://github.com/tanaikech/ts-multi-agent-scaffolding
cd ts-multi-agent-scaffolding
npm install
```

### 3. Running the Agents as Web server

When you access `http://localhost:8000` using your browser, you can see the launched agent.

```bash
npm run sample1
```

The actual result is as follows.

```bash
$ npm run sample1

> adk-full-samples@1.0.0 sample1
> npx adk web sample1/agent.ts


+-----------------------------------------------------------------------------+
| ADK API Server started                                                      |
|                                                                             |
| For local testing, access at http://localhost:8000.                         |
+-----------------------------------------------------------------------------+
```

or

```bash
npm run sample2
```

or

```bash
npm run sample3
```

or

```bash
npm run sample4
```

### 4. Running the Agents as A2A server

You can launch the A2A server with multiple agents as follows.

```bash
npm run sample5
```

The actual result is as follows.

```bash
$ npm run sample5

> adk-full-samples@1.0.0 sample5
> npx tsx sample5/a2aserver.ts

Secure MCP Filesystem Server running on stdio
Client does not support MCP Roots, using allowed directories set from server args: [ '/tanaike/sample3/sample' ]
Server started on http://localhost:8000
Try: http://localhost:8000/.well-known/agent-card.json
```

In this case, in order to test this A2A server as a subagent using Gemini CLI, please set `.gemini/agents/sample-adk-agent.md` as follows.

```text
---
kind: remote
name: sample-adk-agent
agent_card_url: http://localhost:8000/.well-known/agent-card.json
---
```

When Gemini CLI is opened, you can use this sample agent as a subagent.

Of course, you can also see the agent card by accessing this agent card URL with your browser.

---

## Usage Examples

### Sample 1: `general_logic_analyst` (Logic & Synthesis)

**Focus:** Logical analysis, summarization, drafting, and evaluation.

- **Prompt A (Logic Check):** _"I have a plan to launch a global campaign on May 1st. However, the budget approval is on May 5th, and the creative assets take 10 days to produce. Analyze the logical timeline and point out any conflicts."_
- **Prompt B (Summarization):** _"Summarize the core benefits of using a Multi-Agent system over a single LLM prompt for enterprise automation. Provide a professional executive summary."_

### Sample 2: `api_manager_agent` (External Data)

**Focus:** Real-time data retrieval via external APIs (Weather, Exchange Rates).

- **Prompt A (Currency):** _"What is the current exchange rate from USD to JPY? Based on that, how much is $1,500 in Japanese Yen?"_
- **Prompt B (Weather):** _"Get the current weather for Osaka (Lat: 34.69, Lon: 135.50). Is it a good day for an outdoor photo shoot?"_

### Sample 3: `local_file_expert` (File Operations)

**Focus:** Local filesystem operations via MCP (`sample3/sample` directory).

- **Prompt A (List Files):** _"List all files available in the permitted 'sample' directory and tell me the file size of each."_
- **Prompt B (Content Analysis):** _"Read the content of 'config.json' if it exists, and explain its current configuration settings."_

### Sample 4: `workspace_doc_guide` (Google Workspace Expert)

**Focus:** Technical support for Google Workspace APIs and Apps Script (GAS).

- **Prompt A (GAS Implementation):** _"How can I use the Gmail API via Apps Script to automatically save attachments to a specific Google Drive folder? Provide a code snippet."_
- **Prompt B (MCP Knowledge):** _"Explain the best practices for using the SHEETS function in Google Sheets as a custom trigger, based on the latest Workspace documentation."_

### Sample 5: `multi_agent_orchestrator` (Orchestration)

**Focus:** Coordination of multiple agents using serial, parallel, and iterative strategies.

- **Prompt A (Serial Workflow: API -> File -> Logic):** _"Get the current weather in Tokyo, save that information as a new file named 'tokyo_weather.txt' in the local directory, and then write a professional email draft based on that weather for a client meeting."_
- **Prompt B (Complex Integration: Workspace -> Logic -> API):** _"Research the best way to automate currency reporting in Google Sheets using the Workspace guide, then use the API manager to find the current EUR to JPY rate, and finally create a logical plan for a daily automation script."_

---

<a name="license"></a>

## License

[MIT](https://www.google.com/search?q=LICENCE)

<a name="author"></a>

## Author

[Tanaike](https://tanaikech.github.io/about/)

[TOP](#top)

---

## Update History

- v1.0.0 (April 20, 2026)
  - Initial release with 5 sample implementations including MCP and A2A Orchestrator.
