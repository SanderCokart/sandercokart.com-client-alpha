import type {GetStaticPaths, GetStaticProps} from 'next';
import type {MDXRemoteSerializeResult} from 'next-mdx-remote';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';
import type {ParsedUrlQuery} from 'querystring';
import remarkGfm from 'remark-gfm';

import MDXComponents, {Title} from '@/components/MDXComponents/MDXComponents';

import {ApiGetArticlesSlugsRoute, ApiGetArticlesShowRoute} from '@/constants/api-routes';

import axios from '@/functions/shared/axios';

import type {ArticleModel} from '@/types/ModelTypes';
import type {PostsSlugsResponse} from '@/types/ResponseTypes';

import styles from '@/styles/pages/blog/posts/BlogPost.module.scss';

const PostPage = ({ post, mdxSource }: BlogPostProps) => {
    const components = MDXComponents();
    return (
        <article className={styles.container}>
            <Title>{post.title}</Title>
            <MDXRemote {...mdxSource} components={components}/>
        </article>
    );
};

interface BlogPostProps {
    post: Omit<ArticleModel, 'markdown'>;
    mdxSource: MDXRemoteSerializeResult;
}

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await axios.simpleGet<PostsSlugsResponse[]>(ApiGetArticlesSlugsRoute('posts'));
    switch (response.type) {
        case 'success':
            return {
                paths: response.data,
                fallback: 'blocking' // See the "fallback" section below
            };
        default:
            throw new Error('Failed to get static paths');
    }

};

interface Params extends ParsedUrlQuery {
    slug: string;
}

interface Props {
    post: Omit<ArticleModel, 'markdown'>;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    if (!context.params?.slug) throw new Error('No params');

    const { data: post } = await axios.simpleGet(ApiGetArticlesShowRoute('posts', context.params.slug));
    const mdxSource = await serialize(post.markdown, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: []
        }
    });

    return {
        props: { post, mdxSource },
        revalidate: 1
    };
};

