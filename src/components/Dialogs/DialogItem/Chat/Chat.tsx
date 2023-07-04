import { useEffect, useState } from 'react'
import ChatBody from './ChatBody'
import io from 'socket.io-client';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../../../hooks/hooks'
import { fetchAllChatMessages } from '../../../../redux/dialogsSlice'
import Button from '../../../Button/Button'

const Chat:React.FC = () => {
    const activeChatData = useTypedSelector(state => state.dialog.activeChatData)
    const dispatch = useAppDispatch()
    const { currentDialog } = useParams()
    const navigate = useNavigate()

    var ENDPOINT = 'https://instagram-clone-backend-2.onrender.com'
    var socket = io(ENDPOINT)

    useEffect( () => {
        if(currentDialog) {
            dispatch(fetchAllChatMessages(currentDialog))
        }
    }, [currentDialog])

    return (
        <>
            <div style={{marginBottom: '20px'}}>
                <Link to='/dialogs' > dialogs </Link>
            </div>
            
            <ChatBody 
                activeChatData={activeChatData} 
                currentDialog={currentDialog}
            />
        </>
    )
}

export default Chat