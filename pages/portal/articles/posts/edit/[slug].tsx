import Button from '@/components/Button';
import File from '@/components/formComponents/File';
import Input from '@/components/formComponents/Input';
import MarkdownEditor from '@/components/formComponents/MarkdownEditor';
import Select from '@/components/formComponents/Select';
import Textarea from '@/components/formComponents/Textarea';
import Loader from '@/components/Loader';
import PortalContainer from '@/components/PortalContainer';
import axios from '@/functions/shared/axios';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/pages/portal/posts/EditPost.module.scss';
import {CreatePostFormValues} from '@/types/FormValueTypes';
import {StatusModel} from '@/types/ModelTypes';
import {EditPostFormProps} from '@/types/PropTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';
import * as Yup from 'yup';

const EditPost: FC = () => {
    const router = useRouter();
    const { shouldRedirect, isLoading: isLoadingAuth, isAdmin } = useAuth({ middleware: 'auth' });
    const { query: { slug: postSlug } } = router;
    const { data: post, error } = useSWR((postSlug && isAdmin) ? `/articles/posts/${postSlug}` : null);

    useEffect(() => {
        shouldRedirect && router.push('/login');
    }, [shouldRedirect]);

    return (
        <PortalContainer>
            {(isLoadingAuth || shouldRedirect) && <Loader/>}
            <div className={styles.desktop}>
                <header className={styles.header}>
                    {post && !error ?
                     <h1>Edit Post - {post.id} - {post.title}</h1>
                                    :
                     <h1><Skeleton/></h1>
                    }
                </header>
                <main className={styles.main}>
                    <EditPostForm post={post}/>
                </main>
            </div>
        </PortalContainer>
    );
};

export default EditPost;

const EditPostForm: FC<EditPostFormProps> = ({ post }) => {
    const [loading, setLoading] = useState(true);
    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            title: Yup.string().required('This field is required'),
            excerpt: Yup.string().required('This field is required'),
            markdown: Yup.string().required('This field is required'),
            banner: Yup.mixed().required('This field is required')
        }))
    });
    const { data: statuses, error } = useSWR<StatusModel[]>('/status/post');


    useEffect(() => {
        if (post) {
            methods.reset({
                title: post?.title,
                excerpt: post?.excerpt,
                markdown: post?.markdown,
                banner: [post?.banner],
                status: String(post?.status.id)
            });
            setLoading(false);
        }
    }, [post]);

    const onSubmit = async (formValues: CreatePostFormValues) => {
        const transformedData = {
            ...formValues,
            banner: formValues.banner[0].id
        };

        console.log(transformedData);

        const { data, error } = await axios.simplePatch(`/articles/posts/${post.id}`, transformedData);
    };

    const { formState: { isDirty, isValid }, getValues } = methods;

    return (
        <FormProvider {...methods}>
            {!loading && (
                <form noValidate className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
                    <Input label="Title" name="title"/>
                    <Textarea label="Excerpt" name="excerpt"/>
                    <File editMode={true} name="banner"/>
                    <Select name="status">
                        {(statuses && !error) && statuses.map(status => (
                            <option key={status.id} value={status.id}>{status.name}</option>
                        ))}
                    </Select>
                    <MarkdownEditor name="markdown"/>
                    <Button className={styles.submitButton} disabled={!isDirty || !isValid} type="submit">
                        <FontAwesomeIcon icon="plus"/>
                    </Button>
                </form>
            )}
        </FormProvider>
    );
};