import Input from '@/components/formComponents/Input';
import MarkdownEditor from '@/components/formComponents/MarkdownEditor/MarkdownEditor';
import TextArea from '@/components/formComponents/TextArea';
import Loader from '@/components/Loader';
import PortalContainer from '@/components/PortalContainer';
import {useAuth} from '@/providers/AuthProvider';
import {CreatePostFormValues} from '@/types/FormValueTypes';
import {EditPostFormProps} from '@/types/PropTypes';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';
import * as Yup from 'yup';

const EditPost: FC = () => {
    const router = useRouter();
    const { shouldRedirect, isLoading: isLoadingAuth } = useAuth({ middleware: 'auth' });
    const { query: { slug: postSlug } } = router;
    const { data: post, error } = useSWR(postSlug ? `/posts/${postSlug}` : null);

    useEffect(() => {
        shouldRedirect && router.push('/login');
    }, [shouldRedirect]);

    return (
        <PortalContainer>
            {(isLoadingAuth || shouldRedirect) && <Loader/>}
            <h1>Edit Post - {post ? `${post.id} - ${post.title}` : <Skeleton baseColor="var(--bg)"/>}</h1>
            <EditPostForm post={post}/>
        </PortalContainer>
    );
};

export default EditPost;

const EditPostForm: FC<EditPostFormProps> = ({ post }) => {
    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            title: Yup.string().required('This field is required'),
            excerpt: Yup.string().required('This field is required'),
            markdown: Yup.string().required('This field is required'),
            banner_image: Yup.mixed().required()
        })),
        mode: 'all'
    });

    useEffect(() => {
        methods.reset({
            title: post?.title,
            excerpt: post?.excerpt,
            markdown: post?.markdown,
            banner: post?.banner
        });
    }, [post]);

    const onSubmit = (formValues: CreatePostFormValues) => {
        console.log(formValues);
    };

    return (
        <FormProvider {...methods}>
            <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                <Input name="title"/>
                <TextArea name="excerpt"/>
                <MarkdownEditor name="markdown"/>
                <button type="submit">submit</button>
            </form>
        </FormProvider>
    );
};