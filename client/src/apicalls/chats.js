import {axiosInstance} from "./index.js";

export const GetAllChats = async () => {
    try {
        const res = await axiosInstance.get('/api/chats/get-all-chats')
        return res.data
    } catch (e) {
        return e
    }
}

export const CreateNewChat = async (members) => {
    try {
        const res = await axiosInstance.post('/api/chats/create-new-chat', {members})
        return res.data
    } catch (e) {
        return e
    }
}

export const ClearChatMessages = async (chatId) => {
    try {
        const res = await axiosInstance.post('/api/chats/clear-unread-messages', {chat: chatId})
        return res.data
    } catch (e) {
        return e
    }
}