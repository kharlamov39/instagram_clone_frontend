import { useState } from 'react'
import { editPostAPI } from '../../../api/post-api'
import styles from './FullPostText.module.css'

type Props = {
    text: string
    editMode: boolean
    setEditMode: (editMode:boolean) => void
    postId: string
}

const FullPostText:React.FC<Props> = ({text, editMode, setEditMode, postId}) => {

    const [ postText, setPostText ] = useState(text)

    const saveChanging = () => {
        editPostAPI(postId, postText)
        .then( (res) => setEditMode(false))
        .catch((err) => alert(err) ) 
    }

    return (
        <div className={styles.container} > 
            { 
                editMode 
                ? <>
                    <input 
                        type="text" 
                        value={postText} 
                        onChange={ (e:React.ChangeEvent<HTMLInputElement>) => setPostText(e.target.value)} 
                        className={styles.input}
                        maxLength={100}
                    />
                    <button className={styles.button} onClick={saveChanging}> Save </button>
                </> 
                : postText
            } 
        </div> 
    )
}

export default FullPostText