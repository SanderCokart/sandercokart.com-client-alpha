import {faPaperPlane, faPen} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';

import FAB from '@/components/FAB';
import File from '@/components/formComponents/File';
import Input from '@/components/formComponents/Input';
import MarkdownEditor from '@/components/formComponents/MarkdownEditor';
import Switch from '@/components/formComponents/Switch';
import Textarea from '@/components/formComponents/Textarea';
import PortalContainer from '@/components/PortalContainer/PortalContainer';

import {ApiPostArticlesStoreRoute} from '@/constants/api-routes';

import axios from '@/functions/shared/axios';

import type {CreatePostFormValues} from '@/types/FormValueTypes';

import styles from '@/styles/pages/portal/posts/CreatePost.module.scss';

const CreatePostPage = () => {
    const createPostForm = useForm<CreatePostFormValues>({
        resolver: yupResolver(Yup.object().shape({
            title: Yup.string().required('This field is required'),
            markdown: Yup.string().required('This field is required'),
            excerpt: Yup.string().required('This field is required'),
            banner: Yup.mixed().required('This field is required'),
            published: Yup.boolean().required('This field is required')
        })),
        mode: 'all',
        defaultValues: {
            banner: [],
            excerpt: '',
            markdown: '',
            title: '',
            published: false
        }
    });

    const { handleSubmit, register } = createPostForm;

    const onSubmit = handleSubmit(async (formValues) => {
        await axios.simplePost(ApiPostArticlesStoreRoute('posts'),
            { ...formValues, article_banner_id: formValues.banner[0].id });
    });

    return (
        <>
            <PortalContainer className={styles.desktop}>
                <FormProvider {...createPostForm}>
                    <form noValidate className={styles.form} onSubmit={onSubmit}>
                        <div className={styles.inputsContainer}>
                            <div className={styles.inputs}>
                                <Input label="Title" name="title" registerFormHook={register('title')}/>
                                <Textarea autogrow={false} className={styles.excerpt} label="Excerpt" name="excerpt"
                                          registerFormHook={register('excerpt')}/>
                                <Switch icons={{
                                    type: 'different',
                                    off: <FontAwesomeIcon icon={faPen}/>,
                                    on: <FontAwesomeIcon icon={faPaperPlane}/>
                                }}
                                        label="Published"
                                        registerFormHook={register('published')}/>
                            </div>
                            <File className={styles.filesContainer} name="banner"/>
                        </div>
                        <MarkdownEditor registerFormHook={register('markdown')}/>
                        <FAB bottom={16}
                             icon={<FontAwesomeIcon fixedWidth icon={faPaperPlane}/>}
                             right={16}
                             size={42}
                             type="submit"/>
                    </form>
                </FormProvider>
            </PortalContainer>
        </>
    );

};

export default CreatePostPage;
CreatePostPage.requireAuth = true;