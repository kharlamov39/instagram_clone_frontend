import { allMessagesAPI, sendMessageAPI } from '../../../../api/dialog-api'
import { useEffect, useState } from 'react'
import { MessageShort } from '../../../../types/resTypes'
import ChatBody from './ChatBody'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../../../hooks/hooks'
import { fetchAllChatMessages } from '../../../../redux/dialogsSlice'

const Chat:React.FC = () => {
    // const [ activeChatData, setChatData ] = useState<MessageShort[]>([])
    const activeChatData = useTypedSelector(state => state.dialog.activeChatData)
    const dispatch = useAppDispatch()
    const { currentDialog } = useParams()

    useEffect( () => {
        if(currentDialog) {
            dispatch(fetchAllChatMessages(currentDialog))
            // allMessagesAPI(currentDialog).then(res => setChatData(res.data) )
        }
    }, [currentDialog])

    console.log(true)

    return (
        <ChatBody 
            activeChatData={activeChatData} 
            // setChatData={setChatData}
            currentDialog={currentDialog}
        />
    )
}

export default Chat