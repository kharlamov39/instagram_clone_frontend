import { useState } from "react";
import styles from './Register.module.css'
import { Navigate } from "react-router-dom";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import { useTypedSelector } from "../../hooks/hooks";
import ModalError from "./ModalError/ModalError";
import Preloader from "../Preloader/Preloader";

type RegisterProp = {
    isAuth: boolean
}

const Register:React.FC<RegisterProp> = ({isAuth}) => {
    const [ isAccount, setIsAccount] = useState<boolean>(false)
    const { error, loading } = useTypedSelector(state => state.auth) 

    if(isAuth) {
        return <Navigate to='/' />
    }

    if(loading) {
        return <Preloader />
    }

    return (
        <div className={styles.register}>
            {
                !isAccount 
                ? <div className={styles.form}>
                    <Signup />
                    <div>
                        Have you account? <span onClick={ () => setIsAccount(true)}> Login </span> 
                    </div>
                </div>
                : <div className={styles.form}>
                    <Login />
                    <div>
                        No account? <span onClick={ () => setIsAccount(false)} > Create account </span> 
                    </div>
                </div>
            } 
            { error && <ModalError error={error}/> }   
        </div>
    )
}

export default Register