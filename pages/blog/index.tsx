import Banner from '/public/static/assets/images/banner-compressed.jpg';
import Loader from '@/components/Loader';
import axios from '@/functions/shared/axios';
import RecentPostLayout from '@/layouts/pages/blog/RecentPostLayout';
import styles from '@/styles/pages/blog/Recent.module.scss';
import {BlogProps, MapCollectionProps} from '@/types/PropTypes';
import type {GetStaticProps} from 'next';
import Image from 'next/image';
import type {FC} from 'react';
import {Fragment, useEffect} from 'react';
import {KeyLoader, SWRConfig} from 'swr';
import useSWRInfinite from 'swr/infinite';

const getKey: KeyLoader = (pageIndex, previousPageData) => {
    if (pageIndex === 0) return '/articles/posts/recent';
    return previousPageData.links.next;
};

export const Blog: FC<BlogProps> = (props) => {
        const { fallback } = props;
        return (
            <SWRConfig value={{ fallback }}>
                <div className={styles.container}>
                    <div className={styles.banner}>
                        <Image alt="banner" layout="fill" objectFit="cover" objectPosition="80% 20%" priority={true}
                               quality={100}
                               src={Banner}/>
                    </div>
                    <Posts/>
                </div>
            </SWRConfig>
        );
    }
;


const Posts: FC = () => {
    const { data: collections, setSize, isValidating } = useSWRInfinite<any>(getKey, {
        revalidateAll: false,
        persistSize: true
    });


    useEffect(() => {
        const action = async () => {
            const el = document.documentElement;
            if ((el.scrollHeight - el.scrollTop < el.clientHeight + 300) && !isValidating && !!collections?.[collections.length - 1].links.next) {
                await setSize(size => size + 1);
            }
        };

        document.addEventListener('scroll', action);
        return () => {
            document.removeEventListener('scroll', action);
        };
    }, []);

    return (
        <div className={styles.posts}>
            {collections?.map((responseCollection, index) => (
                <MapCollection key={index} collection={responseCollection}/>
            ))}
            {isValidating && <Loader/>}
        </div>
    );
};

const MapCollection: FC<MapCollectionProps> = ({ collection }) => {
    return (
        <Fragment>
            {collection.articles.map((post) => (
                <RecentPostLayout key={post.id} post={post}/>
            ))}
        </Fragment>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const {
        data: initialData,
        error
    } = await axios.simpleGet(process.env.NEXT_PUBLIC_API_URL + '/articles/posts/recent');

    if (initialData && !error)
        return {
            props: {
                fallback: {
                    '/articles/posts/recent': initialData
                }
            }
        };

    return { props: [] };
};

export default Blog;
