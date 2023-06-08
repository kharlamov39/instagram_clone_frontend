import { allMessagesAPI, sendMessageAPI } from '../../../../api/dialog-api'
import styles from './Chat.module.css'
import { useEffect, useState } from 'react'
import { MessageShort } from '../../../../types/resTypes'


type Props = {
    currentDialog: string
}

const Chat:React.FC<Props> = ({currentDialog}) => {
    const [chatData, setChatData] = useState<MessageShort[]>([])
    const [ content, setContent ] = useState<string>('')

    const sendMessage = async () => {
        const res = await sendMessageAPI({content, chatId : currentDialog})
        setChatData([...chatData, res.data])
        setContent('')
    }

    useEffect( () => {
        if(currentDialog) {
            allMessagesAPI(currentDialog).then(res => setChatData(res.data) )
        }
    }, [currentDialog])

    return (
        <div>
            {chatData.map((el,i) => <div key={el._id}>{el.sender.lastName} {el.content}</div> )}
            <textarea style={{border: '1px solid black'}} value={content} onChange={ (e) => setContent(e.target.value)} />
            <button onClick={ sendMessage}> SEND </button>
        </div>
    )
}

export default Chat