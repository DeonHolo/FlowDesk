import '@servicenow/sdk/global'
import { Acl, Role } from '@servicenow/sdk/core'

const requesterRole = Role({
    name: 'x_1978345_flowdesk.requester',
    description: 'Can create and view FlowDesk requests.',
})

const fulfillerRole = Role({
    name: 'x_1978345_flowdesk.fulfiller',
    description: 'Can work and update FlowDesk requests.',
})

const managerRole = Role({
    name: 'x_1978345_flowdesk.manager',
    description: 'Can manage assignment, state transitions, and lifecycle actions.',
})

Acl({
    $id: Now.ID['flowdesk-request-read'],
    type: 'record',
    table: 'x_1978345_flowdesk_request',
    operation: 'read',
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Allow read access to FlowDesk requests for requester and fulfiller roles.',
    roles: [requesterRole, fulfillerRole, managerRole, 'admin'],
})

Acl({
    $id: Now.ID['flowdesk-request-create'],
    type: 'record',
    table: 'x_1978345_flowdesk_request',
    operation: 'create',
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Allow request creation for requester and fulfiller roles.',
    roles: [requesterRole, fulfillerRole, managerRole, 'admin'],
})

Acl({
    $id: Now.ID['flowdesk-request-write'],
    type: 'record',
    table: 'x_1978345_flowdesk_request',
    operation: 'write',
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Allow general updates for fulfiller and manager roles.',
    roles: [fulfillerRole, managerRole, 'admin'],
})

Acl({
    $id: Now.ID['flowdesk-request-delete'],
    type: 'record',
    table: 'x_1978345_flowdesk_request',
    operation: 'delete',
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Allow deletion for manager and admin roles only.',
    roles: [managerRole, 'admin'],
})

Acl({
    $id: Now.ID['flowdesk-request-state-write'],
    type: 'record',
    table: 'x_1978345_flowdesk_request',
    field: 'state',
    operation: 'write',
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Restrict state transitions to fulfiller, manager, and admin roles.',
    roles: [fulfillerRole, managerRole, 'admin'],
})