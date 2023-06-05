import { Field } from "formik"
import styles from './Input.module.css'

interface InputProps {
    type: string
    placeholder: string
    name: string
    children?: React.ReactNode
    label: string
}

const Input:React.FC<InputProps> = ({type, placeholder, name, children, label}) => {

    return (
        <div className={styles.main}>
            <label htmlFor={name} > { label}</label>
            <Field type={type} name={name} placeholder={placeholder} id={name} className={styles.input} />
            { children}
        </div>
    )
}

export default Input