import { instance } from "./api"

export const followAPI = async (userId:string | undefined) => {
    const res = await instance.post(`/follow/${userId}`)
    return res
}

export const unfollowAPI = async (userId:string | undefined) => {
    const res = await instance.delete(`/follow/${userId}`)
    return res
}

export const getFollowersAPI = async (userId: string | undefined) => {
    const res = await instance.get(`/follow/${userId}/followers`)
    return res
}

export const getFollowingAPI = async (userId: string | undefined) => {
    const res = await instance.get(`/follow/${userId}/following`)
    return res
}