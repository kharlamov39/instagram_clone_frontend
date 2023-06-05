import { CreatePostRes, PostsRes } from "../types/resTypes"
import { instance } from "./api"

export const getAllPostsAPI = async () => {
    const res = await instance.get<PostsRes[]>('/post')
    return res
}

export const getOnePostAPI = async (id: string) => {
    const res = await instance.get<PostsRes>(`/post/${id}`)
    return res
}


export type CreatePostI = {
    text: string
    image: string
}

export const createPostAPI = async (obj: CreatePostI) => {
    const res = await instance.post<CreatePostRes>('/post', obj)
    return res
}

export const deletePostAPI = async (id: string) => {
    const res = await instance.delete(`/post/${id}`)
    return res
}


export const editPostAPI = async (id:string | undefined, text: string) => {
    const res = await instance.patch(`/post/${id}`, {text})
    return res
}