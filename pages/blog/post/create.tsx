import Error from '@/components/Error';
import File from '@/components/formComponents/File';
import Input from '@/components/formComponents/Input';
import TextArea from '@/components/formComponents/TextArea';
import {useAuth} from '@/providers/AuthProvider';
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

interface CompilerPayload {
    error: CompilerError | null;
    mdxSource: MDXRemoteSerializeResult | null;
}

interface CompilerError {
    code: string;
    loc: { line: number, column: number };
    pos: number;
    reasonCode: string;
}

interface State {
    mdxSource: MDXRemoteSerializeResult | null;
    showPreview: boolean;
    error: CompilerError | null;
}

const CreatePostPage: FC = () => {
    const { loggedIn } = useAuth();
    const mdUp = useMediaQuery({ from: 'md', option: 'up' });
    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            title: Yup.string().required('This field is required'),
            markdown: Yup.string().required('This field is required'),
            excerpt: Yup.string().required('This field is required'),
            banner_image: Yup.mixed().required()
        })),
        mode: 'all',
        defaultValues: {
            title: '',
            excerpt: '',
            markdown: '',
            banner_image: []
        }
    });
    const [state, setState] = useState<State>({
        mdxSource: null,
        showPreview: false,
        error: null
    });

    const compile = async () => {
        const res = await fetch('/api/compile', { method: 'POST', body: methods.getValues('markdown') });
        return res.json();
    };

    const compilePreview = async () => {
        if (mdUp) {
            const { mdxSource, error }: CompilerPayload = await compile();
            setState(prev => ({ ...prev, mdxSource, error }));
        } else {
            if (!state.showPreview) {
                const { mdxSource, error } = await compile();
                setState(prev => ({ ...prev, error, mdxSource, showPreview: !prev.showPreview }));
            } else setState(prev => ({ ...prev, showPreview: !prev.showPreview }));
        }
    };

    if (!loggedIn) {
        return <Error statusCode={401} title="Unauthorized"/>;
    }

    return (
        <FormProvider {...methods}>
            {mdUp ?
             (
                 <div className={styles.desktop}>
                     <PostForm/>
                     {state.error ? <div className={styles.error}>{state.error.reasonCode}</div> : <PostPreview
                         mdxSource={state.mdxSource}/>}
                 </div>
             )
                // : state.showPreview ? state.error ? <PostPreview mdxSource={state.mdxSource}/> : <div
                //                         className={styles.error}>{state.error?}</div>
                //                     : <PostForm/>
                  :
             (
                 <div>
                     {!state.showPreview ? <PostForm/>
                                         : state.error ? <div className={styles.error}>{state.error.reasonCode}</div>
                                                       : <PostPreview mdxSource={state.mdxSource}/>}

                 </div>
             )
            }
            <button onClick={compilePreview}>{mdUp ? 'Compile preview' : 'Toggle preview'}</button>
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
