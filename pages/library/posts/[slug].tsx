import useMDXComponents from '@/components/MDXComponents';
import axios from '@/functions/shared/axios';
import styles from '@/styles/pages/blog/posts/BlogPost.module.scss';
import {PostsSlugsResponse} from '@/types/ResponseTypes';
import {GetStaticPaths, GetStaticProps} from 'next';
import {MDXRemoteSerializeResult, MDXRemote} from 'next-mdx-remote';
import {ArticleModel} from '@/types/ModelTypes';
import {ApiArticleSlugRoute, ApiArticleShowRoute} from '@/constants/api-routes';
import {serialize} from 'next-mdx-remote/serialize';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import {ParsedUrlQuery} from 'querystring';

const PostPage = ({ post, mdxSource }: BlogPostProps) => {
    const MDXComponents = useMDXComponents();
    const { Title } = MDXComponents;
    return (
        <div className={styles.container}>
            <Title>{post.title}</Title>
            <MDXRemote components={MDXComponents} {...mdxSource}/>
        </div>
    );
};

interface BlogPostProps {
    post: ArticleModel;
    mdxSource: MDXRemoteSerializeResult;
}

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await axios.simpleGet<PostsSlugsResponse[]>(ApiArticleSlugRoute('posts'));
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

    const { data: post } = await axios.simpleGet(ApiArticleShowRoute('posts', context.params.slug));
    const mdxSource = await serialize(post.markdown, {
        mdxOptions: {
            remarkPlugins: [remarkToc],
            rehypePlugins: [rehypeSlug]
        }
    });

    delete post.markdown;

    return {
        props: { post, mdxSource },
        revalidate: 60
    };
};

