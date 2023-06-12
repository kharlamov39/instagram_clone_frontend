import { useEffect, useState } from "react"
import { PostsRes } from "../types/resTypes"
import { useAppDispatch, useTypedSelector } from "./hooks"
import { fetchAllPosts, clearPosts } from "../redux/postSlice"


export const useGetPosts = (page:number):PostsRes[] => {
    const allPosts = useTypedSelector( state => state.post.allPosts)
    const dispatch = useAppDispatch()

    useEffect( () => {
        dispatch( fetchAllPosts(page))
    }, [page])

    return allPosts
}