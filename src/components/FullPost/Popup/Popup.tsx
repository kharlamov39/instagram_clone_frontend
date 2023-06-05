import styles from './Popup.module.css'
import menu from '../../../assets/menu.png'
import { useState } from 'react'

type Props = {
    removePost: () => void
    setEditMode: any
}

const Popup:React.FC<Props> = ({removePost,  setEditMode}) => {
    const [ popup, setPopup ] = useState<boolean>(false)


    const handleEdit = () => {
        setEditMode(true)
        setPopup(false)
    }

    return (
        <>
        <img 
            className={styles.btnmenu} 
            src={menu} 
            alt='open-menu' 
            onClick={ () => setPopup(!popup)}
        /> 
        { popup && 
        <div className={styles.popup} >
            <div>
                <button className={styles.removeBtn} onClick={removePost}>Удалить</button>
            </div>
            <div>
                <button className={styles.editBtn} onClick={ handleEdit}>Редактировать</button>
            </div>
        </div>
        }
        </>
    )
}

export default Popup