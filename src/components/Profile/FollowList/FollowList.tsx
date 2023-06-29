import { useAppDispatch, useTypedSelector } from '../../../hooks/hooks'
import { fetchFollowers, fetchFollowing } from '../../../redux/profileSlice'
import BtnClose from '../../BtnClose/BtnClose'
import Button from '../../Button/Button'
import User from '../../FullPost/User/User'
import styles from './FollowList.module.css'
import { useEffect } from 'react'

type FollowList = 'followers' | 'following' | 'none'

type Props = {
    followList: FollowList
    setFollowList: (arg: FollowList ) => void
    userId: string | undefined
}

const FollowList:React.FC<Props> = ({setFollowList, followList, userId}) => {
    const dispatch = useAppDispatch()
    const followers = useTypedSelector( state => state.profile.followers)
    const following = useTypedSelector( state => state.profile.following)

    const handleCloseList = ():void => setFollowList('none')
    const showFollowers = () => setFollowList('followers');
    const showFollowing = () => setFollowList('following')

    useEffect( () => {
        if(followList === 'followers' && userId) {
            dispatch(fetchFollowers(userId))
        } else if (followList === 'following' && userId) {
            dispatch(fetchFollowing(userId))
        }
    }, [followList])

    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.togglers}>
                    <button 
                        className={styles.btnToggler} 
                        onClick={showFollowers} 
                        style={{border: followList === 'followers' ? '1px solid rgba(139, 139, 139, 0.384)' : 'none'}}
                    >   Followers 
                    </button>
                    <button 
                        className={styles.btnToggler} 
                        onClick={showFollowing} 
                        style={{ border: followList === 'following' ? '1px solid rgba(139, 139, 139, 0.384)' : 'none'}} 
                    > 
                        Following 
                    </button>
                </div>
                
                <div className={styles.list}>
                    { followList === 'followers' && 
                        <div> 
                            {followers.map( (el,i) => <div className={styles.userWrap}> <User key={i} user={el}/> </div> )} 
                        </div>
                    }
                    { followList === 'following' && 
                        <div> 
                            {following.map( (el,i) => <div className={styles.userWrap}> <User key={i} user={el}/> </div>  )}   
                        </div>
                    }
                </div>
                <div className={styles.closeButton}>
                    <Button variant='black' onClick={handleCloseList}> Закрыть</Button>
                </div>
                
            </div>
        </div>
    )
}

export default FollowList

