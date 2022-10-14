import type {GetStaticPaths, GetStaticProps} from 'next';
import type {MDXRemoteSerializeResult} from 'next-mdx-remote';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';
import type {ParsedUrlQuery} from 'querystring';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

import MDXComponents, {Title} from '@/components/MDXComponents/MDXComponents';

import {ApiGetArticlesSlugsRoute, ApiGetArticlesShowRoute} from '@/constants/api-routes';

import axios from '@/functions/shared/axios';

import type {ArticleModel} from '@/types/ModelTypes';
import type {PostsSlugsResponse} from '@/types/ResponseTypes';

import styles from '@/styles/pages/blog/posts/BlogPost.module.scss';

const PostPage = ({ post }: BlogPostProps) => {
    const components = MDXComponents();
    return (
        <div className={styles.container}>
            <Title>{post.title}</Title>
            <MDXRemote components={components} {...post.markdown}/>
        </div>
    );
};

interface BlogPostProps {
    post: ArticleModel;
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
    post.markdown = await serialize(post.markdown, {
        mdxOptions: {
            remarkPlugins: [remarkToc, remarkGfm],
            rehypePlugins: [rehypeSlug]
        }
    });

    return {
        props: { post },
        revalidate: 1
    };
};

