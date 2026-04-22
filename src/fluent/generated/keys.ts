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
                    'flowdesk-request-create': {
                        table: 'sys_security_acl'
                        id: '19475c65366e4d528201cbd548c9f936'
                    }
                    'flowdesk-request-delete': {
                        table: 'sys_security_acl'
                        id: '7aa82033423d41459f66040975a4d437'
                    }
                    'flowdesk-request-read': {
                        table: 'sys_security_acl'
                        id: '7fc33f49269f493d986fa5306ef53e2b'
                    }
                    'flowdesk-request-state-write': {
                        table: 'sys_security_acl'
                        id: 'af9d2fd3722d4cfa924df13f60699fb2'
                    }
                    'flowdesk-request-write': {
                        table: 'sys_security_acl'
                        id: 'f1d623c1a2b74edb9fae3e9e1e3eb1a8'
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
                        table: 'sys_security_acl_role'
                        id: '1213dbf1aa854a07b739e83eaa2c3ef0'
                        key: {
                            sys_security_acl: '19475c65366e4d528201cbd548c9f936'
                            sys_user_role: {
                                id: 'c240628fa7104535ae794d5c7de11b0b'
                                key: {
                                    name: 'x_1978345_flowdesk.requester'
                                }
                            }
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
                        table: 'sys_user_role'
                        id: '22bd6f2abfc543ddb7e4e13e8a04bb79'
                        key: {
                            name: 'x_1978345_flowdesk.manager'
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
                        table: 'sys_security_acl_role'
                        id: '43b3de47286645c7be78ac23fdbe18f4'
                        key: {
                            sys_security_acl: 'af9d2fd3722d4cfa924df13f60699fb2'
                            sys_user_role: {
                                id: '22bd6f2abfc543ddb7e4e13e8a04bb79'
                                key: {
                                    name: 'x_1978345_flowdesk.manager'
                                }
                            }
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
                        table: 'sys_security_acl_role'
                        id: '4ff00cfdd45e4b69b625768cff25a958'
                        key: {
                            sys_security_acl: 'f1d623c1a2b74edb9fae3e9e1e3eb1a8'
                            sys_user_role: {
                                id: 'e4aa90f6a0d945cca550c11a4f005908'
                                key: {
                                    name: 'x_1978345_flowdesk.fulfiller'
                                }
                            }
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
                        table: 'sys_security_acl_role'
                        id: '5c5997f5234f4c2db3abd04473260a07'
                        key: {
                            sys_security_acl: '7aa82033423d41459f66040975a4d437'
                            sys_user_role: {
                                id: '22bd6f2abfc543ddb7e4e13e8a04bb79'
                                key: {
                                    name: 'x_1978345_flowdesk.manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '5dd748c3bf134cb69fbc90aed2298662'
                        key: {
                            sys_security_acl: '7fc33f49269f493d986fa5306ef53e2b'
                            sys_user_role: {
                                id: 'c240628fa7104535ae794d5c7de11b0b'
                                key: {
                                    name: 'x_1978345_flowdesk.requester'
                                }
                            }
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
                        table: 'sys_security_acl_role'
                        id: '75a43ada302749e6aa87d902d8ac7418'
                        key: {
                            sys_security_acl: '7fc33f49269f493d986fa5306ef53e2b'
                            sys_user_role: {
                                id: '22bd6f2abfc543ddb7e4e13e8a04bb79'
                                key: {
                                    name: 'x_1978345_flowdesk.manager'
                                }
                            }
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
                        table: 'sys_security_acl_role'
                        id: '89c861456df9441caebd1afa6a310415'
                        key: {
                            sys_security_acl: 'f1d623c1a2b74edb9fae3e9e1e3eb1a8'
                            sys_user_role: {
                                id: '46b0e407b27c42b4adcf1a0fd6164cd7'
                                key: {
                                    name: 'admin'
                                }
                            }
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
                        table: 'sys_security_acl_role'
                        id: '8f4205ca87aa42e2b4c0b0f1d99124e4'
                        key: {
                            sys_security_acl: '19475c65366e4d528201cbd548c9f936'
                            sys_user_role: {
                                id: '27fb94b19851429c875bbedefaca5cd6'
                                key: {
                                    name: 'admin'
                                }
                            }
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
                        table: 'sys_security_acl_role'
                        id: '98fbd17e44d54e0d96c16f78ca068b9b'
                        key: {
                            sys_security_acl: '7fc33f49269f493d986fa5306ef53e2b'
                            sys_user_role: {
                                id: 'e4aa90f6a0d945cca550c11a4f005908'
                                key: {
                                    name: 'x_1978345_flowdesk.fulfiller'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a1d3a1a3e03d4b56a571e6240dca7fb4'
                        key: {
                            sys_security_acl: 'af9d2fd3722d4cfa924df13f60699fb2'
                            sys_user_role: {
                                id: '1415bfe0485843a1822deed74eba76fe'
                                key: {
                                    name: 'admin'
                                }
                            }
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
                        table: 'sys_security_acl_role'
                        id: 'bf9b972b766f4c8bab34440f8c096a86'
                        key: {
                            sys_security_acl: '19475c65366e4d528201cbd548c9f936'
                            sys_user_role: {
                                id: '22bd6f2abfc543ddb7e4e13e8a04bb79'
                                key: {
                                    name: 'x_1978345_flowdesk.manager'
                                }
                            }
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
                        table: 'sys_security_acl_role'
                        id: 'c0b94f0da43345e284536b6d6f0062fd'
                        key: {
                            sys_security_acl: '19475c65366e4d528201cbd548c9f936'
                            sys_user_role: {
                                id: 'e4aa90f6a0d945cca550c11a4f005908'
                                key: {
                                    name: 'x_1978345_flowdesk.fulfiller'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'c240628fa7104535ae794d5c7de11b0b'
                        key: {
                            name: 'x_1978345_flowdesk.requester'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c4248313b77e42cb9e7440a76d96d93f'
                        key: {
                            sys_security_acl: 'af9d2fd3722d4cfa924df13f60699fb2'
                            sys_user_role: {
                                id: 'e4aa90f6a0d945cca550c11a4f005908'
                                key: {
                                    name: 'x_1978345_flowdesk.fulfiller'
                                }
                            }
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
                        table: 'sys_security_acl_role'
                        id: 'cad2e77ca835490bb1a9ea38b1ce9a1c'
                        key: {
                            sys_security_acl: '7fc33f49269f493d986fa5306ef53e2b'
                            sys_user_role: {
                                id: '5503343061cd47db99f955d14b719eac'
                                key: {
                                    name: 'admin'
                                }
                            }
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
                        table: 'sys_security_acl_role'
                        id: 'ddf4f25516734d9bbdbbbef7e0e7c0d0'
                        key: {
                            sys_security_acl: '7aa82033423d41459f66040975a4d437'
                            sys_user_role: {
                                id: '6e76924fd0274cc798e6ff806143f413'
                                key: {
                                    name: 'admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'e4aa90f6a0d945cca550c11a4f005908'
                        key: {
                            name: 'x_1978345_flowdesk.fulfiller'
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
                        table: 'sys_security_acl_role'
                        id: 'f5d488b0018142c79c3a3224b40b2227'
                        key: {
                            sys_security_acl: 'f1d623c1a2b74edb9fae3e9e1e3eb1a8'
                            sys_user_role: {
                                id: '22bd6f2abfc543ddb7e4e13e8a04bb79'
                                key: {
                                    name: 'x_1978345_flowdesk.manager'
                                }
                            }
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
