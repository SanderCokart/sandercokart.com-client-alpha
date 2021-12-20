import styles from '@/styles/pages/blog/post/CreatePost.module.scss';
import {MDXRemote, MDXRemoteSerializeResult} from 'next-mdx-remote';
import {FC} from 'react';
import {useFormContext} from 'react-hook-form';

const PostPreview: FC<{ mdxSource: MDXRemoteSerializeResult | null }> = ({ mdxSource }) => {
    const { watch } = useFormContext();
    const title = watch('title');
    if (mdxSource)
        return (
            <div className={styles.preview}>
                <h1>{title}</h1>
                <MDXRemote {...mdxSource}/>
            </div>
        );
    else return (
        <div className={styles.waiting}>
            <h1>Waiting for compiler</h1>
        </div>
    );
};

export default PostPreview;