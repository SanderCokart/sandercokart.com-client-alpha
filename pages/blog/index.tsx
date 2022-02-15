import axios from '@/functions/shared/axios';
import {BlogProps} from '@/types/PropTypes';
import type {GetStaticProps} from 'next';
import type {FC} from 'react';
import {KeyLoader} from 'swr';

const getKey: KeyLoader = (pageIndex, previousPageData) => {
    if (pageIndex === 0) return '/articles/posts/recent';
    return previousPageData.links.next;
};

export const Blog: FC<BlogProps> = (props) => {
    return (
        <>

        </>
    );
};


export const getStaticProps: GetStaticProps = async () => {
    const { data, error } = await axios.simpleGet(process.env.NEXT_PUBLIC_API_URL + '/articles/posts/recent');

    return { props: {} };
};

export default Blog;
