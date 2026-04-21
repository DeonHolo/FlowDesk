import { gs } from '@servicenow/glide'

/**
 * AI Analyze New Request — Business Rule Script (Module)
 * Fires after a new FlowDesk Request is inserted.
 * Calls the FlowDeskAI Script Include to analyze the ticket,
 * then updates the record with AI results.
 */
export function aiAnalyzeNewRequest(current, previous) {
    try {
        gs.info('FlowDeskAI: Business Rule Triggered for ' + current.getValue('number'))

        // Boolean fields in ServiceNow return '1' (true) or '0' (false)
        if (current.getValue('u_ai_processed') == '1') {
            gs.info('FlowDeskAI: Skipping - Already processed')
            return
        }

        var shortDescription = current.getValue('short_description') || ''
        var description = current.getValue('description') || ''

        if (!shortDescription && !description) {
            gs.info('FlowDeskAI: Skipping analysis — no description provided')
            return
        }

        // Use a safe lookup for the Script Include to avoid raw ReferenceError crashing the script
        var FlowDeskAIGlobal = (typeof FlowDeskAI !== 'undefined') ? FlowDeskAI : (typeof global !== 'undefined' ? global.FlowDeskAI : null);
        if (!FlowDeskAIGlobal) {
            gs.error('FlowDeskAI: Could not locate FlowDeskAI Script Include in scope!');
            return;
        }
        var ai = new FlowDeskAIGlobal()
        
        gs.info('FlowDeskAI: Calling Gemini API...')
        var result = ai.analyzeRequest(shortDescription, description)

        if (!result) {
            gs.warn('FlowDeskAI: AI analysis returned no results for ' + current.getValue('number'))
            return
        }

        gs.info('FlowDeskAI: Applying AI results to record...')
        current.setValue('u_ai_summary', result.summary || '')
        current.setValue('u_ai_department', result.department || '')
        current.setValue('u_ai_priority', result.priority + (result.priority_reason ? ' — ' + result.priority_reason : ''))
        current.setValue('u_ai_checklist', (result.checklist || []).join('\n'))
        current.setValue('u_ai_clarifying_questions', (result.clarifying_questions || []).join('\n'))
        current.setValue('u_ai_processed', '1')

        var predictedDept = result.department
        var deptGroupMap = {
            IT: 'IT Support',
            HR: 'HR Services',
            Facilities: 'Facilities Management',
        }
        if (deptGroupMap[predictedDept] && !current.getValue('assignment_group')) {
            current.assignment_group.setDisplayValue(deptGroupMap[predictedDept])
        }

        var priorityMap = { Critical: '1', High: '2', Medium: '3', Low: '4' }
        if (priorityMap[result.priority]) {
            current.setValue('priority', priorityMap[result.priority])
        }

        if (!current.getValue('u_department') && result.department) {
            var deptValueMap = { IT: 'it', HR: 'hr', Facilities: 'facilities' }
            if (deptValueMap[result.department]) {
                current.setValue('u_department', deptValueMap[result.department])
            }
        }

        current.update()
        gs.info('FlowDeskAI: Successfully analyzed and updated ' + current.getValue('number'))
    } catch (e) {
        gs.error('FlowDeskAI: FATAL ERROR IN BUSINESS RULE - ' + e.name + ': ' + e.message)
    }
}
