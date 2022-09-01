import {GetStaticPaths, GetStaticProps} from 'next';
import {MDXRemoteSerializeResult} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';
import {ParsedUrlQuery} from 'querystring';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';

import {ApiGetArticlesSlugsRoute, ApiGetArticlesShowRoute} from '@/constants/api-routes';

import axios from '@/functions/shared/axios';

import {ArticleModel} from '@/types/ModelTypes';
import {PostsSlugsResponse} from '@/types/ResponseTypes';

import styles from '@/styles/pages/blog/posts/BlogPost.module.scss';

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

