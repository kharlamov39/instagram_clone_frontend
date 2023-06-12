import { PostsRes } from '../../../types/resTypes'
import styles from './FullPostImage.module.css'
import { Link } from 'react-router-dom'

type Props = {
    data: PostsRes
}

const FullPostImage:React.FC<Props> = ({data}) => {
    return (
        <div className={styles.modalHomeWrap} style={{backgroundImage: `url(http://localhost:1111${data.image})` }}>
            <Link to={`/profile/${data.user._id}/${data._id}`}>
                 <img 
                    src={`http://localhost:1111${data.image}`} 
                    alt="image" 
                    className={styles.img}
                /> 
            </Link>
        </div>
    )
}

export default FullPostImage