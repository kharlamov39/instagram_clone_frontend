import { AuthMeRes, RegisterRes } from "../types/resTypes";
import { instance } from "./api";

export type RegisterType = {
    firstName: string
    lastName: string
    email: string
    password: string
}

export type LoginType = {
    email: string
    password: string
}

export const registerAPI = async ({firstName, lastName, email, password}:RegisterType) => {
    const res = await instance.post<RegisterRes>('/auth/register', {firstName, lastName, email, password})
    return res
}

export const loginAPI = async ({email, password}:LoginType) => {
    const res = await instance.post<RegisterRes>('/auth/login', {email, password})
    return res
}

export const authMeAPI = async () => {
    const res = await instance.get<AuthMeRes>('/auth/me')
    return res
}

export const deleteProfileAPI = async (_id: string | undefined) => {
    const res = await instance.delete(`profiles/${_id}`)
    return res
}