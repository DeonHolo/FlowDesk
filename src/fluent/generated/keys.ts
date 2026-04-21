import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: 'cf6b7c8305da4774bf1e90fc996579ab'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'b55a4c6293474960a803935f2847bc92'
                    }
                }
                composite: [
                    {
                        table: 'sys_ui_page'
                        id: '2cadfe5f76dd428cbb4d7130a8ad9eeb'
                        key: {
                            endpoint: 'x_1978345_flowdesk_incident_manager.do'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '3c173af1bbf543e7ad4f6fe66d97aec4'
                        key: {
                            name: 'x_1978345_flowdesk/main'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '8e5eeac0d2f04597a81fcc011f426a0b'
                        key: {
                            name: 'x_1978345_flowdesk/main.js.map'
                        }
                    },
                ]
            }
        }
    }
}
