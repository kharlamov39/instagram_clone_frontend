import { useEffect, useState } from "react"
import { PostsRes } from "../types/resTypes"
import { getOnePostAPI } from "../api/post-api"

export const useFullPost = (postId:string | undefined, postData:PostsRes | undefined) => {

    const [ data, setData ] = useState<undefined | PostsRes>(postData)

    useEffect( () => {
        if(postId) {
            getOnePostAPI(postId)
            .then( res => setData(res.data) )
        }
    }, [postId])

    return data
}