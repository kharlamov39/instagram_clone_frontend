import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { RegisterRes } from "../../types/resTypes";
import burgerMenu from "../../assets/burgerMenu.png";
import closeBurger from "../../assets/closeBurger.png";
import { useState, useEffect } from "react";
import Search from "./Search/Search";

type HeaderProp = {
    isAuth: boolean
    currentUser: null | RegisterRes
}

const Header:React.FC<HeaderProp> = ({isAuth, currentUser}) => {

    const [ burger, setBurger ] = useState<boolean>(false)

    const openBurgerMenu = ():void => setBurger(true)
    const closeBurgerMenu = ():void => setBurger(false)

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
                <div className={styles.navigation}>
                    <div className={styles.head}>
                        <div className={styles.burger}>
                            <img src={burgerMenu} alt="burger" onClick={openBurgerMenu} />
                        </div>
                        <Link to='/' className={styles.logo}> LOGO </Link>
                    </div>

                    <Search />
                    <div className={ !burger ? styles.menu : styles.menuBurger}>
                        { burger && 
                            <div className={styles.closeBurger}>
                                <img src={closeBurger} alt="close-burger" onClick={closeBurgerMenu} />
                            </div> 
                        }
                        <Link to='/' onClick={closeBurgerMenu} > Home </Link>
                        <Link to='/dialogs' onClick={closeBurgerMenu} > Dialogs </Link>
                        { isAuth 
                        ?   <> 
                                <Link to={`profile/${currentUser?._id}`} onClick={closeBurgerMenu}> Profile </Link>
                                <Link to='/logout' onClick={closeBurgerMenu}> Logout </Link>
                            </>
                        :   <Link to='/register' onClick={closeBurgerMenu}> Register </Link>
                        }
                    </div>  
                </div>
            </div>
        </header>
    )
}

export default Header