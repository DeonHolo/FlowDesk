import React, { useState, useEffect } from 'react'
import './RequestForm.css'

export default function RequestForm({ request, onSubmit, onCancel }) {
    const isEditing = !!request

    const [formData, setFormData] = useState({
        short_description: '',
        description: '',
        u_department: 'it',
        u_request_category: '',
        priority: '3',
        state: '1',
    })

    useEffect(() => {
        if (request) {
            const getValue = (field) => {
                if (!field) return ''
                return typeof field === 'object' ? field.value || '' : field
            }
            setFormData({
                short_description: getValue(request.short_description),
                description: getValue(request.description),
                u_department: getValue(request.u_department) || 'it',
                u_request_category: getValue(request.u_request_category),
                priority: getValue(request.priority) || '3',
                state: getValue(request.state) || '1',
            })
        }
    }, [request])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <div className="form-overlay">
            <div className="form-container">
                <div className="form-header">
                    <h2>{isEditing ? `Edit ${request.number?.display_value || ''}` : 'New Request'}</h2>
                    <button type="button" className="close-button" onClick={onCancel}>
                        ×
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="short_description">Short Description *</label>
                        <input
                            type="text"
                            id="short_description"
                            name="short_description"
                            value={formData.short_description}
                            onChange={handleChange}
                            required
                            maxLength={160}
                            placeholder="e.g. New laptop setup for Marketing Lead"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Details</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={5}
                            maxLength={4000}
                            placeholder="Provide as much detail as possible — the AI will analyze this text to auto-route and prioritize your request."
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="u_department">Department</label>
                            <select id="u_department" name="u_department" value={formData.u_department} onChange={handleChange}>
                                <option value="it">IT</option>
                                <option value="hr">HR</option>
                                <option value="facilities">Facilities</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
                                <option value="1">1 - Critical</option>
                                <option value="2">2 - High</option>
                                <option value="3">3 - Medium</option>
                                <option value="4">4 - Low</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="state">State</label>
                            <select id="state" name="state" value={formData.state} onChange={handleChange}>
                                <option value="1">New</option>
                                <option value="2">In Progress</option>
                                <option value="3">On Hold</option>
                                <option value="6">Resolved</option>
                                <option value="7">Closed</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="u_request_category">Category (optional)</label>
                        <input
                            type="text"
                            id="u_request_category"
                            name="u_request_category"
                            value={formData.u_request_category}
                            onChange={handleChange}
                            maxLength={200}
                            placeholder="e.g. Hardware, Onboarding, Maintenance"
                        />
                    </div>

                    <div className="ai-hint">
                        <span className="ai-hint-icon">🤖</span>
                        <span>AI will analyze this request after submission to auto-generate a summary, route to the correct team, score priority, and create a fulfillment checklist.</span>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={onCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-button">
                            {isEditing ? 'Update' : 'Submit Request'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
