import { MessageShort } from "../types/resTypes";
import { instance } from "./api";

export const fetchDialogsAPI = async () => {
    const res = await instance.get('/chat')
    return res
}

export const allMessagesAPI = async (chatId:string) => {
    const res = await instance.get(`/message/${chatId}`)
    return res
}

type sendMessageParam = {
    content: string
    chatId: string | null
}

export const sendMessageAPI = async ({content, chatId}:sendMessageParam) => {
    const res = await instance.post<MessageShort>('/message', {content, chatId})
    return res
}

export const accessChatAPI = async (userId:string) => {
    const res = await instance.post('/chat', {userId})
    return res
}