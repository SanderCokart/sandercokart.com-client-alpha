import File from '@/components/formComponents/File';
import Input from '@/components/formComponents/Input';
import TextArea from '@/components/formComponents/TextArea';
import styles from '@/styles/blog/post/CreatePost.module.scss';
import {Form, Formik, useFormikContext} from 'formik';
import Image from 'next/image';

function CreatePostPage() {

    interface CreatePostFormValues {
        title: string;
        markdown: string;
        bannerImage: File | undefined;
    }

    const initialValues: CreatePostFormValues = {
        title: '',
        markdown: '',
        bannerImage: undefined
    };

    const onSubmit = (values: CreatePostFormValues) => {
        console.log(values);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                    <File multiple name="bannerImage"/>
                    <button className={styles.submitButton} type="submit">submit</button>
                </main>
            </div>
        </Form>
    );
}