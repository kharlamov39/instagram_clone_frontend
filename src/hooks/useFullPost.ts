import { useEffect, useState } from "react"
import { PostsRes } from "../types/resTypes"
import { getOnePostAPI } from "../api/post-api"

export const useFullPost = (postId:string | undefined, postData:PostsRes | undefined) => {

    const [ data, setData ] = useState<undefined | PostsRes>(postData)

    useEffect( () => {
        if(postId) {
            // document.body.style.background = '#353434';
            // // document.body.style.overflow = 'hidden'
            getOnePostAPI(postId)
            .then( res => setData(res.data) )
        }
        return () => {
            // document.body.style.background = 'white'
            // document.body.style.overflow = 'visible'
        }
    }, [postId])

    return data
}