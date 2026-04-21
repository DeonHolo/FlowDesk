import React, { useState, useEffect, useMemo } from 'react'
import { RequestService } from './services/RequestService'
import RequestList from './components/RequestList'
import RequestForm from './components/RequestForm'
import AiPanel from './components/AiPanel'
import './app.css'

export default function App() {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [selectedRequest, setSelectedRequest] = useState(null)
    const [aiPanelRequest, setAiPanelRequest] = useState(null)
    const [error, setError] = useState(null)

    const requestService = useMemo(() => new RequestService(), [])

    const refreshRequests = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await requestService.list()
            setRequests(data)
        } catch (err) {
            setError('Failed to load requests: ' + (err.message || 'Unknown error'))
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        void refreshRequests()
    }, [])

    const handleCreateClick = () => {
        setSelectedRequest(null)
        setShowForm(true)
    }

    const handleEditClick = (request) => {
        setSelectedRequest(request)
        setShowForm(true)
    }

    const handleAiClick = (request) => {
        setAiPanelRequest(request)
    }

    const handleFormClose = () => {
        setShowForm(false)
        setSelectedRequest(null)
    }

    const handleFormSubmit = async (formData) => {
        setLoading(true)
        try {
            if (selectedRequest) {
                const sysId =
                    typeof selectedRequest.sys_id === 'object'
                        ? selectedRequest.sys_id.value
                        : selectedRequest.sys_id
                await requestService.update(sysId, formData)
            } else {
                await requestService.create(formData)
            }
            setShowForm(false)
            await refreshRequests()
        } catch (err) {
            setError('Failed to save request: ' + (err.message || 'Unknown error'))
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flowdesk-app">
            <header className="app-header">
                <div className="header-brand">
                    <span className="brand-icon">⚡</span>
                    <h1>FlowDesk</h1>
                    <span className="brand-subtitle">Startup Helpdesk & Ops Hub</span>
                </div>
                <button className="create-button" onClick={handleCreateClick}>
                    + New Request
                </button>
            </header>

            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => setError(null)}>Dismiss</button>
                </div>
            )}

            <div className="app-content">
                <div className={`list-section ${aiPanelRequest ? 'with-panel' : ''}`}>
                    {loading ? (
                        <div className="loading">Loading requests...</div>
                    ) : (
                        <RequestList
                            requests={requests}
                            onEdit={handleEditClick}
                            onRefresh={refreshRequests}
                            onAiClick={handleAiClick}
                            service={requestService}
                            activeAiId={
                                aiPanelRequest
                                    ? typeof aiPanelRequest.sys_id === 'object'
                                        ? aiPanelRequest.sys_id.value
                                        : aiPanelRequest.sys_id
                                    : null
                            }
                        />
                    )}
                </div>

                {aiPanelRequest && (
                    <AiPanel request={aiPanelRequest} onClose={() => setAiPanelRequest(null)} />
                )}
            </div>

            {showForm && (
                <RequestForm
                    request={selectedRequest}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormClose}
                />
            )}
        </div>
    )
}
