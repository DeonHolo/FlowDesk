# FlowDesk - Startup Helpdesk & Ops Hub

**FlowDesk** is a ServiceNow-based operations management application built for CSIT 440 (Industry Trends) by Team Git Gud. It serves as a unified intake portal that centralizes internal IT, HR, and Facilities requests, replacing scattered chats and spreadsheets.

## Key Features

- **Unified Employee Center:** A single portal for all internal service requests.
- **AI-Powered Automation:** Integrates with the **Google Gemini API** (Gemini 3.1 Flash Lite) to automatically analyze tickets as they are created. It provides:
  - Concise request summaries
  - Auto-routing predictions (IT, HR, Facilities)
  - Priority and risk scoring
  - Actionable checklists and troubleshooting steps
  - Clarifying questions for agents
- **Modern React Workspace:** A custom, multi-tabbed React 19 interface built with `@servicenow/sdk` and Rollup for real-time queue management and AI analysis viewing.
- **ServiceNow Fluent Automation:** Infrastructure-as-Code (IaC) implementation of ServiceNow Business Rules, Tables, and Script Includes using TypeScript (`now.ts`).

## Architecture

FlowDesk utilizes a modern decoupled architecture inside ServiceNow:
- **Frontend:** React 19 UI Page bundled via Rollup and served natively inside ServiceNow.
- **Backend:** ServiceNow Rhino Engine executing `async` Business Rules.
- **Integration:** Outbound `sn_ws.RESTMessageV2` communicating with Google Generative AI endpoints.

## Developer Quick Start

> **Note:** This project relies on the ServiceNow SDK (`now-sdk`) and must be deployed to a Personal Developer Instance (PDI) to function properly. The React app cannot run locally.

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Build and Deploy:**
   ```bash
   npm run build
   npm run deploy
   ```

3. **Configure API Keys:**
   - After deploying, log into your ServiceNow PDI.
   - Navigate to `sys_properties.list`.
   - Update the `x_1978345_flowdesk.gemini_api_key` property with your active Google AI Studio API key.

## Documentation

For a comprehensive dive into the system architecture, file structures, and AI integration strategies, please review the [Developer Guide](./docs/DEVELOPER_GUIDE.md).

---
*Built for CSIT 440 - Industry Trends | G4 - Team Git Gud*
