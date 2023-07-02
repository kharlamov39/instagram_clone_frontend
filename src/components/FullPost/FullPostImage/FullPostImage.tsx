import { PostsRes } from '../../../types/resTypes'
import styles from './FullPostImage.module.css'
import { Link } from 'react-router-dom'

type Props = {
    data: PostsRes
}

const port = process.env.REACT_APP_API_URL

const FullPostImage:React.FC<Props> = ({data}) => {
    return (
        <div className={styles.modalHomeWrap} style={{backgroundImage: `url(${port}${data.image})` }}>
            <Link to={`/profile/${data.user._id}/${data._id}`}>
                 <img 
                    src={`${port}${data.image}`} 
                    alt="image" 
                    className={styles.img}
                /> 
            </Link>
        </div>
    )
}

export default FullPostImage