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
                <Link to={`/profile/${user._id}`} className={styles.link} >
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        { user.avatar?.length 
                        ? <img src={`${process.env.REACT_APP_API_URL}${user.avatar}`} className={styles.img} alt="photo" /> 
                        : <img src={avatar} alt="avatar" className={styles.img}/>}
                        {user.firstName } {user.lastName}  
                    </div>
                </Link> 
            </div>
        </div>
    )
}

export default User