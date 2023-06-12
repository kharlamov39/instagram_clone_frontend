import { sendMessageAPI } from '../../../../api/dialog-api'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

type Props = {
    currentDialog: string
    chatData: any
    setChatData: any
}

var socket = io('http://localhost:1111')

const ChatBody:React.FC<Props> = ({chatData, currentDialog, setChatData}) => {

    const [ content, setContent ] = useState<string>('')

    const sendMessage = async () => {
        const res = await sendMessageAPI({content, chatId : currentDialog})
        socket.emit('message', res.data)
        setContent('')
    }

    useEffect( () => {
        socket.on('response', (data) => setChatData([...chatData, data]))
    })

    return (
        <div>
            {chatData.map((el:any,i:any) => <div key={el._id}>{el.sender.lastName} {el.content}</div> )}
            <textarea style={{border: '1px solid black'}} value={content} onChange={ (e) => setContent(e.target.value)} />
            <button onClick={ sendMessage}> SEND </button>
        </div>
    )
}

export default ChatBody