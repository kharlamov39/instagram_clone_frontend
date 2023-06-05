import { Link } from "react-router-dom"
import styles from './Header.module.css'
import { RegisterRes } from "../../types/resTypes"
import burgerMenu from '../../assets/burgerMenu.png'
import closeBurger from '../../assets/closeBurger.png'
import { useState, useEffect } from 'react'
import Input from "../Input/Input"
import Search from "./Search/Search"

type HeaderProp = {
    isAuth: boolean
    currentUser: null | RegisterRes
}

const Header:React.FC<HeaderProp> = ({isAuth, currentUser}) => {

    const [ burger, setBurger ] = useState(false)

    useEffect( () => {
        if(burger) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'visible'
        }

        return () => {
            document.body.style.overflow = 'visible'
        }
    }, [burger])

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.nav}>
                    <div className={styles.head}>
                        <div className={styles.burger}>
                            <img src={burgerMenu} alt="burger" onClick={ () => setBurger(true)} />
                        </div>
                        <Link to='/' className={styles.logo}> LOGO </Link>
                    </div>
                    <div className={ !burger ? styles.menu : styles.menuBurger}>
                        { burger && 
                        <div className={styles.closeBurger}>
                            <img src={closeBurger} alt="close-burger" onClick={ () => setBurger(false)} />
                        </div> 
                        }
                        <Search />
                        <Link to='/' onClick={ () => setBurger(false)} > Home </Link>
                        <Link to='/dialogs' onClick={ () => setBurger(false)} > Dialogs </Link>
                        { isAuth 
                        ? <> <Link to={`profile/${currentUser?._id}`} onClick={ () => setBurger(false)}> Profile </Link>
                            <Link to='/logout' onClick={ () => setBurger(false)}> Logout </Link>
                        </>
                        : <Link to='/register' onClick={ () => setBurger(false)}> Register </Link>
                        }
                        
                    </div>  
                </div>
            </div>
        </header>
    )
}

export default Header