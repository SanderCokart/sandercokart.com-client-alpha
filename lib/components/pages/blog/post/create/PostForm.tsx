import File from '../../../../formComponents/File';
import Input from '../../../../formComponents/Input';
import styles from '@/styles/pages/blog/post/CreatePost.module.scss';
import type {CreatePostModel} from '@/types/ModelTypes';
import EasyMDE from 'easymde';
import dynamic from 'next/dynamic';
import {FC} from 'react';
import {useFormContext} from 'react-hook-form';

const PostForm: FC = () => {
    const { formState: { isValid, isDirty }, handleSubmit } = useFormContext();

    const onSubmit = (formValues: CreatePostModel) => {
        console.log(formValues);
    };

    const SimpleMDE = dynamic(() => import('react-simplemde-editor'));

    const toolbar = ['undo', 'redo', '|', 'table', 'code', '|', 'unordered-list', 'ordered-list', '|', 'bold', 'italic', 'strikethrough', '|', 'fullscreen', 'preview', 'side-by-side'];

    const MDEOptions = { toolbar } as EasyMDE.Options;

    return (
        <form noValidate className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <header className={styles.header}>
                <h1>Create Post</h1>
            </header>
            <main className={styles.main}>
                <Input label="Title" name="title" placeholder="My Phone Review..."/>
                <Input label="Excerpt" name="excerpt"
                       placeholder="In this post I'll be going over a few things such as..."/>
                <SimpleMDE options={MDEOptions} style={{ backgroundColor: 'white' }}/>
                <File name="banner_image"/>
                <button className={styles.submitButton} disabled={!isValid || !isDirty} type="submit">submit
                </button>
            </main>
        </form>
    );
};

export default PostForm;