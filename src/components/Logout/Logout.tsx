import { useAppDispatch } from "../../hooks/hooks"
import { useEffect } from 'react'
import { logout } from "../../redux/authSlice"

const Logout = () => {

    const dispatch = useAppDispatch()

    useEffect( () => {
        dispatch(logout())
    }, [])

    return (
        <div>
            Вы вышли из системы
        </div>
    )
}

export default Logout