import React from 'react'
import './AiPanel.css'

function displayVal(field) {
    if (!field) return ''
    return typeof field === 'object' ? field.display_value || field.value || '' : field
}

export default function AiPanel({ request, onClose }) {
    const summary = displayVal(request.u_ai_summary)
    const department = displayVal(request.u_ai_department)
    const priority = displayVal(request.u_ai_priority)
    const checklist = displayVal(request.u_ai_checklist)
    const questions = displayVal(request.u_ai_clarifying_questions)
    const number = displayVal(request.number)

    const checklistItems = checklist ? checklist.split('\n').filter((line) => line.trim()) : []
    const questionItems = questions ? questions.split('\n').filter((line) => line.trim()) : []

    return (
        <div className="ai-panel">
            <div className="ai-panel-header">
                <div className="ai-panel-title">
                    <span className="ai-panel-icon">🤖</span>
                    <div>
                        <h3>AI Analysis</h3>
                        <span className="ai-panel-number">{number}</span>
                    </div>
                </div>
                <button className="ai-panel-close" onClick={onClose}>×</button>
            </div>

            <div className="ai-panel-body">
                {/* Summary */}
                {summary && (
                    <div className="ai-section">
                        <h4>📝 Summary</h4>
                        <p className="ai-summary-text">{summary}</p>
                    </div>
                )}

                {/* Department & Priority */}
                <div className="ai-chips">
                    {department && (
                        <div className="ai-section ai-chip">
                            <h4>🏢 Department</h4>
                            <span className={`ai-dept-badge dept-${department.toLowerCase()}`}>{department}</span>
                        </div>
                    )}
                    {priority && (
                        <div className="ai-section ai-chip">
                            <h4>⚡ Priority</h4>
                            <p className="ai-priority-text">{priority}</p>
                        </div>
                    )}
                </div>

                {/* Checklist */}
                {checklistItems.length > 0 && (
                    <div className="ai-section">
                        <h4>✅ Fulfillment Checklist</h4>
                        <ul className="ai-checklist">
                            {checklistItems.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Clarifying Questions */}
                {questionItems.length > 0 && (
                    <div className="ai-section">
                        <h4>❓ Clarifying Questions</h4>
                        <ul className="ai-questions">
                            {questionItems.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {!summary && !department && !priority && checklistItems.length === 0 && questionItems.length === 0 && (
                    <div className="ai-empty">
                        <p>No AI analysis data available yet.</p>
                        <p className="ai-empty-hint">The AI processes requests shortly after submission.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
