import {axiosInstance} from "./index.js";

export const SendMessage = async (message) => {
    try {
         const res = await axiosInstance.post('/api/messages/new-message', message)
        return res.data
    } catch (e) {
        return e
    }
}

export const GetMessages = async (chatId) => {
    try {
        const res = await axiosInstance.get(`/api/messages/get-all-messages/${chatId}`)
        return res.data
    } catch (e) {
        return e
    }
}