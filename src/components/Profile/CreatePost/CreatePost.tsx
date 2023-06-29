import { useRef, useState } from 'react'
import { instance } from '../../../api/api'
import { createPostAPI } from '../../../api/post-api'
import deletePhoto from '../../../assets/deletePhoto.png'
import styles from './CreatePost.module.css'
import camera from '../../../assets/camera.png'     
import { useAppDispatch } from '../../../hooks/hooks'
import { fetchProfile } from '../../../redux/profileSlice'
import { useParams } from 'react-router-dom'
import Button from '../../Button/Button'
import check from '../../../assets/check.png'

const CreatePost = () => {
    const { id } = useParams()
    const [ image, setImage ] = useState<string>('')
    const [ text, setText ] = useState<string>('')
    const dispatch = useAppDispatch()
    const fileRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async (e:any) => {
        try {
            const formData = new FormData()
            formData.append('image', e.target.files[0])
            const { data } = await instance.post('/upload', formData)
            setImage(data.url)
        } catch(err) {
            alert('Не удалось загрузить фото')
        }
    }

    const addPost = async () => {
        await createPostAPI({text, image})
        dispatch( fetchProfile(id))
        setImage('')
        setText('')
    }

    return (
        <div className={styles.main} >
            <textarea className={styles.textarea} placeholder='Поделитесь моментом' value={text} onChange={ (e) => setText(e.target.value)} maxLength={100}/>
            
            { image.length > 0 && 
            <div className={styles.photo} >
                <img src={`http://localhost:1111${image}`} alt="photo" />
                <img src={deletePhoto} alt="" className={styles.deletePhoto} onClick={() => setImage('')} />
            </div>
            }
            <div className={styles.btns}>
                <img src={camera} alt="camera" onClick={ () => fileRef.current?.click() } />
                <input type="file" hidden ref={fileRef} onChange={handleFileChange}/>
                <div style={{display: (text || image) ? 'flex' : 'none'}}>
                    <div className={styles.addOne}>
                        <Button onClick={addPost} type='button' variant='blue' >
                            Опубликовать
                        </Button>
                    </div>
                    <div className={styles.addTwo}>
                        <img src={check} alt="check" onClick={addPost} />
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default CreatePost