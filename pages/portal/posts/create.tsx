import Checkbox from '@/components/formComponents/Checkbox';
import File from '@/components/formComponents/File';
import Input from '@/components/formComponents/Input';
import TextArea from '@/components/formComponents/TextArea';
import Loader from '@/components/Loader';
import MDXComponents from '@/components/MDXComponents';
import axios from '@/functions/shared/axios';
import useMediaQuery from '@/hooks/useMediaQuery';
import {useAuth} from '@/providers/AuthProvider';
import editorStyles from '@/styles/components/formComponents/Editor.module.scss';
import pageStyles from '@/styles/pages/portal/posts/CreatePost.module.scss';
import {CreatePostFormValues} from '@/types/FormValueTypes';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
// @ts-ignore
import MDX from '@mdx-js/runtime';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {useEffect} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {FormProvider, useForm} from 'react-hook-form';
import 'react-markdown-editor-lite/lib/index.css';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkToc from 'remark-toc';
// @ts-ignore
import remarkUnderline from 'remark-underline';
import * as Yup from 'yup';


const CreatePostPage: FC = () => {
    const { shouldRedirect, isLoading: isLoadingAuth } = useAuth({ middleware: 'auth' });
    const router = useRouter();
    const mdUp = useMediaQuery({ from: 'md', option: 'up' });
    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            title: Yup.string().required('This field is required'),
            markdown: Yup.string().required('This field is required'),
            excerpt: Yup.string().required('This field is required'),
            banner_image: Yup.mixed().required(),
            publish_now: Yup.boolean().required()
        })),
        mode: 'all',
        defaultValues: {
            title: '',
            excerpt: '',
            markdown: '',
            banner_image: [],
            publish_now: false

        }
    });

    const { handleSubmit, setValue } = methods;

    useEffect(() => {
        if (shouldRedirect) router.push('/login');
    }, [shouldRedirect]);

    const MDXEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });

    const PLUGINS = [
        'header',
        'font-bold',
        'font-italic',
        'font-strikethrough',
        'divider',
        'list-unordered',
        'list-ordered',
        'blockquote',
        'block-wrap',
        'block-code-inline',
        'block-code-block',
        'table',
        'image',
        'link',
        'mode-toggle',
        'fullscreen',
        'auto-resize'
    ];

    const [title, excerpt] = methods.watch(['title', 'excerpt']);
    const header = `<Title>${title}</Title>\n\n${excerpt}\n\n`;

    const onSubmit = async (formValues: CreatePostFormValues) => {
        await axios.simplePost('/posts', formValues);
    };

    const onChange = (value: { text: string, html: string }) => {
        setValue('markdown', value.text);
    };

    useEffect(() => {
        axios.simpleGet('files/1').then(res => {
            console.log(res.data);
        });
    }, []);

    const onImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await axios.simplePost('/files', formData);

        return new Promise(resolve => {
            resolve(`${process.env.NEXT_PUBLIC_API_URL}/files/${data.id}`);
        });
    };

    return (
        <>
            {(isLoadingAuth || shouldRedirect) && <Loader/>}
            <main className={pageStyles.desktop}>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input label="Title" name="title"/>
                        <TextArea label="Excerpt" name="excerpt"/>
                        <File name="banner_image"/>
                        <Checkbox label="Publish Now" name="publish_now"/>
                        <MDXEditor className={editorStyles.editor} htmlClass={editorStyles.html}
                                   markdownClass={editorStyles.markdown}
                                   plugins={PLUGINS}
                                   renderHTML={html => {
                                       try {
                                           return renderToStaticMarkup(
                                               <MDX components={MDXComponents}
                                                    rehypePlugins={[rehypeSlug]}
                                                    remarkPlugins={[remarkParse, remarkGfm, remarkBreaks, remarkToc, remarkUnderline]}>
                                                   {header + html}
                                               </MDX>
                                           );
                                       } catch (error) {
                                           return renderToStaticMarkup(
                                               <div>
                                                   <h1>{error.name}</h1>
                                                   <p>{error.message}</p>
                                               </div>
                                           );
                                       }
                                   }
                                   }
                                   syncScrollMode={['rightFollowLeft', 'leftFollowRight']}
                                   onChange={onChange}
                                   onImageUpload={onImageUpload}/>
                        <button type="submit">Submit</button>
                    </form>
                </FormProvider>
            </main>
        </>
    );

};

export default CreatePostPage;