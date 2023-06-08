import { allMessagesAPI, fetchDialogsAPI, sendMessageAPI } from '../../api/dialog-api'
import { DialogsRes, Message } from '../../types/resTypes'
import Chat from './DialogItem/Chat/Chat'
import DialogItem from './DialogItem/DialogItem'
import styles from './Dialogs.module.css'
import { useEffect, useState } from 'react'

const Dialogs = () => {

    const [ dialogs, setDialogs ]  = useState<[] | DialogsRes[]>([])
    const [ currentDialog, setCurrentDialog ] = useState<string | null>(null)

    useEffect( () => {
        fetchDialogsAPI().then(res => setDialogs(res.data))
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