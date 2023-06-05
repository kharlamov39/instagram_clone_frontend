import { PostCommentsRes } from '../types/resTypes';
import { instance } from './api';


export const getPostCommentsAPI = async (postId: string) => {
    const res = await instance.get<PostCommentsRes[]>(`/comment/${postId}`)
    return res
}   

export type CreateComment = {
    text:string,
    postId:string
}

export const createCommentAPI = async ({text, postId} :CreateComment) => {
    const res = await instance.post<PostCommentsRes>(`/comment/${postId}`, {text})
    return res
}   