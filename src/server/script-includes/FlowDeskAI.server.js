/**
 * FlowDeskAI — Server-side Script Include
 * Calls Google Gemini API to analyze support requests.
 * Uses sn_ws.RESTMessageV2 in direct mode (no Outbound REST Message record needed).
 *
 * IMPORTANT: Do NOT import Glide APIs here — they are auto-available
 * in Script Include execution context (Class.create pattern).
 */
var FlowDeskAI = Class.create()

FlowDeskAI.prototype = {
    initialize: function () {
        // Read the API key from a System Property (set this on your PDI)
        // Navigate to: sys_properties.do → Create new:
        //   Name:  x_1978345_flowdesk.gemini_api_key
        //   Value: your-gemini-api-key-here
        this.apiKey = gs.getProperty('x_1978345_flowdesk.gemini_api_key', '')
        this.endpoint =
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
    },

    /**
     * Analyzes a support request using Google Gemini AI.
     * @param {string} shortDescription - The ticket title
     * @param {string} description - The full ticket description
     * @returns {object|null} Parsed AI response or null on failure
     */
    analyzeRequest: function (shortDescription, description) {
        if (!this.apiKey) {
            gs.error('FlowDeskAI: No API key configured. Set system property x_1978345_flowdesk.gemini_api_key')
            return null
        }

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
            'REQUEST TITLE: ' +
            shortDescription +
            '\n' +
            'REQUEST DETAILS: ' +
            (description || 'No additional details provided.')

        var requestBody = JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: prompt,
                        },
                    ],
                },
            ],
            generationConfig: {
                responseMimeType: 'application/json',
            },
        })

        try {
            var restMessage = new sn_ws.RESTMessageV2()
            restMessage.setEndpoint(this.endpoint + '?key=' + this.apiKey)
            restMessage.setHttpMethod('POST')
            restMessage.setRequestHeader('Content-Type', 'application/json')
            restMessage.setRequestBody(requestBody)

            var response = restMessage.execute()
            var httpStatus = response.getStatusCode()
            var responseBody = response.getBody()

            if (httpStatus == 200) {
                var parsed = JSON.parse(responseBody)
                // Gemini wraps the response in candidates[0].content.parts[0].text
                var aiText = parsed.candidates[0].content.parts[0].text
                var result = JSON.parse(aiText)
                gs.info('FlowDeskAI: Successfully analyzed request - Department: ' + result.department + ', Priority: ' + result.priority)
                return result
            } else {
                gs.error('FlowDeskAI: Gemini API returned HTTP ' + httpStatus + ': ' + responseBody)
                return null
            }
        } catch (e) {
            gs.error('FlowDeskAI: Error calling Gemini API - ' + e.message)
            return null
        }
    },

    type: 'FlowDeskAI',
}
