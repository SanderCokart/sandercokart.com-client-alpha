import useMediaQuery from '@/hooks/useMediaQuery';
import {useAuth} from '@/providers/AuthProvider';
import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';

const CreatePostPage: FC = () => {
    const { shouldRedirect, isLoading: isLoadingAuth } = useAuth({ middleware: 'auth' });
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
    const router = useRouter();

    useEffect(() => {
        if (shouldRedirect) router.push('/login');
    }, []);

    return (
        <>
        </>
    );

};

export default CreatePostPage;