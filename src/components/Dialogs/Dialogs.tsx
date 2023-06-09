import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import Chat from './DialogItem/Chat/Chat'
import DialogItem from './DialogItem/DialogItem'
import styles from './Dialogs.module.css'
import { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../hooks/hooks'
// import { MessageShort } from '../../types/resTypes' 
import { fetchDialogs } from '../../redux/dialogsSlice'
// import io from 'socket.io-client';

// const ENDPOINT = 'https://instagram-clone-backend-2.onrender.com'


const Dialogs = () => {
    const dispatch = useAppDispatch()
    const dialogs = useTypedSelector(state => state.dialog.dialogs)

    useEffect( () => {
        dispatch(fetchDialogs());
    }, [])

    // useEffect( () => {
    //     const socket = io(ENDPOINT)
    //     socket.on('res', (data :MessageShort) => dispatch(fetchDialogs()) )
    // }, [])

    if(!window.localStorage.getItem('token')) {
        return <Navigate to='/register'/>
    }

    return (
        <div className={styles.container}>
            <div>
                { dialogs.map( (el, i) => <DialogItem key={el._id} chatInfo={el} /> ) }
            </div>

            {/* <Routes>
                <Route path='/:currentDialog' element={ <Chat  />} />
            </Routes> */}
            
        </div>
    )
}

export default Dialogs 