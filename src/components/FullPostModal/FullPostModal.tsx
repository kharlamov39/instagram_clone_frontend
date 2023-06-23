import FullPost from "../FullPost/FullPost"
import styles from './FullPostModal.module.css'

type Props = {
    modal: 'modal' | 'modalHome'
    btnClose?: boolean
}

const FullPostModal:React.FC<Props> = ({modal, btnClose}) => {
    return (
        <div className={styles.main}>
            <FullPost modal={modal} btnClose={btnClose}/>
        </div>
    )
}

export default FullPostModal