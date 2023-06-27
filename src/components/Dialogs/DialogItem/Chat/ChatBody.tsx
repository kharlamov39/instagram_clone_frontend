import { sendMessageAPI } from '../../../../api/dialog-api';
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { MessageShort } from '../../../../types/resTypes';
import Message from './Message/Message';
import Button from '../../../Button/Button';
import styles from './ChatBody.module.css'
import { useAppDispatch } from '../../../../hooks/hooks';
import { addMessage } from '../../../../redux/dialogsSlice';

type Props = {
    activeChatData: MessageShort[]
    currentDialog: string | undefined
}

var socket = io('http://localhost:1111')

const ChatBody:React.FC<Props> = ({activeChatData, currentDialog}) => {
    const dispatch = useAppDispatch()
    const [ content, setContent ] = useState<string>('')
    const messageWrapRef = useRef<HTMLDivElement>(null)

    const sendMessage = async () => {
        const res = await sendMessageAPI({content, chatId : currentDialog})
        socket.emit('message', res.data)
        setContent('')
    }

    useEffect( () => {
        socket.on('response', (data) => dispatch(addMessage(data)) )
    }, [])

    useEffect ( () => {
        if(messageWrapRef.current) {
            messageWrapRef.current.scrollTop = messageWrapRef.current?.scrollHeight // скролл чата всегда книзу, в том числе при добавлении сообщений
        }   
    }, [activeChatData])

    return (
 
            <div className={styles.chatBody}>
                <div className={styles.messagesWrap} ref={messageWrapRef}>
                    <div className={styles.messages}>
                        {activeChatData.map((el,i) => <Message key={el._id} user={el.sender} content={el.content}/> )}
                    </div>
                </div>
                
                <div className={styles.addMessage} >
                    <textarea 
                        className={styles.textarea} 
                        value={content} 
                        onChange={ (e:React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                        placeholder='write message'
                    />
                    <Button onClick={ sendMessage} variant='green'>  SEND </Button>
                </div>
            </div>
    )
}

export default ChatBody