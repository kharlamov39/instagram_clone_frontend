import { GetProfileRes } from '../../../types/resTypes'
import styles from './ProfileInfo.module.css'
import avatar from '../../../assets/avatar.jpg'
import { Link } from 'react-router-dom'
import Button from '../../Button/Button'

type Props = {
    profile: GetProfileRes | null
    isMyProfile?: true
}

const ProfileInfo:React.FC<Props> = ({profile, isMyProfile}) => {

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
                <div>
                    <div>
                        Followers: {profile?.followers.length}
                    </div>
                    <div>
                        Following: {profile?.following.length}
                    </div>
                    
                </div>
            </div>
            
            { isMyProfile && 
                <div className={styles.buttons}>
                    <Link to={`update`}> 
                        <Button variant='blue'> Редактировать профиль </Button>
                    </Link>
                </div>
            }
            
        </div>
    )
}

export default ProfileInfo