import React from 'react'
import './RequestList.css'

/**
 * Extracts a display value from a ServiceNow field
 * (which can be either a string or an object with display_value/value).
 */
function displayVal(field) {
    if (!field) return ''
    return typeof field === 'object' ? field.display_value || field.value || '' : field
}

function rawVal(field) {
    if (!field) return ''
    return typeof field === 'object' ? field.value || '' : field
}

export default function RequestList({ requests, onEdit, onRefresh, onAiClick, service, activeAiId }) {
    const handleDelete = async (request) => {
        if (!confirm(`Are you sure you want to delete ${displayVal(request.number)}?`)) {
            return
        }
        try {
            const sysId = rawVal(request.sys_id)
            await service.delete(sysId)
            onRefresh()
        } catch (error) {
            console.error('Failed to delete request:', error)
            alert('Failed to delete request: ' + (error.message || 'Unknown error'))
        }
    }

    const getPriorityClass = (priority) => {
        const val = rawVal(priority)
        switch (val) {
            case '1': return 'priority-critical'
            case '2': return 'priority-high'
            case '3': return 'priority-medium'
            case '4': return 'priority-low'
            default: return ''
        }
    }

    const getDeptClass = (dept) => {
        const val = rawVal(dept)
        switch (val) {
            case 'it': return 'dept-it'
            case 'hr': return 'dept-hr'
            case 'facilities': return 'dept-facilities'
            default: return ''
        }
    }

    const getStateClass = (state) => {
        const val = displayVal(state)
        switch (val) {
            case 'New': return 'state-new'
            case 'In Progress': case 'Work in Progress': return 'state-in-progress'
            case 'On Hold': return 'state-on-hold'
            case 'Resolved': case 'Closed Complete': return 'state-resolved'
            case 'Closed': case 'Closed Incomplete': return 'state-closed'
            default: return ''
        }
    }

    return (
        <div className="request-list">
            {requests.length === 0 ? (
                <div className="no-requests">
                    <span className="empty-icon">📋</span>
                    <p>No requests found</p>
                    <p className="empty-hint">Create a new request to get started</p>
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Description</th>
                            <th>Dept</th>
                            <th>Priority</th>
                            <th>State</th>
                            <th>AI</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => {
                            const sysId = rawVal(req.sys_id)
                            const isAiProcessed = rawVal(req.u_ai_processed) === 'true' || rawVal(req.u_ai_processed) === true
                            const isActive = activeAiId === sysId

                            return (
                                <tr key={sysId} className={isActive ? 'active-row' : ''}>
                                    <td className="cell-number">{displayVal(req.number)}</td>
                                    <td className="cell-desc">{displayVal(req.short_description)}</td>
                                    <td>
                                        <span className={`dept-badge ${getDeptClass(req.u_department)}`}>
                                            {displayVal(req.u_department) || '—'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`priority-badge ${getPriorityClass(req.priority)}`}>
                                            {displayVal(req.priority) || '—'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`state-badge ${getStateClass(req.state)}`}>
                                            {displayVal(req.state)}
                                        </span>
                                    </td>
                                    <td>
                                        {isAiProcessed ? (
                                            <button
                                                className={`ai-button ${isActive ? 'ai-active' : ''}`}
                                                onClick={() => onAiClick(req)}
                                                title="View AI Analysis"
                                            >
                                                🤖
                                            </button>
                                        ) : (
                                            <span className="ai-pending" title="AI analysis pending">⏳</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="edit-button"
                                                onClick={() => onEdit(req)}
                                                aria-label={`Edit ${displayVal(req.number)}`}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDelete(req)}
                                                aria-label={`Delete ${displayVal(req.number)}`}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}
