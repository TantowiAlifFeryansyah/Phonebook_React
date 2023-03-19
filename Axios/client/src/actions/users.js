import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

// LOAD USER
const loadUserSuccess = (users, page, pages) => ({
    type: 'LOAD_USER_SUCCESS',
    users,
    page,
    pages
})

const loadUserFailure = () => ({
    type: 'LOAD_USER_FAILURE'
})

export const loadUser = () => (dispatch, getState) =>
    request.get('users', { params: getState().users.params }).then(({ data }) => {
        dispatch(loadUserSuccess(data.data.users, data.data.page, data.data.pages))
    }).catch((err) => {
        dispatch(loadUserFailure())
    })

// ADD USERS
const addUserSuccess = (id, user) => ({
    type: 'ADD_USER_SUCCESS',
    id,
    user
})

const addUserFailure = (id) => ({
    type: 'ADD_USER_FAILURE',
    id
})

export const addUserRedux = (id, name, phone) => ({
    type: 'ADD_USER',
    id,
    name,
    phone
})

export const addUser = (name, phone) => (dispatch, getState) => {
    const id = Date.now()
    let state = getState()
    if (!state.users.params.query && dispatch(searchUser())) {
        dispatch(addUserRedux(id, name, phone))
    }
    return request.post('users', { name, phone }).then((response) => {
        dispatch(addUserSuccess(id, response.data.data))
    }).catch((err) => {
        dispatch(addUserFailure(id))
    })
}

// REMOVE USER
const removeUserSuccess = (id, user) => ({
    type: 'REMOVE_USER_SUCCESS',
    id,
    user
})

const removeUserFailure = () => ({
    type: 'REMOVE_USER_FAILURE'
})

export const removeUser = (id) => dispatch => {
    return request.delete(`users/${id}`).then((response) => {
        dispatch(removeUserSuccess(id))
    }).catch((err) => {
        dispatch(removeUserFailure())
    })
}

// RESEND USER
const resendUserSuccess = (id, user) => ({
    type: 'RESEND_USER_SUCCESS',
    id,
    user
})

const resendUserFailure = () => ({
    type: 'RESEND_USER_FAILURE'
})

export const resendUser = ({ id, name, phone }) => dispatch => {
    return request.post(`users`, { name, phone }).then((response) => {
        dispatch(resendUserSuccess(id, response.data.data))
    }).catch((err) => {
        dispatch(resendUserFailure())
    })
}

// UPDATE or EDIT USER
const updateUserSuccess = (id, user) => ({
    type: 'UPDATE_USER_SUCCESS',
    id,
    user
})

const updateUserFailure = () => ({
    type: 'UPDATE_USER_FAILURE'
})

export const updateUser = (id, name, phone) => dispatch => {
    return request.put(`users/${id}`, { name, phone }).then((response) => {
        dispatch(updateUserSuccess(id, response.data.data))
    }).catch((err) => {
        dispatch(updateUserFailure())
    })
}

// LOAD MORE USER
const loadMoreSuccess = (user) => ({
    type: 'LOAD_MORE_SUCCESS',
    user
})

const loadMoreFailure = () => ({
    type: 'LOAD_MORE_FAILURE',
})

export const loadMore = () => (dispatch, getState) => {
    let state = getState()
    if (state.users.params.page <= state.users.params.pages) {
        let params = {
            ...state.users.params,
            page: state.users.params.page + 1
        }
        request.get(`users`, { params }).then((response) => {
            params = {
                ...params,
                pages: response.data.data.pages
            }
            dispatch(loadMoreSuccess({ value: response.data.data.users, params }))
        }).catch((err) => {
            dispatch(loadMoreFailure())
        })
    }
}

// SEARCH USER
const searchUserSuccess = (user) => ({
    type: 'SEARCH_USER_SUCCESS',
    user
})

const searchUserFailure = () => ({
    type: 'SEARCH_USER_FAILURE'
})

export const searchUser = (query) => (dispatch, getState) => {
    let state = getState()
    let params = {
        ...state.users.params,
        ...query,
        page: 1
    }
    return request.get(`users`, { params }).then((response) => {
        params = {
            ...params,
            pages: response.data.data.pages
        }
        dispatch(searchUserSuccess({ value: response.data.data.users, params }))
    }).catch((err) => {
        dispatch(searchUserFailure())
    })
}

// RESET SEARCH USER
export const resetQuery = () => async (dispatch) => {
    await dispatch({
        type: 'RESET_QUERY_SUCCESS'
    })
    dispatch(loadUser())
}