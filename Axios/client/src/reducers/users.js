const users = (state = {
    data: [],
    params: {
        page: 1,
        pages: 0
    }
},
    action) => {
    switch (action.type) {
        case 'LOAD_USER_SUCCESS':
            return {
                ...state,
                data: action.users.map(item => {
                    item.sent = true
                    return item
                }),
                params: {
                    page: action.page,
                    pages: action.pages
                }
            }
        case 'LOAD_USER_FAILURE':
            break;
        case 'ADD_USER':
            return {
                ...state,
                data: [
                    ...state.data,
                    {
                        id: action.id,
                        name: action.name,
                        phone: action.phone,
                        sent: true
                    }
                ]
            }
        case 'ADD_USER_SUCCESS':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item.id === action.id) {
                        return {
                            id: action.user.id,
                            name: action.user.name,
                            phone: action.user.phone,
                            sent: true
                        }
                    }
                    return item
                })]
            }
        case 'ADD_USER_FAILURE':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item.id === action.id) {
                        return {
                            ...item,
                            sent: false
                        }
                    }
                    return item
                })]
            }
        case 'RESEND_USER_SUCCESS':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item.id === action.id) {
                        return {
                            id: action.user.id,
                            name: action.user.name,
                            phone: action.user.phone,
                            sent: true
                        }
                    }
                    return item
                })]
            }
        case 'RESEND_USER_FAILURE':
            break;
        case 'REMOVE_USER_SUCCESS':
            return {
                ...state,
                data: [...state.data.filter(item => item.id !== action.id)]
            }
        case 'REMOVE_USER_FAILURE':
            break;
        case 'UPDATE_USER_SUCCESS':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item.id === action.id) {
                        return {
                            id: action.user.id,
                            name: action.user.name,
                            phone: action.user.phone,
                            sent: true
                        }
                    }
                    return item
                })]
            }
        case 'UPDATE_USER_FAILURE':
        case 'LOAD_MORE_SUCCESS':
            return {
                data: [...state.data, ...action.user.value.map(item => {
                    item.sent = true
                    return item
                })],
                params: action.user.params
            }
        case 'LOAD_MORE_FAILURE':
            break;
        case 'SEARCH_USER_SUCCESS':
            return {
                data: action.user.value.map(item => {
                    item.sent = true
                    return item
                }),
                params: action.user.params
            }
        case 'SEARCH_USER_FAILURE':
        case 'RESET_QUERY_SUCCESS':
            return {
                ...state,
                params: {
                    ...state.params,
                    page: 1,
                    pages: 0,
                    name: '',
                    phone: ''
                }
            }
        default:
            return state
    }
}

export default users