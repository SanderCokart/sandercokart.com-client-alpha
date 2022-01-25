import Input from '@/components/formComponents/Input';
import MarkdownEditor from '@/components/formComponents/MarkdownEditor/MarkdownEditor';
import NewFile from '@/components/formComponents/NewFile';
import Select from '@/components/formComponents/Select';
import TextArea from '@/components/formComponents/TextArea';
import Loader from '@/components/Loader';
import axios from '@/functions/shared/axios';
import useMediaQuery from '@/hooks/useMediaQuery';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/pages/portal/posts/CreatePost.module.scss';
import {CreatePostFormValues} from '@/types/FormValueTypes';
import {StatusModel} from '@/types/ModelTypes';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
// @ts-ignore
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import useSWR from 'swr';
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
            banner: Yup.mixed().required(),
            status: Yup.number().required()
        })),
        mode: 'all',
        defaultValues: {
            title: '',
            excerpt: '',
            markdown: '',
            banner: null,
            status: 1
        }
    });

    const { data: statuses, error } = useSWR<StatusModel[]>('/status/post');


    const { handleSubmit } = methods;

    useEffect(() => {
        if (shouldRedirect) router.push('/login');
    }, [shouldRedirect]);

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

    const onSubmit = async (formValues: CreatePostFormValues) => {
        await axios.simplePost('/posts', { ...formValues, banner: formValues.banner[0].id });
    };

    return (
        <>
            {(isLoadingAuth || shouldRedirect) && <Loader/>}
            <main className={styles.desktop}>
                <FormProvider {...methods}>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <Input label="Title" name="title"/>
                        <TextArea label="Excerpt" name="excerpt"/>
                        <NewFile name="banner"/>
                        <Select name="status">
                            {(statuses && !error) && statuses.map(status => (
                                <option key={status.id} value={status.id}>{status.name}</option>
                            ))}
                        </Select>
                        <MarkdownEditor name="markdown"/>
                        <button className={styles.submitButton} type="submit">Submit</button>
                    </form>
                </FormProvider>
            </main>
        </>
    );

};

export default CreatePostPage;