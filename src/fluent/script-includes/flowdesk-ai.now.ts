import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

/**
 * FlowDeskAI Script Include (Fluent Definition)
 * Registers the server-side AI helper class that calls the Google Gemini API.
 */
ScriptInclude({
    $id: Now.ID['FlowDeskAI'],
    name: 'FlowDeskAI',
    active: true,
    description:
        'AI-powered ticket analysis using Google Gemini API. Provides summarization, department routing, priority scoring, checklist generation, and clarifying questions.',
    script: Now.include('../../server/script-includes/FlowDeskAI.server.js'),
    accessibleFrom: 'package_private',
})
