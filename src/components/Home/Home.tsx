import { useState } from "react";
import FullPost from "../FullPost/FullPost";
import { useGetPosts } from "../../hooks/useGetPosts";
import styles from "./Home.module.css";
import {  useTypedSelector } from "../../hooks/hooks";
import Preloader from "../Preloader/Preloader";

const Home:React.FC = () => {
    const [ page, setPage ] = useState<number>(1)
    const allPosts = useGetPosts(page)
    const { totalPage } = useTypedSelector(state => state.post)
    const { loading } = useTypedSelector(state => state.post )

    const incrementPage = () => setPage(prev => prev + 1)

    if(!allPosts.length) {
        return <Preloader />
    }

    return (
        <div>
            { allPosts.map( (el, i) => (
                <FullPost key={el._id} postData={el} modal='modalHome' />
            )) }

            { totalPage > page && 
            <button className={styles.button} onClick={incrementPage}>ДАЛЕЕ</button>
            }

            {loading && <Preloader /> }
        </div>
    )
}

export default Home