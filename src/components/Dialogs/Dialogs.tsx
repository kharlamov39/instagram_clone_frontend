import { allMessagesAPI, fetchDialogsAPI, sendMessageAPI } from '../../api/dialog-api'
import { useTypedSelector } from '../../hooks/hooks'
import { DialogsRes, Message } from '../../types/resTypes'
import Chat from './DialogItem/Chat/Chat'
import DialogItem from './DialogItem/DialogItem'
import styles from './Dialogs.module.css'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const ENDPOINT = 'http://localhost:1111'

const Dialogs = () => {

    const [ dialogs, setDialogs ]  = useState<[] | DialogsRes[]>([])
    const [ currentDialog, setCurrentDialog ] = useState<string | null>(null)
    const [ socketConnected, setSocketConnected ] = useState<boolean>(false)
    const currentUser  = useTypedSelector(state => state.auth.currentUser)

    useEffect( () => {
        
        fetchDialogsAPI().then(res => setDialogs(res.data))
        
    }, [])

    useEffect( () => {
        const socket = io(ENDPOINT)
        // socket.on('message', () )
        // socket.on('message', () => {})
    }, [])

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
                { dialogs.map( (el, i) => <DialogItem key={el._id} chatInfo={el} setCurrentDialog={setCurrentDialog}/> ) }
            </div>
            
            { currentDialog && <Chat currentDialog={currentDialog}/> }
        </div>
    )
}

export default Dialogs 