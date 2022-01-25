import Banner from '/public/static/assets/images/banner-compressed.jpg';
import axios from '@/functions/shared/axios';
import RecentPostLayout from '@/layouts/pages/blog/RecentPostLayout';
import PaginatedModelProvider, {usePaginatedContext} from '@/providers/PaginatedModelProvider';
import styles from '@/styles/pages/blog/Recent.module.scss';
import {PostModel} from '@/types/ModelTypes';
import {BlogProps} from '@/types/PropTypes';
import type {GetStaticProps} from 'next';
import Image from 'next/image';
import type {FC} from 'react';

export const Blog: FC<BlogProps> = (props) => {
    // const [state, setState] = useState({ ...props.initialData });
    // const [loading, setLoading] = useState(false);

    // const getMorePosts = async () => {
    //     if (!!state.links.next && !loading)
    //         try {
    //             await setLoading(true);
    //             const { data } = await axios.simpleGet<PostsResponse>(state.links.next, { params: { cursor: state.meta.cursor } });
    //             await setState(prev => ({ ...data, posts: [...prev.posts, ...data.posts] }));
    //             await setLoading(false);
    //         } catch (err) {
    //             console.error(err);
    //         }
    // };

    return (
        <div className={styles.container}>
            <div className={styles.banner}>
                <Image priority alt="banner" layout="fill" objectFit="cover" objectPosition="80% 20%" quality={100}
                       src={Banner}/>
            </div>

            <div className={styles.posts}>
                <PaginatedModelProvider middleware="guest" modelName="posts" url="/posts/recent">
                    {RecentPosts}
                </PaginatedModelProvider>
            </div>
        </div>
    );
};

export default Blog;

const RecentPosts = () => {
    const { data: posts, isLoading, nextPage, prevPage, hasMore, hasLess } = usePaginatedContext<PostModel>();

    return posts.map(post => (
        <RecentPostLayout key={post.id} post={post}/>
    ));
};


export const getStaticProps: GetStaticProps = async () => {
    const {
        data: initialData,
        error
    } = await axios.simpleGet(process.env.NEXT_PUBLIC_API_URL + '/posts/recent?perPage=5');

    if (initialData && !error)
        return { props: { initialData } };

    return { props: [] };
};