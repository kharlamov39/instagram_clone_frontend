import { DialogsRes, MessageShort } from "../types/resTypes";
import { instance } from "./api";

export const fetchDialogsAPI = async () => {
    const res = await instance.get<DialogsRes[]>('/chat')
    return res
}

export const allMessagesAPI = async (chatId:string) => {
    const res = await instance.get<MessageShort[]>(`/message/${chatId}`)
    return res
}

type sendMessageParam = {
    content: string
    chatId: string | null | undefined
}

export const sendMessageAPI = async ({content, chatId}:sendMessageParam) => {
    const res = await instance.post<MessageShort>('/message', {content, chatId})
    return res
}

export const accessChatAPI = async (userId:string) => {
    const res = await instance.post('/chat', {userId})
    return res
}