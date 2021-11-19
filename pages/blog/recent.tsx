import {useApi} from '@/providers/ApiProvider';
import styles from '@/styles/pages/blog/Recent.module.scss';
import axios, {AxiosResponse} from 'axios';
import type {GetStaticProps} from 'next';
import Image from 'next/image';
import type {FC} from 'react';
import {useState} from 'react';

interface Meta {
    current_page: number;
    cursor: number | null;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
}

interface User {
    id: number;
    name: string;
}

interface Banner {
    id: number,
    original_name: string;
    relative_url?: string;
    created_at: string;
}

interface Post {
    id: number;
    title: string;
    markdown: string;
    created_at: string;
    updated_at: string;
    slug: string;
    user: User;
    banner: Banner | null;
}

interface Links {
    first: string;
    last: string;
    next: string;
    prev: string;
}


interface PostsResponse {
    posts: Post[];
    links: Links;
    meta: Meta;
}

interface Props {
    initialData: PostsResponse;
}


export const Recent: FC<Props> = (props) => {
    const api = useApi();

    console.log(props.initialData.posts[0]);

    const [state, setState] = useState({ ...props.initialData });
    const [loading, setLoading] = useState(false);


    const getMorePosts = async () => {
        if (!!state.links.next && !loading)
            try {
                await setLoading(true);
                const { data }: AxiosResponse<PostsResponse> = await api.get(state.links.next, { params: { cursor: state.meta.cursor } });
                await setState(prev => ({ ...data, posts: [...prev.posts, ...data.posts] }));
                await setLoading(false);
            } catch (err) {
                console.error(err);
            }
    };

    return (
        <div className={styles.posts}>

            {state.posts.map(post => (
                <div key={post.id} className={styles.post}>
                    <figure className={styles.figure}>

                        {post.banner &&
                        <Image alt="banner" layout="fill" objectFit="cover"
                               src={`${process.env.NEXT_PUBLIC_API_URL}/${post.banner?.relative_url}`}/>
                        }

                        <figcaption className={styles.caption}>
                            <h1 className={styles.title}>{post.title}</h1>
                            <p className={styles.excerpt}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Distinctio, nostrum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae,
                                quod!</p>
                        </figcaption>
                    </figure>
                </div>
            ))}

            <button style={{ position: 'fixed', bottom: 0 }} onClick={getMorePosts}>get more</button>
        </div>
    );
};

export default Recent;


export const getStaticProps: GetStaticProps = async () => {
    try {
        const { data: initialData } = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/posts?perPage=5');

        return {
            props: { initialData }
        };
    } catch (err) {
        throw Error(err);
    }
};