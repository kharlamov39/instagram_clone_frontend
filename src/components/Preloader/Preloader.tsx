import styles from './Preloader.module.css'

const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <div className={styles.row}>
                <div className={styles.item}></div>
                <div className={styles.item}></div>
            </div>
        </div>
    )
}

export default Preloader