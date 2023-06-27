import styles from './DialogItem.module.css'
import { DialogsRes, UserRes } from '../../../types/resTypes' 
import { useTypedSelector } from '../../../hooks/hooks'
import { Link, useNavigate, useParams } from 'react-router-dom'
import User from '../../FullPost/User/User'


type Props = {
    chatInfo: DialogsRes
}


const DialogItem:React.FC<Props> = ({chatInfo}) => {

    const id = useTypedSelector(state => state.auth.currentUser?._id)
    const user = chatInfo.users.filter(el => el._id !== id)
    const navigate = useNavigate()

    const openDialog = () => {
        navigate( `${chatInfo._id}`)
    }

    return (
        <div onClick={openDialog}>
            <div className={styles.item}  >
                <User user={user[0]}/>
                { chatInfo.latestMessage.sender._id === id && <span className={styles.span}>You: </span> } 
                { chatInfo.latestMessage.content  }
            </div>
        </div>    
    )
}

export default DialogItem