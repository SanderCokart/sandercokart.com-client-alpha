import {Button} from '@/components/Button';
import Checkbox from '@/components/formComponents/Checkbox';
import Input from '@/components/formComponents/Input';
import Loader from '@/components/Loader';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/pages/Login.module.scss';
import type {LoginFormValues} from '@/types/FormValueTypes';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import Link from 'next/link';
import {useRouter} from 'next/router';
import type {MutableRefObject} from 'react';
import {useEffect, useState} from 'react';
import {UseFormProps, useFormContext} from 'react-hook-form';
import * as Yup from 'yup';
import CenteredBoxForm from '@/components/CenteredBoxForm';
import {toast} from 'react-toastify';

export const Login = () => {
    const router = useRouter();
    const { login, isLoading: isLoadingAuth, shouldRedirect, user: authUser } = useAuth({ middleware: 'guest' });
    const formOptions: UseFormProps = {
        resolver: yupResolver(Yup.object().shape({
            email: Yup.string().min(5).email().required('This field is required'),
            password: Yup.string().required('This field is required'),
            remember_me: Yup.boolean().required('This field is required')
        })),
        mode: 'all'
    };

    useEffect(() => {
        if (shouldRedirect) router.push('/');
    }, [shouldRedirect]);

    const onSubmit = async (formValues: LoginFormValues) => {
        const { error } = await login(formValues);
        const { query: { user, hash, type, signature, expires } } = router;
        if (error) return toast.error(error.response?.data.message);
        switch (type) {
            case'verify': {
                return router.push({
                    pathname: `/account/email/verify/${user}/${hash}`,
                    query: { expires, type, signature }
                });
            }
            default: {
                return router.push('/');
            }
        }
    };

    const footer = (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <Link href="/password/forgot">
                    <a className={styles.link}>Forgot password?</a>
                </Link>
                <Link href="/register">
                    <a className={styles.link}>Don't have an account yet?</a>
                </Link>
            </div>
        </footer>
    );

    return (
        <>
            {(isLoadingAuth || shouldRedirect) && <Loader/>}

            <CenteredBoxForm footer={footer} formOptions={formOptions} title="Login" onSubmit={onSubmit}>
                <LoginForm/>
            </CenteredBoxForm>
        </>
    );
};

const LoginForm = () => {
    const { formState: { isValid, isDirty }, register } = useFormContext();
    const [showPasswordAsText, setShowPasswordAsText] = useState(false);

    const togglePasswordVisibility = (ref: MutableRefObject<HTMLInputElement | null>) => {
        if (ref.current) {
            ref.current.type = ref.current.type === 'password' ? 'text' : 'password';
            setShowPasswordAsText(prev => !prev);
        }
    };
    return (
        <>
            <Input
                autoComplete="email"
                label="E-Mail"
                placeholder="Enter your email here"
                prependIcon={{ icon: 'envelope', onClick: undefined }}
                registerFormHook={{ ...register('email') }}
                type="text"/>
            <Input
                appendIcon={{
                    icon: showPasswordAsText ? 'eye-slash' : 'eye',
                    onClick: togglePasswordVisibility
                }}
                autoComplete="current-password"
                label="Password"
                placeholder="Type your password here"
                prependIcon={{ icon: 'lock', onClick: undefined }}
                registerFormHook={{ ...register('password') }}
                type="password"/>
            <Checkbox label="Remember me" registerFormHook={{ ...register('remember_me') }}/>

            <Button disabled={!isDirty || !isValid} type="submit">Submit</Button>
        </>
    );
};

export default Login;
