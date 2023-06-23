import { followAPI, unfollowAPI } from '../../../api/following-api';
import { useAppDispatch } from '../../../hooks/hooks';
import { followProfile, unfollowProfile } from '../../../redux/profileSlice';
import Button from '../../Button/Button';
import styles from './FollowButtons.module.css';

type Props = {
    userId: string
    currentId:string | undefined
    isFollow: boolean
}

const FollowButtons:React.FC<Props> = ({userId, currentId, isFollow}) => {

    const dispatch = useAppDispatch()

    const follow = async () => {
        dispatch(followProfile({userId, currentId}))
    }

    const unfollow = async () => {
        dispatch(unfollowProfile({userId, currentId}))
    }

    return (
        <div>
            {   isFollow
                ? <Button variant='red' onClick={unfollow}> Отписаться </Button>
                : <Button variant='green' onClick={follow}> Подписаться </Button> 
            }
        </div>
    )
}

export default FollowButtons