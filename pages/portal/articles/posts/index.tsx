import Loader from '@/components/Loader';
import {useAuth} from '@/providers/AuthProvider';
import PaginatedModelProvider, {usePaginatedContext} from '@/providers/PaginatedModelProvider';
import styles from '@/styles/pages/portal/Users.module.scss';
import type {ArticleModel} from '@/types/ModelTypes';
import type {PostRowProps} from '@/types/PropTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import moment from 'moment';
import Link from 'next/link';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import {useSWRConfig} from 'swr';

const Posts: FC = () => {
    const { shouldRedirect, isLoading: isLoadingAuth } = useAuth({ middleware: 'auth' });
    const router = useRouter();
    const { mutate } = useSWRConfig();

    useEffect(() => {
        if (shouldRedirect) router.push('/login');
        mutate('/user');
    }, [shouldRedirect]);

    return (
        <PaginatedModelProvider middleware="auth" modelName="articles" url="/articles/posts">
            {(isLoadingAuth || shouldRedirect) && <Loader/>}
            <PostTable/>
        </PaginatedModelProvider>
    );
};

export default Posts;

const PostRow: FC<PostRowProps> = ({ post }) => {
    return (
        <tr>
            <td>{post.id}</td>
            <td data-tooltip={post.title}>{post.title}</td>
            <td>{post.slug}</td>
            <td>{post.author.name}</td>
            <td>{moment(post.createdAt).calendar()}</td>
            <td>{moment(post.updatedAt).calendar()}</td>
            <td>{post.publishedAt ? moment(post.publishedAt).calendar() : 'NULL'}</td>
            <td className={styles[post.status.name]}>{post.status.name}</td>

            <td className={styles.actions}>
                <div>
                    <Link href={`/portal/articles/posts/delete/${post.slug}`}>
                        <a type="button"><FontAwesomeIcon icon="trash"/></a>
                    </Link>
                    <Link href={`/portal/articles/posts/edit/${post.slug}`}>
                        <a type="button"><FontAwesomeIcon icon="pen"/></a>
                    </Link>
                </div>
            </td>
        </tr>
    );
};

const PostTable: FC = () => {
    const {
        data,
        isLoading,
        nextPage,
        prevPage,
        hasMore,
        hasLess,
        meta,
        setPageIndex
    } = usePaginatedContext<ArticleModel>();

    const keys = ['id', 'title', 'slug', 'author', 'createdAt', 'updatedAt', 'publishedAt', 'status', 'actions'];

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
                    {keys.map(key => (
                        <td key={key}>{key}</td>
                    ))}
                </tr>
                </thead>
                <tbody>
                {isLoading ? [...Array(100)].map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        <td colSpan={9}><Skeleton  duration={.75} height="100%" width="100%"/></td>
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
                    <button key={link.label} disabled={link.active || link.label === '...'} onClick={() => setPageIndex(Number(link.label))}>
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