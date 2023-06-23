import { searchProfileAPI } from '../../../api/profile-api'
import styles from './Search.module.css'
import { useEffect, useState } from 'react'
import loupe from '../../../assets/loupe.png'

const Search = () => {

    const [ search, setSearch ] = useState('')
    const [ data, setData ] = useState([])

    useEffect( () => {
        searchProfileAPI(search).then( res => console.log(res.data))
    }, [search])

    return (
        <div className={styles.main}>
            <input type="text" className={styles.input} value={search} onChange={ (e) => setSearch(e.target.value)} />
            {/* <button>Search</button> */}
            <img src={loupe} alt="loupe" className={styles.loupe}/>
        </div>
    )
}

export default Search