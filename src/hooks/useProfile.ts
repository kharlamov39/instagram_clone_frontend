import { useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "./hooks"
import { fetchProfile } from "../redux/profileSlice"
import { useParams } from "react-router-dom"

export const useProfile = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const profile = useTypedSelector( state => state.profile.profile)

    useEffect( () => {
        if(id) {
            dispatch(fetchProfile(id))
        }
    }, [id])

    return profile
}