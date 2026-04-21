# FlowDesk — Developer & AI Agent Guide

> **App Name:** FlowDesk (Startup Helpdesk & Ops Hub)
> **Scope:** `x_1978345_flowdesk`
> **Platform:** ServiceNow (Australia release)
> **Course:** CSIT 440 — Industry Trends (G4, Team Git Gud)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [File Structure](#2-file-structure)
3. [Development Workflow (PDI ↔ GitHub ↔ IDE)](#3-development-workflow)
4. [AI Integration Strategy](#4-ai-integration-strategy)
5. [Implementing the AI Features](#5-implementing-the-ai-features)
6. [Verification & Testing](#6-verification--testing)
7. [Key ServiceNow Concepts](#7-key-servicenow-concepts)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Project Overview

**What is FlowDesk?**
A ServiceNow-based operations management system that centralizes internal IT, HR, and Facilities requests. Instead of employees using scattered chats and spreadsheets, FlowDesk provides a unified intake portal with automated routing, approval workflows, and **AI-powered ticket analysis**.

**Key Identifiers:**

| Property | Value |
|---|---|
| Application Scope | `x_1978345_flowdesk` |
| Scope ID | `b99a2e360f94c35032c14bc530d1b216` |
| Display Name | FlowDesk |
| Custom Table (expected) | `x_1978345_flowdesk_request` (extends Task) |
| UI Page Endpoint | `x_1978345_flowdesk_incident_manager.do` |
| PDI URL | `https://devXXXXXX.service-now.com` |

> **⚠️ Important:** The old PPT draft referenced scope `x_1978345_startu_2`. That is **incorrect**. The actual scope from `now.config.json` is `x_1978345_flowdesk`. Always use this.

---

## 2. File Structure

```
FlowDesk/
├── docs/                              # Documentation
│   ├── DEVELOPER_GUIDE.md             # ← You are here
│   └── STARTUP HELPDESK...md          # PPT slide draft
├── src/
│   ├── client/                        # React 19 frontend (bundled by Rollup)
│   │   ├── index.html                 # HTML entry (uses <sdk:now-ux-globals>)
│   │   ├── main.jsx                   # React DOM mount point
│   │   ├── app.jsx                    # Main App component (FlowDesk layout)
│   │   ├── app.css                    # App-level styles
│   │   ├── components/
│   │   │   ├── RequestList.jsx        # Table display of requests
│   │   │   ├── RequestList.css
│   │   │   ├── RequestForm.jsx        # Create/Edit request modal
│   │   │   ├── RequestForm.css
│   │   │   ├── AiPanel.jsx            # AI Analysis side-panel
│   │   │   └── AiPanel.css
│   │   └── services/
│   │       └── RequestService.js      # REST calls to FlowDesk Request table
│   ├── server/                        # Server-side scripts (modules)
│   │   ├── business-rules/
│   │   │   └── ai-analyze-request.js  # AI analysis BR logic
│   │   └── script-includes/
│   │       └── FlowDeskAI.server.js   # Gemini API integration class
│   └── fluent/                        # ServiceNow Fluent API definitions
│       ├── index.now.ts               # Fluent entry
│       ├── tables/
│       │   └── flowdesk-request.now.ts     # FlowDesk Request table (extends Task)
│       ├── business-rules/
│       │   └── ai-analyze-request.now.ts   # AI analysis Business Rule
│       ├── script-includes/
│       │   └── flowdesk-ai.now.ts          # FlowDeskAI Script Include
│       ├── ui-pages/
│       │   └── incident-manager.now.ts     # Registers the UI Page
│       └── generated/
│           └── keys.ts                # Auto-generated sys_ids (DO NOT EDIT)
├── now.config.json                    # Scope, scopeId, app name
├── now.prebuild.mjs                   # Rollup build for client assets
├── package.json                       # Dependencies (@servicenow/sdk, React 19)
├── .eslintrc                          # ESLint config
└── .gitignore
```

### What Each Layer Does

| Layer | Files | Purpose |
|---|---|---|
| **React Frontend** | `src/client/*` | The UI that agents/employees see. Bundled by Rollup into static assets and served as a ServiceNow UI Page. |
| **Server Scripts** | `src/server/*` | Business logic that runs on the ServiceNow server — AI analysis, routing, etc. |
| **Fluent Definitions** | `src/fluent/*.now.ts` | Declarative TypeScript files that define ServiceNow artifacts (Tables, Business Rules, Script Includes, UI Pages) using `@servicenow/sdk`. Compiled into ServiceNow records on deploy. |
| **Build Pipeline** | `now.prebuild.mjs` | Runs Rollup with ServiceNow plugins to bundle the React app before the SDK build. |
| **Generated Keys** | `src/fluent/generated/keys.ts` | Auto-generated mapping of artifact sys_ids. **Never edit manually.** |

### How the Frontend Talks to ServiceNow

The React app uses `window.g_ck` (a CSRF token injected by `<sdk:now-ux-globals>`) to authenticate REST calls to the ServiceNow Table API:

```
Browser → fetch('/api/now/table/x_1978345_flowdesk_request', { headers: { 'X-UserToken': window.g_ck } })
        → ServiceNow responds with JSON
```

This means the frontend **only works when served from a ServiceNow instance** — it cannot run standalone with `npm run dev`.

---

## 3. Development Workflow

### The Triangle: PDI ↔ GitHub ↔ IDE

```
┌─────────────────┐
│  ServiceNow PDI │  (devXXXXXX.service-now.com)
│  (Source of      │
│   Truth for      │
│   platform       │
│   config)        │
└────────┬────────┘
         │  Source Control (built-in Git integration)
         ▼
┌─────────────────┐
│     GitHub       │  (your repo)
│  (Central Hub)   │
└────────┬────────┘
         │  git pull / git push
         ▼
┌─────────────────┐
│   Local IDE      │  (VS Code / Cursor + AI)
│  (Where you      │
│   write code)    │
└─────────────────┘
```

### Step-by-Step Workflow

#### A. PDI → GitHub (Get latest from ServiceNow)

1. Open your PDI: `https://devXXXXXX.service-now.com`
2. Navigate to **App Engine Studio** → open **FlowDesk** app
3. Go to **Source Control** tab
4. Click **Commit** to save any platform-side changes (Business Rules, tables, etc.)
5. Click **Push** to send commits to your linked GitHub repo
6. Verify on GitHub that the commit appeared

#### B. GitHub → IDE (Pull latest to local)

```bash
cd "d:\SchoolStuff\College Stuff\3rd Year College BSIT\Second Semester\CSIT440 (Industry Trends)\FlowDesk"
git pull origin main
```

#### C. IDE → GitHub (Push your code changes)

```bash
git add .
git commit -m "feat: add AI summarization to request form"
git push origin main
```

#### D. GitHub → PDI (Deploy code to ServiceNow)

1. Open your PDI → **App Engine Studio** → **FlowDesk**
2. Go to **Source Control** tab
3. Click **Pull** (or **Fetch and Pull**) to pull your IDE changes
4. The SDK will automatically build your React frontend and deploy it
5. Navigate to your UI Page to verify: `https://devXXXXXX.service-now.com/x_1978345_flowdesk_incident_manager.do`

#### E. Building Locally (Optional — for syntax checking only)

```bash
npm install          # Install dependencies (first time only)
npm run build        # Runs now-sdk build (compiles fluent + bundles React)
```

> **Note:** The React app **cannot be previewed locally** in a browser because it depends on `window.g_ck` and ServiceNow APIs. You must deploy to the PDI to test.

### Quick Verification Checklist

| What to Check | How |
|---|---|
| UI Page loads | Visit `https://devXXXXXX.service-now.com/x_1978345_flowdesk_incident_manager.do` |
| React app renders | You should see the "Incident Response Manager" header |
| API calls work | Open browser DevTools → Network tab → look for `/api/now/table/` calls returning `200` |
| Source control synced | App Engine Studio → Source Control → no pending changes |
| Build succeeds | Run `npm run build` locally — no errors |

---

## 4. AI Integration Strategy

### Recommended AI API: Google Gemini (Free Tier)

| Property | Details |
|---|---|
| Model | Gemini 2.0 Flash |
| Pricing | **Free** (15 RPM, 1,500 RPD) |
| Auth | API Key (append `?key=YOUR_KEY` to URL) |
| Endpoint | `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent` |
| Why | No credit card needed, generous free limits, simple REST, great at text analysis |

**How to get your API key:**
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with a Google account
3. Click **"Get API Key"** → **"Create API key"**
4. Copy and save the key securely

### Architecture: Server-Side via Outbound REST

```
Employee submits ticket
        │
        ▼
┌──────────────────────┐
│  ServiceNow          │
│  Business Rule        │  (After Insert on request table)
│  or Flow Designer     │
└──────────┬───────────┘
           │  Outbound REST Message
           ▼
┌──────────────────────┐
│  Google Gemini API    │
│  (analyzes text,      │
│   returns JSON)       │
└──────────┬───────────┘
           │  Response parsed
           ▼
┌──────────────────────┐
│  ServiceNow updates   │
│  the record fields:   │
│  - AI Summary         │
│  - Department (routed)│
│  - Priority (scored)  │
│  - Checklist          │
│  - Clarifying Qs      │
└──────────────────────┘
```

**Why server-side (Option A)?**
- API key stays **secure** on the ServiceNow instance (not exposed in browser JS)
- Runs **automatically** when a ticket is created — no user action needed
- Integrates naturally with ServiceNow's automation (Business Rules, Flows)
- This is the "proper" ServiceNow pattern

### Setup Steps on the PDI

#### Step 1: Create Custom Fields on Your Request Table

Add these fields to your request table (via Table Builder or Dictionary):

| Field Label | Column Name | Type | Max Length |
|---|---|---|---|
| AI Summary | `u_ai_summary` | String | 1000 |
| AI Department | `u_ai_department` | String | 100 |
| AI Priority | `u_ai_priority` | String | 40 |
| AI Checklist | `u_ai_checklist` | String | 4000 |
| AI Clarifying Questions | `u_ai_clarifying_questions` | String | 4000 |
| AI Processed | `u_ai_processed` | True/False | — |

#### Step 2: Create an Outbound REST Message

1. Navigate to **System Web Services → Outbound → REST Message**
2. Create new:
   - **Name:** `Gemini AI`
   - **Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY`
   - **Authentication:** No authentication (key is in URL)
3. Add an **HTTP Method**:
   - **Name:** `analyzeTicket`
   - **HTTP Method:** POST
   - **Endpoint:** (same as above)
   - **HTTP Headers:** `Content-Type: application/json`
   - **Content / Request Body:**

```json
{
  "contents": [{
    "parts": [{
      "text": "${prompt}"
    }]
  }],
  "generationConfig": {
    "responseMimeType": "application/json"
  }
}
```

> The `${prompt}` is a variable substitution that ServiceNow will replace at runtime.

#### Step 3: Create a Script Include (Reusable AI Helper)

Navigate to **System Definition → Script Includes** and create:

- **Name:** `FlowDeskAI`
- **API Name:** `x_1978345_flowdesk.FlowDeskAI`
- **Accessible from:** All application scopes

```javascript
var FlowDeskAI = Class.create();
FlowDeskAI.prototype = {
    initialize: function() {},

    analyzeRequest: function(shortDescription, description) {
        var prompt = 'You are an IT operations AI assistant for a startup helpdesk. ' +
            'Analyze the following support request and respond in valid JSON with these exact keys:\n' +
            '{\n' +
            '  "summary": "A concise one-paragraph summary of the request",\n' +
            '  "department": "IT" or "HR" or "Facilities",\n' +
            '  "priority": "Critical" or "High" or "Medium" or "Low",\n' +
            '  "priority_reason": "Brief explanation of why this priority was assigned",\n' +
            '  "checklist": ["Step 1...", "Step 2...", "Step 3..."],\n' +
            '  "clarifying_questions": ["Question 1?", "Question 2?"]\n' +
            '}\n\n' +
            'REQUEST TITLE: ' + shortDescription + '\n' +
            'REQUEST DETAILS: ' + (description || 'No additional details provided.');

        try {
            var restMessage = new sn_ws.RESTMessageV2('x_1978345_flowdesk.Gemini AI', 'analyzeTicket');
            restMessage.setStringParameterNoEscape('prompt', prompt);
            var response = restMessage.execute();
            var httpStatus = response.getStatusCode();
            var responseBody = response.getBody();

            if (httpStatus == 200) {
                var parsed = JSON.parse(responseBody);
                var aiText = parsed.candidates[0].content.parts[0].text;
                return JSON.parse(aiText);
            } else {
                gs.error('FlowDeskAI: Gemini API returned ' + httpStatus + ': ' + responseBody);
                return null;
            }
        } catch (e) {
            gs.error('FlowDeskAI: Error - ' + e.message);
            return null;
        }
    },

    type: 'FlowDeskAI'
};
```

#### Step 4: Create a Business Rule (Trigger on New Requests)

- **Name:** `AI Analyze New Request`
- **Table:** Your request table
- **When:** After → Insert
- **Advanced:** true

```javascript
(function executeRule(current, previous) {
    if (current.u_ai_processed == true) return;

    var ai = new x_1978345_flowdesk.FlowDeskAI();
    var result = ai.analyzeRequest(
        current.short_description.toString(),
        current.description.toString()
    );

    if (result) {
        current.u_ai_summary = result.summary || '';
        current.u_ai_department = result.department || '';
        current.u_ai_priority = result.priority || '';
        current.u_ai_checklist = (result.checklist || []).join('\n');
        current.u_ai_clarifying_questions = (result.clarifying_questions || []).join('\n');
        current.u_ai_processed = true;

        // Auto-route based on AI department prediction
        var deptGroupMap = {
            'IT': 'IT Support',
            'HR': 'HR Services',
            'Facilities': 'Facilities Management'
        };
        if (deptGroupMap[result.department]) {
            current.assignment_group.setDisplayValue(deptGroupMap[result.department]);
        }

        // Auto-set priority
        var priorityMap = { 'Critical': '1', 'High': '2', 'Medium': '3', 'Low': '4' };
        if (priorityMap[result.priority]) {
            current.priority = priorityMap[result.priority];
        }

        current.update();
    }
})(current, previous);
```

---

## 5. Implementing the AI Features

### Feature 1: Summarize & Route
- **Handled by:** The `summary` and `department` fields from the AI response
- **Where it shows:** `u_ai_summary` on the form + auto-assigned `assignment_group`
- **User sees:** Clean summary at the top of their ticket, auto-routed to the right team

### Feature 2: Checklist & Task Generator
- **Handled by:** The `checklist` array from the AI response
- **Where it shows:** `u_ai_checklist` field (newline-separated steps)
- **Enhancement:** Could create actual child tasks using GlideRecord in the Business Rule

### Feature 3: Priority & Risk Scoring
- **Handled by:** The `priority` and `priority_reason` fields from the AI response
- **Where it shows:** `priority` gets auto-set, `u_ai_priority` shows reasoning
- **Works with:** The existing VIP Escalation Business Rule

### Feature 4: Guided Clarifying Questions
- **Handled by:** The `clarifying_questions` array from the AI response
- **Where it shows:** `u_ai_clarifying_questions` field
- **Agent sees:** Follow-up questions they can copy-paste into their response

### Showing AI Results in the React Frontend

Update `IncidentService.js` to fetch the AI fields:

```javascript
searchParams.set('sysparm_fields',
    'sys_id,number,short_description,description,state,impact,opened_at,' +
    'u_ai_summary,u_ai_department,u_ai_priority,u_ai_checklist,u_ai_clarifying_questions'
);
```

---

## 6. Verification & Testing

### Testing the AI Integration

1. **Test the REST Message directly:**
   - Go to your REST Message → `analyzeTicket` method → click **Test**
   - Set `prompt` to: `Analyze this: The server room AC is leaking onto the server rack`
   - You should get a 200 response with JSON

2. **Test via record creation:**
   - Create a new request via the ServiceNow form
   - Refresh — the `u_ai_*` fields should be populated

3. **Check System Logs:**
   - Navigate to `/syslog_list.do` and filter for `FlowDeskAI` to see any errors

### Test Scenarios

| Input | Expected Department | Expected Priority |
|---|---|---|
| "Server room AC is leaking onto the rack" | Facilities | Critical |
| "New hire starting Monday, needs laptop" | IT | High |
| "My software won't install" | IT | Medium (+ clarifying questions) |
| "Break room microwave is dirty" | Facilities | Low |
| "Need to update my tax withholding forms" | HR | Low |

---

## 7. Key ServiceNow Concepts

| Concept | What It Is |
|---|---|
| **Scope** | App namespace (`x_1978345_flowdesk`) prefixing all artifacts |
| **Table API** | REST endpoint: `/api/now/table/{table_name}` |
| **g_ck** | CSRF token for client-side authenticated API calls |
| **GlideRecord** | Server-side database operations API |
| **Outbound REST Message** | Reusable HTTP call definition (how we call Gemini) |
| **Script Include** | Reusable server-side JS class (`FlowDeskAI`) |
| **Business Rule** | Server-side trigger on record insert/update/delete |
| **Fluent API** | TypeScript SDK for defining artifacts in code |
| **UI Page** | Custom HTML page hosted on ServiceNow |
| **now-sdk** | CLI for building and deploying scoped apps |

---

## 8. Troubleshooting

| Problem | Fix |
|---|---|
| React app blank | Access via the `.do` URL on PDI, not locally |
| `npm run build` fails | Run `npm install` first |
| AI fields not populating | Check Business Rule is Active, on correct table, check System Logs |
| Gemini returns 400 | Test REST Message directly; verify API key |
| Gemini returns 429 | Rate limit hit (15 RPM free) — wait and retry |
| `git push` rejected | `git pull --rebase origin main` first |
| `keys.ts` conflicts | Always accept the PDI (incoming) version |

### Useful PDI URLs

| Page | URL Path |
|---|---|
| App Engine Studio | `/now/builder/ui/home` |
| System Logs | `/syslog_list.do` |
| Business Rules | `/sys_script_list.do` |
| Script Includes | `/sys_script_include_list.do` |
| REST Messages | `/sys_rest_message_list.do` |
| Your UI Page | `/x_1978345_flowdesk_incident_manager.do` |

---

## For AI Agents

If you are an AI agent working on this codebase:

1. **You can edit files in `src/`** — everything else is config or generated.
2. **`src/fluent/generated/keys.ts`** is auto-generated — **never modify it.**
3. **The React app cannot be previewed locally.** It must be deployed to the PDI.
4. **The scope is `x_1978345_flowdesk`** — use this for all table/API references.
5. **Server-side scripts** (Business Rules, Script Includes) live on the PDI and sync via Source Control.
6. **New React components** go in `src/client/components/`.
7. **New ServiceNow artifacts** go in `src/fluent/` as `.now.ts` files.
8. **Build with `npm run build`** — this runs the ServiceNow SDK + Rollup bundler.
