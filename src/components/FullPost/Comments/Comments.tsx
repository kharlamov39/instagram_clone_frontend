import { useState, useEffect } from 'react'
import CommentItem from './CommentItem/CommentItem'
import styles from './Comments.module.css'
import Button from '../../Button/Button'
import { getPostCommentsAPI } from '../../../api/comment-api'
import { PostCommentsRes } from '../../../types/resTypes'
import { createCommentAPI } from '../../../api/comment-api'

type Props = {
    postId: string
}

const Comments:React.FC<Props> = ({postId}) => {
    const [ isComments, setIsComments ] = useState<boolean>(false)
    const [ text, setText ] = useState<string>('')
    const [ data, setData ] = useState<[] | PostCommentsRes[]>([])

    const showComments = ():void => setIsComments(true)
    const hideComments = ():void => setIsComments(false)
    
    const fetchComments = () => { // получение комментариев поста
        getPostCommentsAPI(postId)
        .then((res) => setData(res.data))
        .catch((err) => {
            alert(err)
            setIsComments(false)
        })
    }

    const addComment =  () => { // добавление комментария
        createCommentAPI({postId, text})
        .then( (res) => {
            setText('')
            fetchComments()
        } )
        .catch((err) => {
            alert(err)
        } )
    }

    useEffect( () => {
        if(isComments) {
            fetchComments()
        }
    }, [isComments, postId])

    return (
        <div>
            <div className={styles.inputWrap}>
                { window.localStorage.getItem('token') && 
                    <textarea 
                        placeholder='Ваш комментарий...' 
                        className={styles.input} 
                        value={text} 
                        onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                    /> 
                }
                { text.length > 0 && 
                    <div>
                        <Button onClick={addComment} variant='blue'> Добавить </Button>
                    </div>
                }
            </div>
            <div className={styles.buttonsWrap}>
                {
                    isComments 
                    ? <button onClick={ hideComments } className={styles.button} > Скрыть комментарии</button> 
                    : <button onClick={ showComments } className={styles.button} > Показать комментарии</button>
                }
            </div>
            { isComments && 
            <div className={styles.list}>
                { data.map(( el, i) => <CommentItem key={el._id} user={el.user} text={el.text}/>  ) }
            </div> }
        </div>
        
    )
}

export default Comments