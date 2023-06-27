import { useTypedSelector } from '../../../../../hooks/hooks'
import { UserRes } from '../../../../../types/resTypes'
import User from '../../../../FullPost/User/User'
import styles from './Message.module.css'

type Props = {
    user: UserRes
    content: string
}

const Message:React.FC<Props> = ({user, content}) => {

    const currentUser = useTypedSelector(state => state.auth.currentUser)

    return (
        <div className={styles.main}>
            <User user={user} />
            {content}
        </div>
    )
}

export default Message