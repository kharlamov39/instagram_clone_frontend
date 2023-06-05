import { useState } from 'react'
import { editPostAPI } from '../../../api/post-api'

type Props = {
    text: string
    editMode: boolean
    setEditMode: any
    postId: string
}

const FullPostText:React.FC<Props> = ({text, editMode, setEditMode, postId}) => {

    const [ postText, setPostText ] = useState(text)

    const handleEditPost = async () => {
        await editPostAPI(postId, postText)
        setEditMode(false)
    }

    return (
        <div style={{marginBottom: '20px'}}> 
            { 
                editMode 
                ? <>
                    <input type="text" value={postText} onChange={ (e) => setPostText(e.target.value)} />
                    <button style={{color: 'blue'}} onClick={handleEditPost}> Сохранить</button>
                </> 
                : postText
            } 
        </div> 
    )
}

export default FullPostText