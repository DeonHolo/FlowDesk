import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { aiAnalyzeNewRequest } from '../../server/business-rules/ai-analyze-request'

/**
 * AI Analyze New Request — Business Rule (Fluent Definition)
 * Triggers after a new FlowDesk Request is inserted.
 * Calls Google Gemini to analyze the ticket and auto-populate
 * AI Summary, Department, Priority, Checklist, and Clarifying Questions.
 */
BusinessRule({
    $id: Now.ID['ai-analyze-request'],
    name: 'AI Analyze New Request',
    table: 'x_1978345_flowdesk_request',
    when: 'after',
    action: ['insert', 'update'],
    active: true,
    order: 200,
    description:
        'Calls Google Gemini AI to analyze new requests. Auto-populates summary, department routing, priority scoring, fulfillment checklist, and clarifying questions.',
    script: aiAnalyzeNewRequest,
})
