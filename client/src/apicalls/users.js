import {axiosInstance} from "./index.js";

export const LoginUser = async (user) => {
    try {
        const response = await axiosInstance.post('/api/users/login', user)
        return response.data
    } catch (e) {
        return e
    }
}

export const RegisterUser = async (user) => {
    try {
        const response = await axiosInstance.post('/api/users/register', user)
        return response.data
    } catch (e) {
        return e
    }
}

export const GetCurrentUser = async () => {
    try {
        const res = await axiosInstance.get("/api/users/currentuser", {  headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }})
        return res.data
    } catch (e) {
        return e
    }
}

export const GetAllUsers = async () => {
    try {
        const res = await axiosInstance.get('/api/users/get-all-users')
        return res.data
    } catch (e) {
        return e
    }
}