import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';
import * as Yup from 'yup';

import {Button} from '@/components/Button';
import File from '@/components/formComponents/File';
import Input from '@/components/formComponents/Input';
import MarkdownEditor from '@/components/formComponents/MarkdownEditor';
import Textarea from '@/components/formComponents/Textarea';
import PortalContainer from '@/components/PortalContainer/PortalContainer';

import {ApiGetArticlesShowRoute} from '@/constants/api-routes';

import axios from '@/functions/shared/axios';

import {useAuth} from '@/providers/AuthProvider';

import type {EditPostFormValues} from '@/types/FormValueTypes';
import type {ArticleModel} from '@/types/ModelTypes';

import styles from '@/styles/pages/portal/posts/EditPost.module.scss';

const EditPost = () => {
    const router = useRouter();
    const slug = router.query.slug as string;
    const { isAdmin } = useAuth();
    const {
        data: post,
        error
    } = useSWR<ArticleModel>((slug && isAdmin) ? ApiGetArticlesShowRoute('posts', slug) : null);

    return (
        <PortalContainer>
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

interface EditPostFormProps {
    post?: ArticleModel;
}

const EditPostForm = ({ post }: EditPostFormProps) => {
    const [loading, setLoading] = useState(true);
    const editArticleForm = useForm<EditPostFormValues>({
        resolver: yupResolver(Yup.object().shape({
            title: Yup.string().required('This field is required'),
            excerpt: Yup.string().required('This field is required'),
            markdown: Yup.string().required('This field is required'),
            banner: Yup.mixed().required('This field is required')
        }))
    });

    useEffect(() => {
        if (post) {
            editArticleForm.reset({
                title: post.title,
                excerpt: post.excerpt,
                markdown: post.markdown,
                banner: [post.banner]
            });
            setLoading(false);
        }
    }, [post]);

    const { formState: { isDirty, isValid }, register, handleSubmit } = editArticleForm;

    const onSubmitEditArticleForm = handleSubmit(async (formValues) => {
        const transformedData = {
            ...formValues,
            banner: formValues.banner[0].id
        };

        await axios.simplePatch(`/articles/posts/${post?.id}`, transformedData);
    });

    return (
        <FormProvider {...editArticleForm}>
            {!loading && (
                <form noValidate className={styles.form} onSubmit={onSubmitEditArticleForm}>
                    <Input label="Title" registerFormHook={{ ...register('title') }}/>
                    <Textarea label="Excerpt" registerFormHook={{ ...register('excerpt') }}/>
                    <File name="banner"/>
                    <MarkdownEditor name="markdown"/>
                    <Button className={styles.submitButton} disabled={!isDirty || !isValid} type="submit">
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </Button>
                </form>
            )}
        </FormProvider>
    );
};

export default EditPost;
EditPost.requireAuth = true;