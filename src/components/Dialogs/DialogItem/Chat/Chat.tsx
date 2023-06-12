import { allMessagesAPI, sendMessageAPI } from '../../../../api/dialog-api'
import styles from './Chat.module.css'
import { useEffect, useState } from 'react'
import { MessageShort } from '../../../../types/resTypes'
import ChatBody from './CharBody'

type Props = {
    currentDialog: string
}

const Chat :React.FC<Props> = ({currentDialog}) => {
    const [ chatData, setChatData ] = useState<MessageShort[]>([])

    useEffect( () => {
        if(currentDialog) {
            allMessagesAPI(currentDialog).then(res => setChatData(res.data) )
        }
    }, [currentDialog])

    return (
        <ChatBody 
            chatData={chatData} 
            currentDialog={currentDialog} 
            setChatData={setChatData}
        />
    )
}

export default Chat