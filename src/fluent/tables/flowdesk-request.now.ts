import '@servicenow/sdk/global'
import { Table, StringColumn, BooleanColumn } from '@servicenow/sdk/core'

/**
 * FlowDesk Request Table
 * Extends the core Task table to inherit standard fields like
 * short_description, description, state, priority, assignment_group, etc.
 * Adds custom AI fields and department metadata.
 */
export const x_1978345_flowdesk_request = Table({
    name: 'x_1978345_flowdesk_request',
    label: 'FlowDesk Request',
    extends: 'task',
    extensible: false,
    allowWebServiceAccess: true,

    autoNumber: {
        prefix: 'FDR',
        number: 1000,
        numberOfDigits: 7,
    },

    schema: {
        // --- Department & Category ---
        u_department: StringColumn({
            label: 'Department',
            mandatory: true,
            choices: {
                it: 'IT',
                hr: 'HR',
                facilities: 'Facilities',
            },
        }),

        u_request_category: StringColumn({
            label: 'Request Category',
            maxLength: 200,
        }),

        u_requester: StringColumn({
            label: 'Requester',
            maxLength: 200,
        }),

        u_requires_approval: BooleanColumn({
            label: 'Requires Approval',
            default: false,
        }),

        // --- AI-Populated Fields ---
        u_ai_summary: StringColumn({
            label: 'AI Summary',
            maxLength: 1000,
        }),

        u_ai_department: StringColumn({
            label: 'AI Department',
            maxLength: 100,
        }),

        u_ai_priority: StringColumn({
            label: 'AI Priority',
            maxLength: 200,
        }),

        u_ai_checklist: StringColumn({
            label: 'AI Checklist',
            maxLength: 4000,
        }),

        u_ai_clarifying_questions: StringColumn({
            label: 'AI Clarifying Questions',
            maxLength: 4000,
        }),

        u_ai_processed: BooleanColumn({
            label: 'AI Processed',
            default: false,
        }),
    },
})
