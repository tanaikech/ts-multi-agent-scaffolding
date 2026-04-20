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

### 3\. Running the Agents

You can launch specific agents or the full orchestrator by setting the `SAMPLE_TYPE` environment variable.

```bash
# Run the Multi-Agent Orchestrator (Sample 5) Default.
SAMPLE_TYPE=5 npx tsx sample5/a2aserver.ts

# Run the Local File Expert with MCP (Sample 3)
SAMPLE_TYPE=3 npx tsx sample5/a2aserver.ts
```

or, using npm run,

```bash
npm run sample1

npm run sample2

npm run sample3

npm run sample4

npm run sample5
```

### 4\. Verification

Once the server is running, you can access the **Agent Card** (A2A metadata) at:
`http://localhost:8000/.well-known/agent-card.json`

---

## Usage Examples

Once the Orchestrator (Sample 5) is running, you can interact with it to perform complex tasks:

- **Parallel Task:** "What is the weather in Osaka and the current USD/JPY rate? Summarize the impact on local tourism."
- **File & Logic:** "Read the README.md in the sample directory and check if the installation steps are logically consistent."
- **Workspace Help:** "How do I use the new SHEET function in Google Sheets? Provide an example based on the Workspace documentation."

---

\<a name="license"\>\</a\>

## License

[MIT](https://www.google.com/search?q=LICENCE)

\<a name="author"\>\</a\>

## Author

[Tanaike](https://tanaikech.github.io/about/)

[TOP](https://www.google.com/search?q=%23top)

---

## Update History

- v1.0.0 (April 20, 2026)
  - Initial release with 5 sample implementations including MCP and A2A Orchestrator.
