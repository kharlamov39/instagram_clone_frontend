import styles from './User.module.css'
import avatar from '../../../assets/avatar.jpg'
import { UserRes } from '../../../types/resTypes'
import { Link } from 'react-router-dom'

type Props = {
    user: UserRes
}

const User:React.FC<Props> = ({user}) => {


    return (
        <div className={styles.postInfo}>
            <div className={styles.profileInfo}>
                <Link to={`/profile/${user._id}`}>
                    { user.avatar?.length 
                    ? <img src={`http://localhost:1111${user.avatar}`} className={styles.img} alt="photo" /> 
                    : <img src={``} alt="avatar" className={styles.img}/>}
                </Link> 
                <div> {user.firstName } {user.lastName} </div> 
            </div>
        </div>
    )
}

export default User