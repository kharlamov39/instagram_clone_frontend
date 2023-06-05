import { useState } from "react";
import styles from './Register.module.css'
import { Navigate } from "react-router-dom";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";

type RegisterProp = {
    isAuth: boolean
}

const Register:React.FC<RegisterProp> = ({isAuth}) => {
    const [ isAccount, setIsAccount] = useState<boolean>(false)

    if(isAuth) {
        return <Navigate to='/' />
    }

    return (
        <div className={styles.register}>
            {
                !isAccount 
                ? <div className={styles.form}>
                    <Signup />
                    <div>
                        Есть аккаунт? <span onClick={ () => setIsAccount(true)}> Войти </span> 
                    </div>
                </div>
                : <div className={styles.form}>
                    <Login />
                    <div>
                        Нет акканта? <span onClick={ () => setIsAccount(false)} > Создать </span> 
                    </div>
                </div>
            }    
        </div>
    )
}

export default Register