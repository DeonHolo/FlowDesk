import { gs, sn_ws } from '@servicenow/glide'

/**
 * AI Analyze New Request — Business Rule Script (Module)
 * Fires after a new FlowDesk Request is inserted or updated.
 * Calls Google Gemini API directly to analyze the ticket,
 * then updates the record with AI results.
 *
 * NOTE: We inline the API call here instead of using a Script Include
 * because the now-sdk ES Module bundler does not bridge Script Includes
 * into module scope automatically.
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

        // ── Gemini API Call (inlined) ──────────────────────────────
        var apiKey = gs.getProperty('x_1978345_flowdesk.gemini_api_key', '')
        if (!apiKey) {
            gs.error('FlowDeskAI: No API key configured. Set system property x_1978345_flowdesk.gemini_api_key')
            return
        }

        gs.info('FlowDeskAI: API key found, building prompt...')

        var prompt =
            'You are an IT operations AI assistant for a startup helpdesk called FlowDesk. ' +
            'Analyze the following support request and respond in valid JSON with these exact keys:\n' +
            '{\n' +
            '  "summary": "A concise one-paragraph summary of the request for the support agent",\n' +
            '  "department": "IT" or "HR" or "Facilities",\n' +
            '  "priority": "Critical" or "High" or "Medium" or "Low",\n' +
            '  "priority_reason": "Brief explanation of why this priority was assigned",\n' +
            '  "checklist": ["Step 1...", "Step 2...", "Step 3..."],\n' +
            '  "clarifying_questions": ["Question 1?", "Question 2?"]\n' +
            '}\n\n' +
            'Rules:\n' +
            '- "department" must be exactly one of: IT, HR, Facilities\n' +
            '- "priority" must be exactly one of: Critical, High, Medium, Low\n' +
            '- "checklist" should be actionable steps for the fulfillment agent\n' +
            '- "clarifying_questions" should be follow-up questions if the request is vague\n' +
            '- If the request is clear enough, set clarifying_questions to an empty array\n\n' +
            'REQUEST TITLE: ' + shortDescription + '\n' +
            'REQUEST DETAILS: ' + (description || 'No additional details provided.')

        var requestBody = JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' },
        })

        gs.info('FlowDeskAI: Calling Gemini API...')

        // Destructure RESTMessageV2 from the sn_ws namespace at runtime
        // to avoid "sealed object" errors from direct property access
        var RestMsg = sn_ws.RESTMessageV2
        var restMessage = new RestMsg()
        restMessage.setEndpoint(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey
        )
        restMessage.setHttpMethod('POST')
        restMessage.setRequestHeader('Content-Type', 'application/json')
        restMessage.setRequestBody(requestBody)

        var response = restMessage.execute()
        var httpStatus = response.getStatusCode()
        var responseBody = response.getBody()

        gs.info('FlowDeskAI: Gemini responded with HTTP ' + httpStatus)

        if (httpStatus != 200) {
            gs.error('FlowDeskAI: Gemini API returned HTTP ' + httpStatus + ': ' + responseBody)
            return
        }

        var parsed = JSON.parse(responseBody)
        var aiText = parsed.candidates[0].content.parts[0].text
        var result = JSON.parse(aiText)

        gs.info('FlowDeskAI: AI result - Department: ' + result.department + ', Priority: ' + result.priority)

        // ── Apply AI results to the record ─────────────────────────
        current.setValue('u_ai_summary', result.summary || '')
        current.setValue('u_ai_department', result.department || '')
        current.setValue('u_ai_priority', result.priority + (result.priority_reason ? ' — ' + result.priority_reason : ''))
        current.setValue('u_ai_checklist', (result.checklist || []).join('\n'))
        current.setValue('u_ai_clarifying_questions', (result.clarifying_questions || []).join('\n'))
        current.setValue('u_ai_processed', '1')

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
    } catch (e) {
        gs.error('FlowDeskAI: FATAL ERROR IN BUSINESS RULE - ' + e.name + ': ' + e.message)
    }
}
