import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { readUser, createUser, updateUser, deleteUser, loadUser, searchUser } from './userAPI';

const initialState = {
    value: [],
    params: {
        page: 1,
        pages: 0
    },
    status: 'idle',
};

export const readUserAsync = createAsyncThunk(
    'user/readUser',
    async () => {
        try {
            const response = await readUser();
            return response.data.data;
        } catch (error) {
            console.log('readUser error', error);
        }
    }
);

export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async ({ id, name, phone }, thunkAPI) => {
        const { getState } = thunkAPI
        let state = getState()
        try {
            const response = await createUser(name, phone);
            if (!state.user.params.name && !state.user.params.phone) {
                return { success: true, id, user: response.data.data };
            } else {
                return { success: true };
            }
        } catch (error) {
            console.log('createUser error', error);
            return { success: false, id };
        }
    }
);

export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async ({ id, name, phone }) => {
        try {
            const response = await updateUser(id, name, phone);
            return { success: true, id, user: response.data.data };
        } catch (error) {
            console.log('createUser error', error);
            return { success: false, id };
        }
    }
);

export const deleteUserAsync = createAsyncThunk(
    'user/deleteUser',
    async (id) => {
        try {
            await deleteUser(id);
            return id
        } catch (error) {
            console.log('deleteUser error', error);
        }
    }
);

export const loadUserAsync = createAsyncThunk(
    'user/loadUser',
    async (arg, thunkAPI) => {
        const { getState } = thunkAPI
        let state = getState()
        if (state.user.params.page < state.user.params.pages) {
            let params = {
                ...state.user.params,
                page: state.user.params.page + 1
            }
            try {
                const response = await loadUser(params);
                return { value: response.data.data.users, params };
            } catch (error) {
                console.log('loadUser error', error);
                return { success: false };
            }
        }
        else {
            return {}
        }
    }
);

export const searchUserAsync = createAsyncThunk(
    'user/searchUser',
    async (query, thunkAPI) => {
        const { getState } = thunkAPI
        let state = getState()
        let params = {
            ...state.user.params,
            ...query,
            page: 1
        }
        try {
            const response = await searchUser(params);
            params = {
                ...params,
                pages: response.data.data.pages
            }
            return { value: response.data.data.users, params };
        } catch (error) {
            console.log('searchUser error', error);
            return { success: false };
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        add: (state, action) => {
            state.value.unshift(
                {
                    id: action.payload.id,
                    name: action.payload.name,
                    phone: action.payload.phone,
                    sent: true
                }
            )
            state.value.pop()
        },
        update: (state, action) => {
            state.value.map(item => {
                if (item.id === action.id) {
                    return {
                        id: action.payload.id,
                        name: action.payload.name,
                        phone: action.payload.phone,
                        sent: true
                    }
                }
                return item
            })
        },
        reset: (state, action) => {
            state.params = {
                page: 1,
                pages: 1,
                query: {}
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(readUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(readUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload.users.map(item => ({
                    id: item.id,
                    name: item.name,
                    phone: item.phone,
                    sent: true
                }))
                state.params.page = action.payload.page
                state.params.pages = action.payload.pages
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload.success) {
                    state.value = state.value.map(item => {
                        if (item.id === action.payload.id) {
                            if (action.payload.success === true) {
                                return {
                                    id: action.payload.user.id,
                                    name: action.payload.user.name,
                                    phone: action.payload.user.phone,
                                    sent: true
                                }
                            } else {
                                return state
                            }
                        }
                        return item
                    })
                } else {
                    state.value = state.value.map(item => {
                        if (item.id === action.payload.id) {
                            item.sent = false
                        }
                        return item
                    })
                }
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = state.value.map(item => {
                    if (item.id === action.payload.id) {
                        return {
                            id: action.payload.user.id,
                            name: action.payload.user.name,
                            phone: action.payload.user.phone,
                            sent: true
                        }
                    }
                    return item
                })
            })
            .addCase(deleteUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = state.value.filter(item => item.id !== action.payload)
            })
            .addCase(loadUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload.value) {
                    state.value = [...state.value, ...action.payload.value.map(item => {
                        item.sent = true
                        return item
                    })]
                    state.params = action.payload.params
                } else {
                    return state
                }
            })
            .addCase(searchUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload.value.map(item => {
                    item.sent = true
                    return item
                })
                state.params = action.payload.params
            })
    },
});

export const { add, update, reset } = userSlice.actions;

export const selectUser = (state) => state.user.value;

export const create = (name, phone) => (dispatch, getState) => {
    const id = Date.now()
    let state = getState()
    if (!state.user.params.name && !state.user.params.phone) {
        dispatch(add({ id, name, phone }))
    }
    dispatch(createUserAsync({ id, name, phone }))
};

export const edit = (id, name, phone) => (dispatch, getState) => {
    dispatch(update({ name, phone }))
    dispatch(updateUserAsync({ id, name, phone }))
};

export const resetSearch = () => async (dispatch, getState) => {
    await dispatch(reset())
    dispatch(loadUserAsync())
};

export default userSlice.reducer;