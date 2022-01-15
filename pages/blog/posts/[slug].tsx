import useMDXComponents from '@/components/MDXComponents';
import axios from '@/functions/shared/axios';
import styles from '@/styles/pages/blog/posts/BlogPost.module.scss';
import {BlogPostProps} from '@/types/PropTypes';
import {PostsSlugsResponse} from '@/types/ResponseTypes';
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from 'next';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';
import type {FC} from 'react';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';

const BlogPost: FC<BlogPostProps> = ({ post, mdxSource }) => {
    const MDXComponents = useMDXComponents();
    const { Title } = MDXComponents;
    return (
        <div className={styles.container}>
            <Title>{post.title}</Title>
            <MDXRemote components={MDXComponents} {...mdxSource}/>
        </div>
    );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await axios.simpleGet<PostsSlugsResponse[]>('/posts/slugs');

    return {
        paths: data,
        fallback: 'blocking' // See the "fallback" section below
    };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const { data: post } = await axios.simpleGet(`/posts/${context.params?.slug}`);
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

