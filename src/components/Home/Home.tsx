import { useState, useEffect } from 'react'
import FullPost from '../FullPost/FullPost'
import { useGetPosts } from '../../hooks/useGetPosts'
import styles from './Home.module.css'
import { useAppDispatch, useTypedSelector } from '../../hooks/hooks'
import { clearPosts } from '../../redux/postSlice'

const Home:React.FC = () => {
    const [ page, setPage ] = useState<number>(1)
    const allPosts = useGetPosts(page)
    const {totalPage} = useTypedSelector(state => state.post)
    const dispatch = useAppDispatch()

    useEffect( () => {
        return () => {
            dispatch(clearPosts())
        }
    }, [])

    return (
        <div>
            { allPosts.map( (el, i) => (
                <FullPost key={el._id} postData={el} modal='modalHome' />
            )) }

            { totalPage > page && 
            <button className={styles.button} onClick={ () => setPage(prev => prev + 1)}>ДАЛЕЕ</button>
            }
        </div>
    )
}

export default Home