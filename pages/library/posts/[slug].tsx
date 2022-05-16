import axios from '@/functions/shared/axios';
import styles from '@/styles/pages/blog/posts/BlogPost.module.scss';
import {PostsSlugsResponse} from '@/types/ResponseTypes';
import {GetStaticPaths, GetStaticProps} from 'next';
import {MDXRemoteSerializeResult, MDXRemote} from 'next-mdx-remote';
import {ArticleModel} from '@/types/ModelTypes';
import {ApiGetArticlesSlugsRoute, ApiGetArticlesShowRoute} from '@/constants/api-routes';
import {ParsedUrlQuery} from 'querystring';
import {useMemo} from 'react';
import {getMDXComponent} from 'mdx-bundler/client';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import {serialize} from 'next-mdx-remote/serialize';
import useMDXComponents from '@/components/MDXComponents';
import MDXComponents from '@/components/MDXComponents';

const PostPage = ({ post }: BlogPostProps) => {
    return (
        <div className={styles.container}>
            {/*<Title>{post.title}</Title>*/}
            {/*<MDXRemote components={MDXComponents} {...post.markdown}/>*/}
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
            remarkPlugins: [remarkToc],
            rehypePlugins: [rehypeSlug]
        }
    });


    return {
        props: { post },
        revalidate: 60
    };
};

