import styles from './InputPassword.module.css'
import { Field } from "formik"
import { useState } from "react"; 
import hidePassword from '../../assets/hidePassword.png'
import showPassword from '../../assets/showPassword.png'

interface InputPasswordProps {
    placeholder: string
    name: string
    children?: React.ReactNode
    label: string
}

const InputPassword:React.FC<InputPasswordProps> = ({ placeholder, name, children, label}) => {

    const [ showPass, setShowPass ] = useState<'password' | 'text'>('password')

    return (
        <div className={styles.main}>
            <label htmlFor={name}> { label}</label>
            <div className={styles.inputWrap} >
               <Field 
                    type={showPass} 
                    name={name} 
                    placeholder={placeholder} 
                    id={name} 
                    className={styles.input} 
                />
                <div className={styles.img} >
                    { showPass === 'password' 
                        ?  <img src={showPassword} alt="showPassword" onClick={ () => setShowPass(prev => 'text') } /> 
                        : <img src={hidePassword} alt="hidePassword" onClick={ () => setShowPass(prev => 'password')} /> 
                    }
                </div>
            </div>
            <div className={styles.errors}>
                { children}
            </div>
        </div>
    )
}

export default InputPassword