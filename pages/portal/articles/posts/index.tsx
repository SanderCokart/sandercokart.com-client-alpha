import Loader from '@/components/Loader';
import PaginatedModelProvider, {usePaginatedContext} from '@/providers/PaginatedModelProvider';
import styles from '@/styles/pages/portal/users/Users.module.scss';
import type {ArticleModel} from '@/types/ModelTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import moment from 'moment';
import {useState} from 'react';
import Skeleton from 'react-loading-skeleton';
import {IconButton, IconButtonWithLink} from '@/components/IconButton';
import {Modal} from 'react-responsive-modal';
import axios from '@/functions/shared/axios';
import {Button} from '@/components/Button';
import CreateFAB from '@/components/CreateFAB';
import {LocalPortalArticlesCreatePageRoute} from '@/constants/local-routes';
import useAuthPage from '@/hooks/useAuthPage';

const Posts = () => {
    const visible = useAuthPage();

    return (
        <PaginatedModelProvider middleware="auth" resourceDataKey="articles" url="/articles/posts">
            <Loader visible={visible}/>
            <PostTable/>
            <CreateFAB href={LocalPortalArticlesCreatePageRoute('posts')}/>
        </PaginatedModelProvider>
    );
};


const PostTable = () => {
    const {
        data, isLoading, hasMore, hasLess, meta,
        nextPage, prevPage, setPageIndex
    } = usePaginatedContext<ArticleModel>();

    const columnNames = ['id', 'title', 'slug', 'author', 'created_at', 'updated_at', 'publishedAt', 'status', 'actions'];

    return (
        <main className={styles.users}>
            <table>
                <colgroup>
                    <col width="100"/>
                    <col width="200"/>
                    <col width="200"/>
                    <col width="200"/>
                    <col width="250"/>
                    <col width="250"/>
                    <col width="250"/>
                    <col width="100"/>
                    <col width="100"/>
                </colgroup>
                <thead>
                <tr>
                    {columnNames.map(key => (
                        <td key={key}>{key}</td>
                    ))}
                </tr>
                </thead>
                <tbody>
                {isLoading ? [...Array(100)].map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        <td colSpan={9}><Skeleton height="100%" width="100%"/></td>
                    </tr>
                )) : data.map(post => (
                    <PostRow key={post.id} post={post}/>
                ))}

                </tbody>
            </table>

            <div className={styles.pageControls}>
                <button disabled={!hasLess} onClick={prevPage}>
                    <FontAwesomeIcon icon="arrow-left"/>
                </button>
                {meta?.links?.slice(1, meta.links.length - 1).map(link => (
                    <button key={link.label} disabled={link.active || link.label === '...'}
                            onClick={() => setPageIndex(Number(link.label))}>
                        {link.label}
                    </button>
                ))}
                <button disabled={!hasMore} onClick={nextPage}>
                    <FontAwesomeIcon icon="arrow-right"/>
                </button>
            </div>
        </main>
    );
};

const PostRow = ({ post }: { post: ArticleModel }) => {
    const { mutate } = usePaginatedContext<ArticleModel>();
    const [deleteModalActive, setDeleteModalActive] = useState(false);

    const confirmDelete = async () => {
        const { status } = await axios.simpleDelete(`/articles/${post.id}`);
        if (status !== 204) return;
        mutate((data) => ({
            ...data,
            articles: data?.articles.filter((item: ArticleModel) => item.id !== post.id)
        }), false);
    };

    const closeDeleteModal = () => setDeleteModalActive(false);
    const openDeleteModal = () => setDeleteModalActive(true);

    const ConfirmDeleteModal = () => (
        <Modal center
               closeIcon={<FontAwesomeIcon icon="times"/>}
               open={deleteModalActive}
               onClose={closeDeleteModal}>
            <h1>Confirm Deletion</h1>

            <p>Are you sure you wish to delete <b>{post.title}</b>?</p>

            <div className={styles.deleteModalActions}>
                <Button onClick={closeDeleteModal}>Cancel</Button>
                <Button onClick={confirmDelete}>Confirm</Button>
            </div>
        </Modal>
    );

    return (
        <tr>
            <td>{post.id}</td>
            <td data-tooltip={post.title}>{post.title}</td>
            <td>{post.slug}</td>
            <td>{post.author.name}</td>
            <td>{moment(post.created_at).calendar()}</td>
            <td>{moment(post.updated_at).calendar()}</td>
            <td>{post.publishedAt ? moment(post.publishedAt).calendar() : 'NULL'}</td>

            <td className={styles.actions}>
                <div>
                    <IconButton
                        accentColor="var(--error)"
                        icon={<FontAwesomeIcon icon="trash"/>}
                        onClick={openDeleteModal}/>
                    <ConfirmDeleteModal/>
                    <IconButtonWithLink
                        accentColor="var(--success)"
                        href={`/portal/articles/posts/edit/${post.slug}`}
                        icon={<FontAwesomeIcon icon="pen"/>}/>
                </div>
            </td>
        </tr>
    );
};

export default Posts;