import Error from '@/components/Error';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/pages/blog/post/CreatePost.module.scss';
import {yupResolver} from '@hookform/resolvers/yup';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import type {ComponentType, FC, RefAttributes} from 'react';
import {useCallback, useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {SimpleMDEReactProps} from 'react-simplemde-editor';
import * as Yup from 'yup';
import MDEOptions from '../../../data/MDEOptions';
import useMediaQuery from '../../../hooks/useMediaQuery';

const CreatePostPage: FC = () => {
    const SimpleMDE = dynamic(() => import('react-simplemde-editor'));

    const { loggedIn } = useAuth();
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
    const [simpleMdeInstance, setMdeInstance] = useState<SimpleMDEReactProps | null>(null);
    const getMdeInstanceCallback = useCallback((SimpleMDE) => {
        setMdeInstance(SimpleMDE);
    }, []);

    useEffect(() => {
        simpleMdeInstance &&
        console.info('Hey I\'m editor instance!', simpleMdeInstance);
    }, [simpleMdeInstance]);

    if (!loggedIn) {
        return <Error statusCode={401} title="Unauthorized"/>;
    }



    return (
        <FormProvider {...methods}>
            {mdUp ? <DesktopView Editor={SimpleMDE}/>
                  :
             <MobileView Editor={SimpleMDE}/>}
        </FormProvider>
    );
};


export default CreatePostPage;

const DesktopView: FC<{ Editor: ComponentType<SimpleMDEReactProps & RefAttributes<HTMLDivElement>> }> = ({ Editor }) => {
    return (
        <div className={styles.desktop}>
            <Editor options={MDEOptions} style={{ backgroundColor: 'white' }}/>
        </div>
    );
};


const MobileView: FC<{ Editor: ComponentType<SimpleMDEReactProps & RefAttributes<HTMLDivElement>> }> = ({ Editor }) => {
    return (
        <div className={styles.mobile}>
            <Editor options={MDEOptions} style={{ backgroundColor: 'white' }}/>
        </div>
    );
};