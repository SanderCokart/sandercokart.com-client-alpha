import usePosts from '@/hooks/usePosts';
import styles from '@/styles/pages/portal/Users.module.scss';
import type {PostRowProps} from '@/types/PropTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import moment from 'moment';
import type {FC} from 'react';
import Skeleton from 'react-loading-skeleton';

const Posts: FC = () => {
    const { posts, isLoading, nextPage, prevPage, hasMore, hasLess, onDelete, onEdit } = usePosts();

    const keys = ['id', 'title', 'slug', 'author', 'createdAt', 'updatedAt', 'actions'];

    return (
        <main className={styles.users}>
            <table>
                <thead>
                <tr>
                    {keys.map(key => (
                        <td key={key}>{key}</td>
                    ))}
                </tr>
                </thead>
                <tbody>
                {isLoading ? [...Array(100)].map((_, index) => (
                    <tr key={index}>
                        {[...Array(8)].map((_, index2) =>
                            <td key={index2}><Skeleton baseColor="#222" width="100%"/></td>
                        )}
                    </tr>
                )) : posts.map(post => (
                    <PostRow key={post.id} post={post} onDelete={onDelete} onEdit={onEdit}/>
                ))}

                </tbody>
            </table>

            <div className={styles.pageControls}>
                <button disabled={!hasLess} onClick={prevPage}>
                    <FontAwesomeIcon icon="arrow-left"/>
                </button>
                <button disabled={!hasMore} onClick={nextPage}>
                    <FontAwesomeIcon icon="arrow-right"/>
                </button>
            </div>
        </main>
    );
};

export default Posts;

const PostRow: FC<PostRowProps> = ({ post, onDelete, onEdit }) => {
    return (
        <tr>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.slug}</td>
            <td>{post.author.name}</td>
            <td>{moment(post.createdAt).calendar()}</td>
            <td>{moment(post.updatedAt).calendar()}</td>

            <td className={styles.actions}>
                <div>
                    <button type="button" onClick={() => onDelete(post.id)}><FontAwesomeIcon icon="trash"/></button>
                    <button type="button" onClick={() => onEdit(post.id)}><FontAwesomeIcon icon="pen"/></button>
                </div>
            </td>
        </tr>
    );
};