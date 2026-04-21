/**
 * FlowDesk Request Service
 * Handles CRUD operations against the FlowDesk Request table via ServiceNow Table API.
 * Uses window.g_ck for CSRF authentication (only works when served from a ServiceNow instance).
 */
export class RequestService {
    constructor() {
        this.tableName = 'x_1978345_flowdesk_request'
    }

    // Return all requests
    async list() {
        try {
            const searchParams = new URLSearchParams()
            searchParams.set('sysparm_display_value', 'all')
            searchParams.set(
                'sysparm_fields',
                [
                    'sys_id',
                    'number',
                    'short_description',
                    'description',
                    'state',
                    'priority',
                    'u_department',
                    'u_request_category',
                    'u_ai_summary',
                    'u_ai_department',
                    'u_ai_priority',
                    'u_ai_checklist',
                    'u_ai_clarifying_questions',
                    'u_ai_processed',
                    'assignment_group',
                    'opened_at',
                ].join(',')
            )
            searchParams.set('sysparm_query', 'ORDERBYDESCopened_at')

            const response = await fetch(`/api/now/table/${this.tableName}?${searchParams.toString()}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error?.message || `HTTP error ${response.status}`)
            }

            const { result } = await response.json()
            return result || []
        } catch (error) {
            console.error('Error fetching requests:', error)
            throw error
        }
    }

    // Get a single request by sys_id
    async get(sysId) {
        try {
            const searchParams = new URLSearchParams()
            searchParams.set('sysparm_display_value', 'all')

            const response = await fetch(`/api/now/table/${this.tableName}/${sysId}?${searchParams.toString()}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error?.message || `HTTP error ${response.status}`)
            }

            const { result } = await response.json()
            return result
        } catch (error) {
            console.error(`Error fetching request ${sysId}:`, error)
            throw error
        }
    }

    // Create a new request
    async create(data) {
        try {
            const response = await fetch(`/api/now/table/${this.tableName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error?.message || `HTTP error ${response.status}`)
            }

            return response.json()
        } catch (error) {
            console.error('Error creating request:', error)
            throw error
        }
    }

    // Update a request
    async update(sysId, data) {
        try {
            const response = await fetch(`/api/now/table/${this.tableName}/${sysId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error?.message || `HTTP error ${response.status}`)
            }

            return response.json()
        } catch (error) {
            console.error(`Error updating request ${sysId}:`, error)
            throw error
        }
    }

    // Delete a request
    async delete(sysId) {
        try {
            const response = await fetch(`/api/now/table/${this.tableName}/${sysId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error?.message || `HTTP error ${response.status}`)
            }

            return response.ok
        } catch (error) {
            console.error(`Error deleting request ${sysId}:`, error)
            throw error
        }
    }
}
