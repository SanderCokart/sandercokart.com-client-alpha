import Input from '@/components/formComponents/Input/Input';
import MarkdownEditor from '@/components/formComponents/MarkdownEditor';
import NewFile from '@/components/formComponents/File';
import TextArea from '@/components/formComponents/Textarea/Textarea';
import Loader from '@/components/Loader/Loader';
import axios from '@/functions/shared/axios';
import styles from '@/styles/pages/portal/posts/CreatePost.module.scss';
import {CreatePostFormValues} from '@/types/FormValueTypes';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useRouter} from 'next/router';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';
import useAuthPage from '@/hooks/useAuthPage';


const CreatePostPage = () => {
    const visible = useAuthPage();
    const router = useRouter();
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
            title: 'title',
            excerpt: 'excerpt',
            markdown: '',
            banner: null,
            status: 1
        }
    });

    const { handleSubmit } = methods;

    const onSubmit = async (formValues: CreatePostFormValues) => {
        await axios.simplePost('/posts', { ...formValues, banner: formValues.banner[0].id });
    };

    return (
        <>
            <Loader visible={visible}/>
            <main className={styles.desktop}>
                <FormProvider {...methods}>
                    <form noValidate className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <Input label="Title" name="title"/>
                        <TextArea label="Excerpt" name="excerpt"/>
                        <NewFile name="banner"/>
                        <MarkdownEditor name="markdown"/>
                        <button className={styles.submitButton} type="submit">Submit</button>
                    </form>
                </FormProvider>
            </main>
        </>
    );

};

export default CreatePostPage;