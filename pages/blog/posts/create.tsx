import Error from '@/components/Error';
import File from '@/components/formComponents/File';
import Input from '@/components/formComponents/Input';
import TextArea from '@/components/formComponents/TextArea';
import {handler, useApi} from '@/providers/ApiProvider';
import {useAuth} from '@/providers/AuthProvider';
import editorStyles from '@/styles/components/Editor.module.scss';
import styles from '@/styles/pages/blog/post/CreatePost.module.scss';
import {CreatePostFormValues} from '@/types/FormValueTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {yupResolver} from '@hookform/resolvers/yup';
import MDX from '@mdx-js/runtime';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import type {FC} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';

import 'react-markdown-editor-lite/lib/index.css';
import * as Yup from 'yup';
import useMDEOptions from '../../../hooks/useMDEOptions';
import useMediaQuery from '../../../hooks/useMediaQuery';

const CreatePostPage: FC = () => {
    const { loggedIn } = useAuth();
    const api = useApi();
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

    if (!loggedIn) {
        return <Error statusCode={401} title="Unauthorized"/>;
    }

    const { handleSubmit } = methods;

    const submitPost = async (formValues: CreatePostFormValues) => {
        const { data } = await handler(api.post('/posts', formValues));
    };

    const markdown = methods.watch('markdown');

    return (
        <main className={mdUp ? styles.desktop : styles.mobile}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(submitPost)}>
                    <Input label="Title" name="title"/>
                    <TextArea label="Excerpt" name="excerpt"/>
                    <File name="banner_image"/>
                    <Preview markdown={markdown}/>
                    <button className={styles.submit} type="submit">
                        <FontAwesomeIcon icon="plus"/>
                    </button>
                </form>
            </FormProvider>
        </main>
    );
};


export default CreatePostPage;

const Editor: FC = () => {
    const SimpleMDE = dynamic(() => import('react-simplemde-editor'));
    const MDEOptions = useMDEOptions();

    const { setValue, getValues } = useFormContext();

    const onChange = (text: string) => {
        setValue('markdown', text);
    };

    const value = getValues('markdown');

    return (
        <div className={editorStyles.view}>
            <SimpleMDE options={MDEOptions} style={{ backgroundColor: 'white' }} value={value} onChange={onChange}/>
        </div>
    );
};

const Preview: FC<{ markdown: string }> = ({ markdown }) => {
    const { watch } = useFormContext();
    const [title, excerpt] = watch(['title', 'excerpt']);

    const components: { [key: string]: FC } = {
        h1: ({ children, ...props }) => (
            <h2 {...props}>{children}</h2>
        )
    };

    const scope = {
        some: 'value'
    };

    const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
        ssr: false
    });

    return <MdEditor renderHTML={(text) => {
        try {
            return renderToStaticMarkup(
                <>
                    <h1>{title}</h1>
                    <p>{excerpt}</p>
                    <MDX components={components} scope={scope}>
                        {text}
                    </MDX>
                </>
            );
        } catch (err: any) {
            console.error(err);
            return renderToStaticMarkup(
                <div>
                    <h1>{err.name}</h1>
                    <p>{err.message}</p>
                </div>
            );
        }
    }} style={{ height: '50vh' }}/>;

};