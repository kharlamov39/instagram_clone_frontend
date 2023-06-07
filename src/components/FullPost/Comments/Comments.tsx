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

    const addComment = async () => {
        await createCommentAPI({postId, text})
        setText('')
        getComments()
    }

    const getComments = () => {
        getPostCommentsAPI(postId).then((res) => setData(res.data))
    }

    useEffect( () => {
        if(isComments) {
            getComments()
        }
    }, [isComments, postId])

    console.log(data)

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
                { data.map(( el, i) => <CommentItem key={el._id} user={el.user} text={el.text}/>  ) }
            </div> }
        </div>
        
    )
}

export default Comments