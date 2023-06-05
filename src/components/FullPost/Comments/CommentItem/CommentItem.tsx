import { UserRes } from '../../../../types/resTypes'
import User from '../../User/User'
import styles from './CommentItem.module.css'

type Props = {
    user: UserRes
    text: string
}

const CommentItem:React.FC<Props> = ({user, text}) => {
    
    return (
        <div className={styles.item}>
            <User user={user}/>
            <div> {text} </div>
        </div>
    )
}

export default CommentItem