import styles from './FullPost.module.css'
import { useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../hooks/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { useFullPost } from '../../hooks/useFullPost'
import { deletePostAPI } from '../../api/post-api'
import { fetchProfile } from '../../redux/profileSlice'
import { PostsRes } from '../../types/resTypes'
import Popup from './Popup/Popup'
import FullPostImage from './FullPostImage/FullPostImage'
import User from './User/User'
import FullPostText from './FullPostText/FullPostText'
import BtnClose from '../BtnClose/BtnClose'
import Comments from './Comments/Comments'

type Props = {
    postData?: PostsRes
    modal: 'modal' | 'modalHome'
    btnClose?: boolean
}

const FullPost:React.FC<Props> = ({postData, modal, btnClose}) => {
    const { id, postId } = useParams()
    const navigate = useNavigate()
    const [ editMode, setEditMode ] = useState<boolean>(false)
    const authId = useTypedSelector( state => state.auth.currentUser?._id )
    const dispatch = useAppDispatch()

    const removePost = async () => {
        if(postId) {
            await deletePostAPI(postId)
            await dispatch(fetchProfile(id))
            navigate('..')
        }    
    }
 
    const data = useFullPost(postId, postData)

    if( !data) {
        return (
            <div className={styles[modal]}> Loading </div>
        )
    }
    
    return (
            <div className={styles[modal]} >
                <div className={styles.content}>
                    <FullPostImage data={data}/>
                    <div className={styles.postInfo}>
                        <User user={data.user}/>
                        <FullPostText text={data.text} editMode={editMode} setEditMode={setEditMode} postId={data._id}/>
                        <Comments postId={data._id}/>
                        { authId === data.user._id && modal === 'modal' && <Popup removePost={removePost} setEditMode={setEditMode}/> }  
                    </div>
                    { btnClose &&  <BtnClose /> }
                </div>
            </div>
        )
}

export default FullPost