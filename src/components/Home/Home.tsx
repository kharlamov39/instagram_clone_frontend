import { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../hooks/hooks'
import { fetchAllPosts } from '../../redux/postSlice'
import FullPost from '../FullPost/FullPost'
import { Routes, Route, useParams } from 'react-router-dom'
import { useGetPosts } from '../../hooks/useGetPosts'


const Home = () => {
    
    const allPosts = useGetPosts()

    return (
        <div>
            { allPosts.map( (el, i) => (
                <FullPost key={el._id} postData={el} modal='modalHome' />
            )) }
        </div>
    )
}

export default Home