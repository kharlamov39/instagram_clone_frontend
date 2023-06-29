import styles from './Post.module.css'
import { PostsRes } from '../../../../types/resTypes'
import { Link } from 'react-router-dom'

type PostProp = {
    post: PostsRes
}

const Post:React.FC<PostProp> = ({post}) => {

    return (
            <Link to={`${post._id}`} >
                <img 
                    src={`${process.env.REACT_APP_API_URL}${post.image}`} 
                    alt="image" 
                    className={styles.img}
                /> 
            </Link>
    )
}

export default Post