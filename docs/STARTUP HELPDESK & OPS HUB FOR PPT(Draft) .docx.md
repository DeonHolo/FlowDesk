**Slide 1: Title Page**

**FLOWDESK: STARTUP HELPDESK & OPS HUB**

**SERVICENOW-BASED OPERATIONS MANAGEMENT SYSTEM**

**Presented by: Git Gud**

**CSIT 440 - G4**

 **April 19, 2026**

---

**Slide 2:**

**Meet our team:**
Romeo L. Ochavillo
Ron Luigi F. Taghoy
Frances Lghe P. Unabia
Justine C. Vilocura
Ryle Fritz T. Acero
Riggy Maryl L. Yungco
---

**Slide 3:**

**Agenda:**

Problem Statement & Background
Solution Overview
System Architecture
Core Features
AI-Powered Features
Process Flow & Use Case
Solution Build
Benefits
System Demo
---

**Slide 4: Problem Statement & Background**

* **Problem Statement:** Internal operational requests (IT, HR, and Facilities) are currently handled through manual, unstructured channels, leading to zero traceability and delayed resolutions.
* **Background:** Employees rely on informal chats and disparate spreadsheets. This lack of a centralized system results in "lost" tickets, manual routing errors, and a total absence of auditable approval history.

---

**Slide 5: Challenges**

* **01: Manual request filing via direct messages and emails.**
* **02: Inconsistent data (missing department info or urgency levels).**
* **03: No real-time status tracking for the employees.**
* **04: Resource bottlenecks due to manual approval routing.**
* **05: Zero transparency in operational fulfillment metrics.**

---

**Slide 6: Solution Overview**

**FLOWDESK: STARTUP HELPDESK & OPS HUB**
A comprehensive ServiceNow-based platform that digitizes and automates internal operations, enhanced with AI-powered ticket analysis.


| Before | After |
| :---- | :---- |
| Scattered chats | Centralized Service Catalog |
| Unmanaged emails | Automated Manager Approvals |
| Manual follow-ups | Real-time Workspaces |
| Manual triaging | AI-Powered Routing & Prioritization |

---

**Slide 7: System Architecture**

**EXPERIENCE LAYER (FRONTEND)**

**LOGIC LAYER (AUTOMATION)**

**AI LAYER (INTELLIGENCE)**

**DATA LAYER (BACKEND)**

**SECURITY & UTILITY LAYER**

---

**Slide 8:**

**EXPERIENCE LAYER (FRONTEND)**

* **Employee Center:** Unified portal for all employee-facing service requests.
* **FlowDesk Workspace:** A specialized, multi-tabbed interface for agents to manage departmental queues efficiently.
* **Custom React UI Page:** A modern React 19 interface for real-time request management with AI analysis results.

---

**Slide 9:**

**LOGIC LAYER (AUTOMATION)**

* **Flow Designer:** Orchestrates the Manager Approval Engine and automated state transitions.
* **Business Rules:** Executes server-side scripts for Auto-Routing, VIP Escalation, and Data Integrity checks.

---

**Slide 10:**

**AI LAYER (INTELLIGENCE)**

* **Google Gemini API (REST):** Third-party AI integration via ServiceNow Outbound REST Messages for real-time ticket analysis.
* **Script Include (FlowDeskAI):** A reusable server-side helper class that formats prompts, calls the Gemini API, and parses AI responses.
* **Automated Trigger:** An After-Insert Business Rule that sends every new request to the AI for instant summarization, routing, priority scoring, and checklist generation.

---

**Slide 11:**

**DATA LAYER (BACKEND)**

* **FlowDesk Request Table:** Custom table (x\_1978345\_flowdesk\_request) that extends the core Task table.
* **AI Fields:** Custom fields for AI Summary, AI Department, AI Priority, AI Checklist, and AI Clarifying Questions.
* **Schema Design:** Utilizes dictionary overrides to standardize labels and default values across IT, HR, and Facilities.

---

**Slide 12:**

**SECURITY & UTILITY LAYER**

* **Role-Based Access (RBAC):** Defined permissions using .admin, .fulfiller, and .user roles.
* **ACL Framework:** Strict Access Control Lists to ensure sensitive HR data remains isolated from other departments.
* **API Key Security:** AI API keys are stored server-side in the Outbound REST Message configuration, never exposed to the client.

---

**Slide 13:**

**Core Features:**

Unified Intake Portal

Automated Flow Logic

Intelligent Routing

Experience-First UI

Data Integrity Guard

---

**Slide 14:**

**Unified Intake Portal**

Service Catalog-based Record Producers for IT, HR, and Facilities that eliminate the need for chats or spreadsheets.

---

**Slide 15:**

**Automated Flow Logic**

Flow Designer-driven approval cycles for hardware and automated state management.

---

**Slide 16:**

**Intelligent Routing**

Server-side Business Rules that auto-assign tickets to the correct support group based on department metadata, now enhanced by AI predictions.

---

**Slide 17:**

**Experience-First UI**

A tailored FlowDesk Workspace for fulfillers and a mobile-responsive portal for employees, with an AI Analysis panel showing summaries, checklists, and suggested questions.

---

**Slide 18:**

**Data Integrity Guard**

Logic-based closure validation that prevents incomplete audits and ensures mandatory feedback on rejections.

---

**Slide 19:**

**AI-POWERED FEATURES**

---

**Slide 20:**

**AI Feature 1: Summarize & Route**

* **Scenario:** Employees submit long, unstructured text requests for help across IT, HR, or Facilities.
* **AI Implementation:** The AI reads the raw text and generates a short, one-paragraph summary for the agent. It then accurately predicts the correct department to automatically assign the ticket, eliminating manual triaging.
* **Technology:** Google Gemini 2.0 Flash via ServiceNow Outbound REST → After-Insert Business Rule auto-populates the AI Summary field and sets the Assignment Group.

---

**Slide 21:**

**AI Feature 2: Checklist & Task Generator**

* **Scenario:** A manager submits a vague request like "New Employee Setup for the Marketing Lead."
* **AI Implementation:** The AI detects the context of the role and department. It then automatically generates a step-by-step provisioning checklist (e.g., "1. Order MacBook, 2. Grant Adobe Access, 3. Setup Slack permissions") directly into the agent's workspace.
* **Technology:** Gemini AI returns a structured JSON array of steps, stored in the AI Checklist field on the request record.

---

**Slide 22:**

**AI Feature 3: Priority & Risk Scoring**

* **Scenario:** Employees submit tickets with varying degrees of urgency, often guessing the priority level incorrectly.
* **AI Implementation:** The AI analyzes the text to assess the actual risk. A ticket stating "The server room AC is leaking" gets automatically flagged as "Critical," while "The breakroom microwave is dirty" is safely assigned a "Low" priority.
* **Technology:** AI response includes a priority level and reasoning. The Business Rule maps this to ServiceNow's native Priority field (1-Critical to 4-Low).

---

**Slide 23:**

**AI Feature 4: Guided Clarifying Questions**

* **Scenario:** A user submits a ticket missing crucial information, such as "My software won't install."
* **AI Implementation:** The AI identifies the missing context and outputs the exact follow-up questions the agent needs to ask (e.g., "What specific software?", "Are you seeing an error code?"). This saves the agent from figuring out how to start troubleshooting a vague issue.
* **Technology:** AI-generated questions are stored in the AI Clarifying Questions field and displayed to the agent in the FlowDesk Workspace.

---

**Slide 24:**

**Process Flow & Use Case**

```
Employee submits request via Service Catalog
        │
        ▼
  Record created on FlowDesk Request table
        │
        ▼
  AI Business Rule fires (After Insert)
        │
        ▼
  Gemini API analyzes text → returns JSON
        │
        ▼
  Record updated: Summary, Department, Priority, Checklist, Questions
        │
        ▼
  Auto-routed to correct Assignment Group
        │
        ▼
  If requires approval → Flow Designer triggers Manager Approval
        │
        ▼
  Agent works ticket using FlowDesk Workspace (with AI insights)
        │
        ▼
  Ticket resolved and closed
```

---

**Slide 25:**

**Solution Build**

**Technical Stack**
**ServiceNow Platform**

| Component | Technology/Specification |
| ----- | ----- |
| Platform Version | Australia |
| Application Scope | x\_1978345\_flowdesk |
| Custom Table | FlowDesk Request (extends Task) |
| AI API | Google Gemini 2.0 Flash (Free Tier) |
| Frontend Framework | React 19 (bundled via Rollup) |
| Build Tooling | @servicenow/sdk 4.6.0 |

---

**Slide 26:**

**Required Plugins & Components**

| Plugin / Component | Purpose |
| :---- | :---- |
| App Engine Studio (AES) | Low-code development environment for application scaffolding. |
| Flow Designer | Orchestrates Manager Approval and fulfillment workflows. |
| Table Builder | Creates custom dictionary fields and configures backend data structure. |
| Service Catalog | Organizes and houses the application's user-facing intake forms. |
| Record Producer | Builds the specific intake forms for IT, HR, and Facilities. |
| Workspace UI | Creates the "FlowDesk Workspace" for agents to manage incoming tickets. |
| Outbound REST Message | Connects to the Google Gemini API for AI ticket analysis. |

---

**Slide 27:**

**Key Technical Components**

| Component | Implementation |
| :---- | :---- |
| Custom Tables | FlowDesk Request (x\_1978345\_flowdesk\_request), extending the core Task table. |
| Security Roles | Admin, Fulfiller, and User roles with tailored ACL permissions. |
| Business Rules | Auto-Routing, VIP Escalation, Prevent Closure with Open Tasks, Require Rejection Reason, AI Analyze New Request. |
| Service Catalog | Dedicated FlowDesk Operations category housing three custom Record Producers. |
| Flow Designer | FlowDesk Request Fulfillment flow for automated manager approvals. |
| Workspaces | FlowDesk Workspace built in UI Builder for a centralized agent experience. |
| AI Integration | Outbound REST Message → Gemini API, Script Include (FlowDeskAI), After-Insert Business Rule. |
| React UI Page | Custom React 19 frontend served as a ServiceNow UI Page with AI analysis display. |

---

**Slide 28:**

**REST API Specification**
**Endpoint Details**

| Property | Value |
| :---- | :---- |
| Method | POST |
| URL | /api/now/table/x\_1978345\_flowdesk\_request |
| Authentication | Basic (x\_1978345\_flowdesk.user) |
| Content-Type | application/json |

---

**Slide 29:**

**AI REST Integration**
**Gemini API Call Details**

| Property | Value |
| :---- | :---- |
| Method | POST |
| Endpoint | https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent |
| Authentication | API Key (query parameter) |
| Request Format | JSON with prompt text |
| Response Format | Structured JSON (summary, department, priority, checklist, questions) |
| Trigger | After-Insert Business Rule on FlowDesk Request table |

---

**Slide 30:**

**Validation Rules**

| Validation Rule | Logic & Trigger | Business Value / Goal |
| :---- | :---- | :---- |
| Mandatory Entry Validation | Prevents submission if Short Description or Requester fields are empty. | Ensures every ticket has enough data for agents to begin work immediately. |
| Audit Compliance Check | Aborts Save if a manager rejects a request without adding a comment in Work Notes. | Guarantees a "Paper Trail" for all rejected expenses or hardware requests. |
| Integrity Validation | Blocks the main record from being "Closed" if any Child Tasks are still in an active state. | Prevents tickets from being finished prematurely before all work is done. |
| Identity Validation | Checks if the User is a VIP; if true, auto-escalates Priority to "Critical." | Ensures high-priority leadership requests are never missed or delayed. |
| Routing Validation | If Assignment Group is empty, the system validates the Department and auto-assigns the correct team. | Eliminates manual triaging and speeds up the "Time-to-Assign" metric. |
| AI Routing Enhancement | AI analyzes ticket text and predicts the correct department before the routing rule runs. | Provides intelligent routing even when department metadata is missing. |

---

**Slide 31:**

**Business Rules**

| Business Rule | Trigger Condition | Execution Logic | System Outcome |
| :---- | :---- | :---- | :---- |
| Auto-Route by Department | Before Insert | If Assignment Group is empty, match the ticket to the specific IT, HR, or Facilities group. | Ensures zero manual triaging; tickets land with the correct team immediately. |
| VIP Escalation | Before Insert/Update | Checks if u\_requester.vip is true. | Sets Priority to 1 - Critical and prepends \[VIP\] to the Short Description. |
| Prevent Closure (Open Tasks) | Before Update | Runs a GlideRecord query when the State changes to "Closed Complete." | Aborts the save and shows an error if child tasks are still active. |
| Require Rejection Reason | Before Update | Triggers when Approval changes to "Rejected." | Validates that Work Notes has been updated; blocks rejection if empty. |
| State Sync from Approval | After Update | Triggers once the Approval state changes to "Approved." | Automatically transitions state from "Pending Approval" to "Work in Progress." |
| AI Analyze New Request | After Insert | Calls FlowDeskAI Script Include → Gemini API → parses JSON response. | Auto-populates AI Summary, Department, Priority, Checklist, and Clarifying Questions. |

---

**Slide 32:**

**Key URLs**

| Component | URL |
| :---- | :---- |
| Instance | https://devXXXXXX.service-now.com/esc |
| FlowDesk Workspace | /flowdesk\_workspace/home |
| Table API Endpoint | /api/now/table/x\_1978345\_flowdesk\_request |
| App Engine Studio | https://devXXXXXX.service-now.com/now/builder/ui/home |
| React UI Page | /x\_1978345\_flowdesk\_incident\_manager.do |
| Backend List View | /x\_1978345\_flowdesk\_request\_list.do |

---

**Slide 33:**

**Benefits:**

1. **Centralized Operations**
   * Replaces fragmented spreadsheets and chats with a single "digital front door" via the Employee Center Portal.
   * Consolidates IT, HR, and Facilities requests into a unified Task-based database.

2. **AI-Enhanced Efficiency**
   * Leverages Automated Routing, Flow Designer, and AI-powered analysis to eliminate manual triage.
   * AI summarizes tickets, predicts departments, scores priorities, and generates checklists — all in seconds.

3. **Increased Accountability**
   * Enforces mandatory justification for rejections through Server-Side Business Rules.
   * Ensures process integrity by blocking ticket closure while child tasks remain active.

4. **Real-time Visibility for Management**
   * Provides leadership with FlowDesk Dashboards to monitor department volumes and SLA performance.
   * Automates VIP Escalation, ensuring high-priority business needs are flagged automatically.

5. **Smarter Agent Experience**
   * AI-generated clarifying questions help agents respond faster to vague tickets.
   * Step-by-step checklists guide fulfillers through complex provisioning tasks without guesswork.

---

**Slide 34:**

**Demo**

---

**Slide 35:**

**Thank you for your time.**

---

**Script:**

