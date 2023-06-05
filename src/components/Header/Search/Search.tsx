import { instance } from '../../../api/api'
import { searchProfileAPI } from '../../../api/profile-api'
import styles from './Search.module.css'
import { useEffect, useState } from 'react'

const Search = () => {

    const [ search, setSearch ] = useState('')
    const [ data, setData ] = useState([])

    useEffect( () => {
        searchProfileAPI(search).then( res => console.log(res.data))
    }, [search])

    return (
        <div>
            <input type="text" value={search} onChange={ (e) => setSearch(e.target.value)} />
            <button>Search</button>
        </div>
    )
}

export default Search