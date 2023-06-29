import { searchProfileAPI } from "../../../api/profile-api";
import styles from "./Search.module.css";
import { useEffect, useState, useRef } from "react";
import loupe from "../../../assets/loupe.png";
import { useDebounce } from "../../../hooks/useDebounce";
import PopupSearch from "./PopupSearch/PopupSearch";
import { useLocation } from "react-router-dom";

const Search = () => {
    const {pathname} = useLocation()
    const [ search, setSearch ] = useState('')
    const [ data, setData ] = useState([])
    const [ popup, setPopup ] = useState<boolean>(false)
    const debounced = useDebounce(search)

    useEffect( () => {
        if(search.length > 2) {
            searchProfileAPI(search).then( res => {
                setData(res.data)
            } )
        }
    }, [debounced])

    useEffect ( () => {
        setSearch('')
        setData([])
    }, [pathname])
    

    return (
        <div className={styles.main} >
            <input 
                type="text" 
                className={styles.input} 
                value={search} 
                onChange={ (e:React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} 
                onClick={ () => setPopup(true)}  
            />
            {/* <img src={loupe} alt="loupe" className={styles.loupe}/> */}

            {popup && <PopupSearch  data={data} setPopup={setPopup} /> }
        </div>
    )
}

export default Search