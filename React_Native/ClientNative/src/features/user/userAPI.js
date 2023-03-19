import axios from 'axios'

const request = axios.create({
    baseURL: 'http://192.168.1.46:3000/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export const readUser = () => request.get('users')

export const createUser = (name, phone) => request.post('users', { name, phone })

export const updateUser = (id, name, phone) => request.put(`users/${id}`, { name, phone })

export const deleteUser  = (id) => request.delete(`users/${id}`)

export const loadUser  = (params) => request.get(`users`, { params })

export const searchUser  = (params) => request.get(`users`, { params })
