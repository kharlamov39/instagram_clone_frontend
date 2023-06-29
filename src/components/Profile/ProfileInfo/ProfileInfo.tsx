import { GetProfileRes } from '../../../types/resTypes'
import styles from './ProfileInfo.module.css'
import avatar from '../../../assets/avatar.jpg'
import { Link } from 'react-router-dom'
import Button from '../../Button/Button'
import { useAppDispatch } from '../../../hooks/hooks'
import { fetchFollowers, fetchFollowing } from '../../../redux/profileSlice'
import FollowList from '../FollowList/FollowList'
import { useState } from 'react'

type Props = {
    profile: GetProfileRes | null
    isMyProfile?: true
}

const ProfileInfo:React.FC<Props> = ({profile, isMyProfile}) => {
    const dispatch = useAppDispatch()
    const [ followList, setFollowList ] = useState<'followers' | 'following' | 'none'>('none')

    const handleFetchFollowers = ():void => {
            setFollowList('followers')
    } 

    const handleFetchFollowing = ():void => {
            setFollowList('following')
    }


    return (
        <div className={styles.profile}>
            <div className={styles.profileInfo}>
                <div className={styles.avatar}  > 
                {
                    profile?.avatar 
                    ? <img src={`http://localhost:1111${profile?.avatar}`} alt="avatar" className={styles.img}/>
                    : <img src={avatar} alt="avatar" className={styles.img} /> 
                }
                </div> 
                <div className={styles.nameInfo}>
                    <h2> {profile?.firstName} {profile?.lastName} </h2>
                    <h3>{profile?.email}</h3>
                </div>
                <div className={styles.followInfo}>
                    <div style={{marginBottom: '5px'}}>
                        <button onClick={handleFetchFollowers}> Followers: {profile?.followers.length} </button>
                    </div>
                    <div>
                        <button onClick={handleFetchFollowing}> Following: {profile?.following.length} </button>
                    </div>
                    { followList !== 'none' && <FollowList setFollowList={setFollowList} followList={followList} userId={profile?._id}/> }
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