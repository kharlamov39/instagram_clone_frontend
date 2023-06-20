import { useAppDispatch, useTypedSelector } from '../../../hooks/hooks'
import { closeModalError } from '../../../redux/authSlice'
import Button from '../../Button/Button'
import styles from './ModalError.module.css'
import modalError from '../../../assets/modalError.png'

const ModalError = () => {
    const dispatch = useAppDispatch()
    const { error } = useTypedSelector(state => state.auth)

    const closeModal = () => {
        dispatch(closeModalError())
    }

    return (
        <div className={styles.body}>
            <div className={styles.modal}>
                <h2>{error} </h2>
                <img src={modalError} alt="modal-error" />
                <Button onClick={closeModal} variant='blue'> Close </Button>
            </div>
        </div>
    )
}

export default ModalError