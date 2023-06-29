import { useNavigate } from "react-router-dom";
import styles from "./BtnClose.module.css";
import deletePhoto from "../../assets/deletePhoto.png";

const BtnClose = () => {
    const navigate = useNavigate()

    return (
        <div>
            <img 
                className={styles.btnclose} 
                src={deletePhoto} 
                alt='close_post' 
                onClick={() => navigate(-1)} 
            /> 
        </div>
    )
}

export default BtnClose

