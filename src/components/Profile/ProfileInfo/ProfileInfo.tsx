import { GetProfileRes } from '../../../types/resTypes'
import styles from './ProfileInfo.module.css'
import avatar from '../../../assets/avatar.jpg'
import { Link } from 'react-router-dom'
import Button from '../../Button/Button'

type ProfileInfoProp = {
    profile: GetProfileRes | null
}

const ProfileInfo:React.FC<ProfileInfoProp> = ({profile}) => {
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