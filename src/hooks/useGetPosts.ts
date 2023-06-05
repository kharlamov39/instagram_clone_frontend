import { useEffect, useState } from "react"
import { PostsRes } from "../types/resTypes"
import { getOnePostAPI } from "../api/post-api"
import { useAppDispatch, useTypedSelector } from "./hooks"
import { fetchAllPosts } from "../redux/postSlice"


export const useGetPosts = ():PostsRes[] => {
    const allPosts = useTypedSelector( state => state.post.allPosts)
    const dispatch = useAppDispatch()

    useEffect( () => {
        dispatch( fetchAllPosts())
    }, [])

    return allPosts
}