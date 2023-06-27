import { useEffect, useState } from 'react'
import ChatBody from './ChatBody'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../../../hooks/hooks'
import { fetchAllChatMessages } from '../../../../redux/dialogsSlice'

const Chat:React.FC = () => {
    const activeChatData = useTypedSelector(state => state.dialog.activeChatData)
    const dispatch = useAppDispatch()
    const { currentDialog } = useParams()

    useEffect( () => {
        if(currentDialog) {
            dispatch(fetchAllChatMessages(currentDialog))
        }
    }, [currentDialog])

    return (
        <ChatBody 
            activeChatData={activeChatData} 
            currentDialog={currentDialog}
        />
    )
}

export default Chat