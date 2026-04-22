import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    '1cd5c84f0f50075032c14bc530d1b234': {
                        table: 'sys_scope_privilege'
                        id: '1cd5c84f0f50075032c14bc530d1b234'
                    }
                    '26abc84b0f90075032c14bc530d1b259': {
                        table: 'sys_scope_privilege'
                        id: '26abc84b0f90075032c14bc530d1b259'
                    }
                    '3846c50f0f58075032c14bc530d1b2e3': {
                        table: 'sys_scope_privilege'
                        id: '3846c50f0f58075032c14bc530d1b2e3'
                    }
                    '3c46c50f0f58075032c14bc530d1b2dc': {
                        table: 'sys_scope_privilege'
                        id: '3c46c50f0f58075032c14bc530d1b2dc'
                    }
                    '66abc84b0f90075032c14bc530d1b25d': {
                        table: 'sys_scope_privilege'
                        id: '66abc84b0f90075032c14bc530d1b25d'
                    }
                    '69473bfa0fdcc35032c14bc530d1b214': {
                        table: 'sys_scope_privilege'
                        id: '69473bfa0fdcc35032c14bc530d1b214'
                    }
                    '76abc84b0f90075032c14bc530d1b276': {
                        table: 'sys_scope_privilege'
                        id: '76abc84b0f90075032c14bc530d1b276'
                    }
                    '7eabc84b0f90075032c14bc530d1b286': {
                        table: 'sys_scope_privilege'
                        id: '7eabc84b0f90075032c14bc530d1b286'
                    }
                    '84bb30c70f18075032c14bc530d1b234': {
                        table: 'sys_scope_privilege'
                        id: '84bb30c70f18075032c14bc530d1b234'
                    }
                    a6abc84b0f90075032c14bc530d1b261: {
                        table: 'sys_scope_privilege'
                        id: 'a6abc84b0f90075032c14bc530d1b261'
                    }
                    aeab480b0f90075032c14bc530d1b258: {
                        table: 'sys_scope_privilege'
                        id: 'aeab480b0f90075032c14bc530d1b258'
                    }
                    aeabc84b0f90075032c14bc530d1b271: {
                        table: 'sys_scope_privilege'
                        id: 'aeabc84b0f90075032c14bc530d1b271'
                    }
                    'ai-analyze-request': {
                        table: 'sys_script'
                        id: '92f0ac3705ce4d6f880938bf52cad5f4'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: 'cf6b7c8305da4774bf1e90fc996579ab'
                    }
                    fda673ba0fdcc35032c14bc530d1b28b: {
                        table: 'sys_properties'
                        id: 'fda673ba0fdcc35032c14bc530d1b28b'
                        deleted: true
                    }
                    FlowDeskAI: {
                        table: 'sys_script_include'
                        id: 'fb5a4c22b9284f6e863e490b77418b99'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'b55a4c6293474960a803935f2847bc92'
                    }
                    'src_server_business-rules_ai-analyze-request_js': {
                        table: 'sys_module'
                        id: '1abeb3659a5d41a996ee6025825621bd'
                    }
                    'src_server_script-includes_FlowDeskAI_server_js': {
                        table: 'sys_module'
                        id: '780588ad6ddc4b66917c75defc30c9ce'
                    }
                }
                composite: [
                    {
                        table: 'sys_number'
                        id: '06a263fe87e34c49a712efb3d80609b7'
                        key: {
                            category: 'x_1978345_flowdesk_request'
                            prefix: 'FDR'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '129eaa6748884baca47df2640f7676a7'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_ai_checklist'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '23177274e0a1418dbbe833847bc0eab0'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_ai_priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2a29551d7e8543f4bbd7bc85d10c7e5c'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_ai_clarifying_questions'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '2cadfe5f76dd428cbb4d7130a8ad9eeb'
                        key: {
                            endpoint: 'x_1978345_flowdesk_incident_manager.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3725fb38cf914e6f9323de86c69e468d'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_ai_priority'
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
                        table: 'sys_documentation'
                        id: '4f4baa1a64ba4da0929bdf78700cd113'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_request_category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '51960a0939a44485bce44905667692cb'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '526cc48885af43d5acb7f915e8e5cbb7'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_requires_approval'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '566d413340744580ace89c1d3eb5a5f4'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_requires_approval'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '62f0b9794563474397d8f99267843583'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_request_category'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '72797e027e904b96b84d600774e64946'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_department'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '72e976da285a4401b4c18baf6a7177be'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_ai_clarifying_questions'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7e3e8e93c38f4a83916c35b286462229'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_department'
                            value: 'facilities'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7fbf05c20d6f4ca9848d8691d0bbfe3f'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_ai_department'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8b2f8c6facb14017a33841a19dbe5f94'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_requester'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8c04e218b1644abe8d3cb4127ec6198f'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8db4cb5751684a0881d04fc0ce941814'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_ai_checklist'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '8e5eeac0d2f04597a81fcc011f426a0b'
                        key: {
                            name: 'x_1978345_flowdesk/main.js.map'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '96c2237170ca489096766fd836b8c4b0'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a539a99ad3a14ac59453b172a1007e8b'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_ai_processed'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'aee8c1a19ba3477aac9fb2fd7e8774da'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_ai_department'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b6a98e8897404c7b98bfaf6420bbcfae'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_department'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'baad6b632e1f4dfbb8a498c4e6f24e49'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_requester'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'bff52d4c5eda4e5bad1f7400fdf0f845'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_department'
                            value: 'hr'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'c4cfc47e40db456183fc64393f2d4e7c'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'ccbc56690bee4710ae54101d89faec11'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_department'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cd99283d9bbc499a9b1a941716a90c64'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_ai_summary'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f30d6d1db55f411cb9684137d883f2ce'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_ai_processed'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f59cc3f16fc8442d8175b9ac3bb86897'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_ai_summary'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fd1e2d1dfeb142649f33dab57af74806'
                        key: {
                            name: 'x_1978345_flowdesk_request'
                            element: 'u_department'
                            value: 'it'
                        }
                    },
                ]
            }
        }
    }
}
