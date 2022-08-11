import Loader from '@/components/Loader/Loader';
import styles from '@/styles/pages/portal/posts/CreatePost.module.scss';
import {CreatePostFormValues} from '@/types/FormValueTypes';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';
import useAuthPage from '@/hooks/useAuthPage';
import NewMarkdownEditor from '@/components/formComponents/MarkdownEditor/NewMarkdownEditor';
import Input from '@/components/formComponents/Input';
import Textarea from '@/components/formComponents/Textarea';
import File from '@/components/formComponents/File';
import PortalContainer from '@/components/PortalContainer/PortalContainer';
import FAB from '@/components/FAB';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


const CreatePostPage = () => {
    const visible = useAuthPage();
    const createPostForm = useForm<CreatePostFormValues>({
        resolver: yupResolver(Yup.object().shape({
            // title: Yup.string().required('This field is required'),
            // markdown: Yup.string().required('This field is required'),
            // excerpt: Yup.string().required('This field is required'),
            // banner: Yup.mixed().required(),
        })),
        mode: 'all',
        defaultValues: {
            banner: [],
            excerpt: '',
            markdown: '',
            title: ''
        }
    });

    const { handleSubmit, register } = createPostForm;

    const onSubmit = handleSubmit(async (formValues) => {
        alert(formValues.markdown);
        // await axios.simplePost('/posts', { ...formValues, banner: formValues.banner[0].id });
    });

    return (
        <>
            <Loader visible={visible}/>
            <PortalContainer className={styles.desktop}>
                <FormProvider {...createPostForm}>
                    <form noValidate className={styles.form} onSubmit={onSubmit}>
                        <div className={styles.inputsContainer}>
                            <div className={styles.inputs}>
                                <Input label="Title" name="title" registerFormHook={register('title')}/>
                                <Textarea autogrow={false} className={styles.excerpt} label="Excerpt" name="excerpt"
                                          registerFormHook={register('excerpt')}/>
                            </div>
                            <File className={styles.filesContainer} name="banner"/>
                        </div>
                        <NewMarkdownEditor registerFormHook={register('markdown')}/>
                        <FAB bottom={16}
                             icon={<FontAwesomeIcon fixedWidth icon="paper-plane"/>}
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