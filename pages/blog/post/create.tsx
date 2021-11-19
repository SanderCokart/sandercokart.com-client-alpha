import Input from '@/components/formComponents/Input';
import TextArea from '@/components/formComponents/TextArea';
import styles from '@/styles/pages/blog/post/CreatePost.module.scss';
import File from '@/components/formComponents/File'
import {Form, Formik, useFormikContext} from 'formik';
import * as yup from 'yup';

interface CreatePostFormValues {
    title: string;
    markdown: string;
    bannerImage: File | undefined;
}

function CreatePostPage() {
    const initialValues: CreatePostFormValues = {
        title: '',
        markdown: '',
        bannerImage: undefined
    };

    const onSubmit = (formValues: CreatePostFormValues) => {
        console.log(formValues);
    };

    const postSchema = yup.object().shape({
        title: yup.string().required('This field is required'),
        markdown: yup.string().min(6).max(50).required('This field is required')
    });


    return (
        <Formik initialValues={initialValues} validationSchema={postSchema} onSubmit={onSubmit}>
            <CreatePostForm/>
        </Formik>
    );
}

export default CreatePostPage;


function CreatePostForm() {
    const { isValid, dirty } = useFormikContext();
    return (
        <Form noValidate className={styles.form}>
            <div>
                <header className={styles.header}>
                    <h1>Create Post</h1>
                </header>
                <main className={styles.main}>
                    <Input label="Title" name="title" placeholder="My Phone Review..."/>
                    <TextArea label="Markdown" name="markdown"/>
                    <File name="banner_image"/>
                    <button className={styles.submitButton} disabled={!isValid || !dirty} type="submit">submit</button>
                </main>
            </div>
        </Form>
    );
}