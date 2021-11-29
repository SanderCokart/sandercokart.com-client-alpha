import Error from '@/components/Error';
import File from '@/components/formComponents/File';
import PostForm from '@/components/pages/blog/post/create/PostForm';
import PostPreview from '@/components/pages/blog/post/create/PostPreview';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/pages/blog/post/CreatePost.module.scss';
import {yupResolver} from '@hookform/resolvers/yup';
import 'easymde/dist/easymde.min.css';
import {MDXRemoteSerializeResult} from 'next-mdx-remote';
import type {FC} from 'react';
import {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';
import useMediaQuery from '../../../hooks/useMediaQuery';



interface CompilerPayload {
    error: CompilerError | null;
    mdxSource: MDXRemoteSerializeResult | null;
}

interface CompilerError {
    code: string;
    loc: { line: number, column: number };
    pos: number;
    reasonCode: string;
}

interface State {
    mdxSource: MDXRemoteSerializeResult | null;
    showPreview: boolean;
    error: CompilerError | null;
}

const CreatePostPage: FC = () => {
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
    const [state, setState] = useState<State>({
        mdxSource: null,
        showPreview: false,
        error: null
    });

    const compile = async () => {
        const res = await fetch('/api/compile', { method: 'POST', body: methods.getValues('markdown') });
        return res.json();
    };

    const compilePreview = async () => {
        if (mdUp) {
            const { mdxSource, error }: CompilerPayload = await compile();
            setState(prev => ({ ...prev, mdxSource, error }));
        } else {
            if (!state.showPreview) {
                const { mdxSource, error } = await compile();
                setState(prev => ({ ...prev, error, mdxSource, showPreview: !prev.showPreview }));
            } else setState(prev => ({ ...prev, showPreview: !prev.showPreview }));
        }
    };

    if (!loggedIn) {
        return <Error statusCode={401} title="Unauthorized"/>;
    }

    return (
        <FormProvider {...methods}>
            {mdUp ?
             (
                 <div className={styles.desktop}>
                     <PostForm/>
                     {state.error ? <div className={styles.error}>{state.error.reasonCode}</div> : <PostPreview
                         mdxSource={state.mdxSource}/>}
                 </div>
             )
                  :
             (
                 <div>
                     {!state.showPreview ? <PostForm/>
                                         : state.error ? <div className={styles.error}>{state.error.reasonCode}</div>
                                                       : <PostPreview mdxSource={state.mdxSource}/>}

                 </div>
             )
            }
            <button onClick={compilePreview}>{mdUp ? 'Compile preview' : 'Toggle preview'}</button>
        </FormProvider>
    );
};


export default CreatePostPage;
