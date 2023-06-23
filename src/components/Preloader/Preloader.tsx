import preloader from '../../assets/preloader.gif'
import styles from './Preloader.module.css'

const Preloader = () => {
    return (
        <div className={styles.main}>
            <img src={preloader} alt="preloader" />
        </div>
        
    )
}

export default Preloader