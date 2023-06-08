import { GetProfileRes } from '../../../types/resTypes'
import styles from './ProfileInfo.module.css'
import avatar from '../../../assets/avatar.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../Button/Button'
import { useTypedSelector } from '../../../hooks/hooks'
import { accessChatAPI } from '../../../api/dialog-api'

type ProfileInfoProp = {
    profile: GetProfileRes | null
}

const ProfileInfo:React.FC<ProfileInfoProp> = ({profile}) => {
    const userId = useTypedSelector(state => state.auth.currentUser?._id)
    const navigate = useNavigate()

    const accessChat = async () => {
        if(profile?._id && profile._id !== userId ) {
           await accessChatAPI(profile._id)
           navigate('/dialogs')
        }
        // navigate('/dialogs')
    }


    return (
        <div className={styles.profile}>
            <div className={styles.profileInfo}>
                <div className={styles.avatar}> 
                {
                    profile?.avatar 
                    ? <img src={`http://localhost:1111${profile?.avatar}`} alt="avatar" className={styles.img}/>
                    : <img src={avatar} alt="avatar" className={styles.img} /> 
                }
                </div> 
                <div>
                    <h2> {profile?.firstName} {profile?.lastName} </h2>
                    <h3>{profile?.email}</h3>
                </div>
            </div>
            <div> 
                <Button variant='blue' onClick={accessChat}>
                    Написать
                </Button>
            </div>
            <div>
                <Link to={`update`}> 
                    <Button variant='blue'>
                        Редактировать профиль 
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default ProfileInfo