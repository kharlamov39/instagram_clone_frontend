import { useState } from "react";
import FullPost from "../FullPost/FullPost";
import { useGetPosts } from "../../hooks/useGetPosts";
import styles from "./Home.module.css";
import {  useTypedSelector } from "../../hooks/hooks";
import Preloader from "../Preloader/Preloader";

const Home:React.FC = () => {
    const [ page, setPage ] = useState<number>(1)
    const allPosts = useGetPosts(page)
    const { totalPages } = useTypedSelector(state => state.post)
    const { loading, error } = useTypedSelector(state => state.post )

    const incrementPage = () => setPage(prev => prev + 1)

    return (
        <div>
            { error && <h2> {error} </h2> }
            { allPosts.map( (el, i) => (
                <FullPost key={el._id} postData={el} modal='modalHome' />
            )) }

            { totalPages > page && 
            <button className={styles.button} onClick={incrementPage}>ДАЛЕЕ</button>
            }

            {loading && <Preloader /> }
        </div>
    )
}

export default Home