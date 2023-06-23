import { useAppDispatch, useTypedSelector } from '../../hooks/hooks'
import styles from './Profile.module.css'
import CreatePost from './CreatePost/CreatePost'
import ProfilePosts from './ProfilePosts/ProfilePosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import FollowButtons from './FollowButtons/FollowButtons'
import { useEffect } from 'react'
import { fetchProfile } from '../../redux/profileSlice'
import { useParams } from 'react-router-dom'
import Preloader from '../Preloader/Preloader'
import AccessChat from './AccessChat/AccessChat'

const Profile = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()

    const currentUser = useTypedSelector( state => state.auth.currentUser )
    const profile = useTypedSelector(state => state.profile.profile)

    const isFollow = typeof profile?._id === 'string' && profile?.followers.some( el => el === currentUser?._id)
    const isMyProfile:boolean | null = currentUser && profile?._id === currentUser?._id


    useEffect( () => {
        dispatch(fetchProfile(id))
    }, [id])

    if(!profile || !id) {
        return <Preloader />
    }
    
    return (
        <div>
             { isMyProfile && 
             <>
                <ProfileInfo profile={profile} isMyProfile />
                <CreatePost />
                <ProfilePosts posts={profile.posts}/>
            </>
             }

            { isMyProfile === false && 
             <>
                <ProfileInfo profile={profile}/>
                <div className={styles.buttons}>
                    <FollowButtons userId={profile._id} currentId={currentUser?._id} isFollow={isFollow}/>
                    <AccessChat profileId={id}/>
                </div>
                <ProfilePosts posts={profile.posts}/>
            </>
             }

            { isMyProfile === null && 
             <>
                <ProfileInfo profile={profile}/>
                <ProfilePosts posts={profile.posts}/>
            </>
            }
        </div>
    )
}

export default Profile