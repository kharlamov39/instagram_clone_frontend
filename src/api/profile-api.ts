import { GetProfileRes, UserRes } from "../types/resTypes";
import { instance } from "./api";

export const getProfileAPI = async (id: string | undefined) => {
    const res = await instance.get<GetProfileRes>(`profile/${id}`)
    return res
}

export type UpdateProfile = Omit<UserRes, 'email'>

export const updateProfileAPI = async ({_id, firstName, lastName, avatar}:UpdateProfile) => {
    const res = await instance.patch<GetProfileRes>(`profile/${_id}`, { firstName, lastName, avatar})
    return res
}

// export const deleteProfileAPI = async (_id: string | undefined) => {
//     const res = await instance.delete(`profile/${_id}`)
//     return res
// }
//@ts-ignore
export const searchProfileAPI = async (search:string) => {
    //@ts-ignore
    const res = await instance.post('/search', {search})
    return res
}