import styles from './DialogItem.module.css'
import { DialogsRes, UserRes } from '../../../types/resTypes' 
import { useTypedSelector } from '../../../hooks/hooks'

type Props = {
    chatInfo: DialogsRes
    setCurrentDialog: any
}

const DialogItem:React.FC<Props> = ({chatInfo, setCurrentDialog}) => {

    const id = useTypedSelector(state => state.auth.currentUser?._id)
    const user = chatInfo.users.filter(el => el._id !== id)

    return (
        <div className={styles.item} onClick={() => setCurrentDialog(chatInfo._id)}>
            <h3>{user[0].lastName}</h3>
            
            {/* {chatInfo.latestMessage.sender.lastName} - {chatInfo.latestMessage.content} */}
        </div>
    )
}

export default DialogItem