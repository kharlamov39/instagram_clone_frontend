import { instance } from "./api"

export const followAPI = async (userId:string | undefined) => {
    const res = await instance.post(`/follow/${userId}`)
    return res
}

export const unfollowAPI = async (userId:string | undefined) => {
    const res = await instance.delete(`/follow/${userId}`)
    return res
}
