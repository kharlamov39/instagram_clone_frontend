import { useState, useEffect, useCallback } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../hooks/hooks'
import { fetchCreateComment, fetchPostComments } from '../../../redux/commentSlice'
import CommentItem from './CommentItem/CommentItem'
import styles from './Comments.module.css'
import Button from '../../Button/Button'

type Props = {
    postId: string
}

const Comments:React.FC<Props> = ({postId}) => {
    const dispatch = useAppDispatch()
    const {comments} = useTypedSelector( state => state.comment)
    const [ isComments, setIsComments ] = useState<boolean>(false)
    const [ text, setText ] = useState<string>('')

    const addComment = async () => {
        await dispatch(fetchCreateComment( {text, postId} ))
        fetchComments()
        setText('')
    }

    const fetchComments = useCallback ( () => {
        dispatch(fetchPostComments(postId))
    }, [postId])

    useEffect( () => {
        fetchComments()
    }, [fetchComments])

    return (
        <div>
            <div style={{marginBottom: '10px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap'}}>
                <textarea placeholder='Ваш комментарий...' className={styles.input} value={text} onChange={(e) => setText(e.target.value)}/>
                <div>
                    <Button onClick={addComment} variant='blue'>
                        Добавить
                    </Button>
                </div>
                
            </div>
            <div style={{marginBottom: '10px'}}>
                {
                    isComments 
                    ? <button onClick={ () => setIsComments(false)} style={{color: 'gray'}} > Скрыть комментарии</button> 
                    : <button onClick={ () => setIsComments(true)} style={{color: 'gray'}} > Показать комментарии</button>
                }
            </div>
            { isComments && 
            <div className={styles.list}>
                { comments.map(( el, i) => <CommentItem key={el._id} user={el.user} text={el.text}/>  ) }
            </div> }
        </div>
        
    )
}

export default Comments