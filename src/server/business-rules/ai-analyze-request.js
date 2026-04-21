import { gs } from '@servicenow/glide'

/**
 * AI Analyze New Request — Business Rule Script (Module)
 * Fires after a new FlowDesk Request is inserted.
 * Calls the FlowDeskAI Script Include to analyze the ticket,
 * then updates the record with AI results.
 */
export function aiAnalyzeNewRequest(current, previous) {
    // Don't re-process already analyzed requests
    if (current.getValue('u_ai_processed') == 'true') {
        return
    }

    var shortDescription = current.getValue('short_description') || ''
    var description = current.getValue('description') || ''

    // Skip if there's nothing to analyze
    if (!shortDescription && !description) {
        gs.info('FlowDeskAI: Skipping analysis — no description provided')
        return
    }

    // Call the FlowDeskAI Script Include
    // FlowDeskAI is defined as a Script Include in this scope and is auto-available
    var ai = new FlowDeskAI()
    var result = ai.analyzeRequest(shortDescription, description)

    if (!result) {
        gs.warn('FlowDeskAI: AI analysis returned no results for ' + current.getValue('number'))
        return
    }

    // Update AI fields
    current.setValue('u_ai_summary', result.summary || '')
    current.setValue('u_ai_department', result.department || '')
    current.setValue('u_ai_priority', result.priority + (result.priority_reason ? ' — ' + result.priority_reason : ''))
    current.setValue('u_ai_checklist', (result.checklist || []).join('\n'))
    current.setValue('u_ai_clarifying_questions', (result.clarifying_questions || []).join('\n'))
    current.setValue('u_ai_processed', true)

    // Auto-route: set assignment group based on AI department prediction
    var predictedDept = result.department
    var deptGroupMap = {
        IT: 'IT Support',
        HR: 'HR Services',
        Facilities: 'Facilities Management',
    }
    if (deptGroupMap[predictedDept] && !current.getValue('assignment_group')) {
        current.assignment_group.setDisplayValue(deptGroupMap[predictedDept])
    }

    // Auto-set priority based on AI scoring
    var priorityMap = { Critical: '1', High: '2', Medium: '3', Low: '4' }
    if (priorityMap[result.priority]) {
        current.setValue('priority', priorityMap[result.priority])
    }

    // Also set the department field if it was left empty
    if (!current.getValue('u_department') && result.department) {
        var deptValueMap = { IT: 'it', HR: 'hr', Facilities: 'facilities' }
        if (deptValueMap[result.department]) {
            current.setValue('u_department', deptValueMap[result.department])
        }
    }

    current.update()
    gs.info('FlowDeskAI: Successfully analyzed and updated ' + current.getValue('number'))
}
