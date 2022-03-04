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
import {MutableRefObject, useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';

export const Login = () => {
    const router = useRouter();
    const { login, isLoading: isLoadingAuth, shouldRedirect } = useAuth({ middleware: 'guest' });

    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            email: Yup.string().min(5).email().required('This field is required'),
            password: Yup.string().required('This field is required'),
            remember_me: Yup.boolean().required('This field is required')
        })),
        mode: 'all'
    });
    const [showPasswordAsText, setShowPasswordAsText] = useState(false);

    const togglePasswordVisibility = (ref: MutableRefObject<HTMLInputElement | null>) => {
        if (ref.current) {
            ref.current.type = ref.current.type === 'password' ? 'text' : 'password';
            setShowPasswordAsText(prev => !prev);
        }
    };

    const { query: { user, hash, type, signature, expires } } = router;
    const { formState: { isValid, isDirty }, register, setError } = methods;

    useEffect(() => {
        if (shouldRedirect) router.push('/blog');
    }, [shouldRedirect]);

    const onSubmit = async (formValues: LoginFormValues) => {
        const { error } = await login(formValues);
        if (!error)
            switch (type) {
                case'verify': {
                    router.push({
                        pathname: `/account/email/verify/${user}/${hash}`,
                        query: { expires, type, signature }
                    });
                    break;
                }
                default: {
                    router.push('/blog');
                    break;
                }
            }
        else if (error) {
            if (error.response) {
                const errorKeys = Object.keys(error.response.data.errors);
                errorKeys.forEach((key: any) => {
                    setError(key, { type: 'manual', message: error.response?.data.errors[key][0] });
                });
            } else {
                console.log('other error');
            }
        }
    };

    return (
        <>
            {(isLoadingAuth || shouldRedirect) && <Loader/>}

            <div className={styles.login}>
                <FormProvider {...methods}>
                    <form noValidate className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
                        <header className={styles.header}>
                            <h1>Login</h1>
                        </header>
                        <main className={styles.main}>
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
                        </main>

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

                    </form>
                </FormProvider>
            </div>
        </>
    );
};

export default Login;
