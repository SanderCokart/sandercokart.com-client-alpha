import Error from '@/components/Error';
import File from '@/components/formComponents/File';
import Input from '@/components/formComponents/Input';
import TextArea from '@/components/formComponents/TextArea';
import {handler, useApi} from '@/providers/ApiProvider';
import {useAuth} from '@/providers/AuthProvider';
import editorStyles from '@/styles/components/Editor.module.scss';
import styles from '@/styles/pages/blog/post/CreatePost.module.scss';
import {CreatePostFormValues} from '@/types/FormValueTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {yupResolver} from '@hookform/resolvers/yup';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import type {FC} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import * as Yup from 'yup';
import useMDEOptions from '../../../hooks/useMDEOptions';
import useMediaQuery from '../../../hooks/useMediaQuery';

const CreatePostPage: FC = () => {
    const { loggedIn } = useAuth();
    const api = useApi();
    const mdUp = useMediaQuery({ from: 'md', option: 'up' });
    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            title: Yup.string().required('This field is required'),
            markdown: Yup.string().required('This field is required'),
            excerpt: Yup.string().required('This field is required'),
            banner_image: Yup.mixed().required()
        })),
        mode: 'all',
        defaultValues: {
            title: '',
            excerpt: '',
            markdown: '',
            banner_image: []
        }
    });

    // const [simpleMdeInstance, setMdeInstance] = useState<SimpleMDEReactProps | null>(null);
    // const getMdeInstanceCallback = useCallback((SimpleMDE) => {
    //     setMdeInstance(SimpleMDE);
    // }, []);
    //
    // useEffect(() => {
    //     simpleMdeInstance &&
    //     console.info('Hey I\'m editor instance!', simpleMdeInstance);
    // }, [simpleMdeInstance]);

    if (!loggedIn) {
        return <Error statusCode={401} title="Unauthorized"/>;
    }

    const { handleSubmit } = methods;

    const submitPost = async (formValues: CreatePostFormValues) => {
        const { data } = await handler(api.post('/posts', formValues));
        console.log(data);
    };


    return (
        <main className={styles.desktop}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(submitPost)}>
                    <Input label="Title" name="title"/>
                    <TextArea label="Excerpt" name="excerpt"/>
                    <File name="banner_image"/>
                    <Editor/>
                    <button className={styles.submit} type="submit">
                        <FontAwesomeIcon icon="plus"/>
                    </button>
                </form>
            </FormProvider>
        </main>
    );
};


export default CreatePostPage;

const Editor: FC = () => {
    const SimpleMDE = dynamic(() => import('react-simplemde-editor'));
    const MDEOptions = useMDEOptions();

    const { setValue, getValues } = useFormContext();

    const onChange = (text: string) => {
        setValue('markdown', text);
    };

    const value = getValues('markdown');

    return (
        <div className={editorStyles.view}>
            <SimpleMDE options={MDEOptions} style={{ backgroundColor: 'white' }} value={value} onChange={onChange}/>
        </div>
    );
};