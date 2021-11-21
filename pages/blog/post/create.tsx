import File from '@/components/formComponents/File';
import Input from '@/components/formComponents/Input';
import TextArea from '@/components/formComponents/TextArea';
import styles from '@/styles/pages/blog/post/CreatePost.module.scss';
import {yupResolver} from '@hookform/resolvers/yup';
import {MDXRemote, MDXRemoteSerializeResult} from 'next-mdx-remote';
import type {FC} from 'react';
import {useState} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import * as Yup from 'yup';
import useMediaQuery from '../../../hooks/useMediaQuery';

interface CreatePostPayload {
    title: string;
    markdown: string;
    bannerImage: File | undefined;
}

interface State {
    mdxSource: MDXRemoteSerializeResult | null,
    showPreview: boolean
}

const CreatePostPage: FC = () => {
    const matches = useMediaQuery({ from: 'md', option: 'up' });
    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            title: Yup.string().required('This field is required'),
            markdown: Yup.string().required('This field is required'),
            banner_image: Yup.mixed().required()
        })),
        mode: 'all',
        defaultValues: {
            title: '',
            excerpt: '',
            markdown: '',
            banner_image: undefined
        }
    });
    const [state, setState] = useState<State>({
        mdxSource: null,
        showPreview: false
    });
    const compilePreview = async () => {
        if (!state.showPreview) {
            const res = await fetch('/api/compile', { method: 'POST', body: methods.getValues('markdown') });
            const mdxSource = await res.json();
            setState(prev => ({ ...prev, showPreview: !prev.showPreview, mdxSource }));
        } else
            setState(prev => ({ ...prev, showPreview: !prev.showPreview }));
    };

    return (
        <FormProvider {...methods}>
            {matches ?
                <div className={styles.desktop}><PostForm/><PostPreview mdxSource={state.mdxSource}/>
                </div> : state.showPreview
                    ? <PostPreview mdxSource={state.mdxSource}/> : <PostForm/>
            }
            <button onClick={compilePreview}>{matches ? 'Compile preview' : 'Toggle preview'}</button>
        </FormProvider>
    );
};

const PostForm: FC = () => {
    const { formState: { isValid, isDirty }, handleSubmit } = useFormContext();

    const onSubmit = (formValues: CreatePostPayload) => {
        console.log(formValues);
    };


    return (
        <form noValidate className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <header className={styles.header}>
                <h1>Create Post</h1>
            </header>
            <main className={styles.main}>
                <Input label="Title" name="title" placeholder="My Phone Review..."/>
                <Input label="Excerpt" name="excerpt" placeholder="In this post I'll be going over a few things such as..."/>
                <TextArea label="Markdown" name="markdown"/>
                <File name="banner_image"/>
                <button className={styles.submitButton} disabled={!isValid || !isDirty} type="submit">submit
                </button>
            </main>
        </form>
    );
};

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

export default CreatePostPage;
