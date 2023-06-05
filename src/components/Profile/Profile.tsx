import { useTypedSelector } from '../../hooks/hooks'
import styles from './Profile.module.css'
import CreatePost from './CreatePost/CreatePost'
import ProfilePosts from './ProfilePosts/ProfilePosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import { useProfile } from '../../hooks/useProfile'

const Profile = () => {
    const currentUser = useTypedSelector( state => state.auth.currentUser )

    const profile = useProfile()

    return (
        <div>
            { profile &&  
            <>
                <ProfileInfo profile={profile}/>
                {profile._id === currentUser?._id && <CreatePost /> } 
                <ProfilePosts posts={profile.posts}/>
            </>
             }
        </div>
    )
}

export default Profile