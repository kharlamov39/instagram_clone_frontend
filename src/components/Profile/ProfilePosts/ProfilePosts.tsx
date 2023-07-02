import { PostsRes } from '../../../types/resTypes'
import Post from './Post/Post'
import styles from './ProfilePosts.module.css'

type ProfilePostsProps = {
    posts: PostsRes[]
}

const ProfilePosts:React.FC<ProfilePostsProps> = ({posts}) => {

    return (
        <div>
            <div className={styles.grid}>
                { posts.map( (el, i) => <Post key={i} post={el} /> )}
            </div>
        </div>
    )
}

export default ProfilePosts