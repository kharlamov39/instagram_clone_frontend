import { useState } from 'react'
import { PostsRes } from '../../../types/resTypes'
import FullPost from '../../FullPost/FullPost'
import Post from './Post/Post'
import styles from './ProfilePosts.module.css'
import { Routes, Route } from 'react-router-dom'

type ProfilePostsProps = {
    posts: PostsRes[]
}

const ProfilePosts:React.FC<ProfilePostsProps> = ({posts}) => {

    return (
            <div>
                <div className={styles.grid}>
                    { posts.map( el => <Post key={el._id} post={el} /> )}
                </div>
            </div>
    )
}

export default ProfilePosts