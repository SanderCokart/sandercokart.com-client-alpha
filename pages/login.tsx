import Input from '@/components/formComponents/Input';
import Loader from '@/components/Loader';
import Checkbox from '@/components/OLDformComponents/Checkbox';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/pages/Login.module.scss';
import type {LoginFormValues} from '@/types/FormValueTypes';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import Link from 'next/link';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {MutableRefObject, useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';

export const Login: FC = () => {
    const router = useRouter();
    const { login, isLoading, shouldRedirect } = useAuth({ middleware: 'guest' });

    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            email: Yup.string().email().required('This field is required'),
            password: Yup.string().required('This field is required'),
            remember_me: Yup.boolean().required('This field is required')
        })),
        mode: 'all',
        defaultValues: {
            email: '',
            password: '',
            remember_me: false
        }
    });
    const [showPasswordAsText, setShowPasswordAsText] = useState(false);


    const togglePasswordVisibility = (ref: MutableRefObject<HTMLInputElement | null>) => {
        if (ref.current) {
            ref.current.type = ref.current.type === 'password' ? 'text' : 'password';
            setShowPasswordAsText(prev => !prev);
        }
    };


    const { query: { user, hash, type, signature, expires } } = router;
    const { formState: { isValid, isDirty }, register } = methods;

    useEffect(() => {
        if (shouldRedirect && !isLoading) router.push('/blog');
    }, [isLoading]);


    if (isLoading || shouldRedirect) return <Loader/>;

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
    };


    return (
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
                            loading={isLoading}
                            placeholder="Enter your email here"
                            prependIcon={{ icon: 'envelope', onClick: undefined }}
                            registerFormHook={{ ...register('email') }}
                            type="text"/>
                        <Input
                            appendIcon={{ icon: showPasswordAsText ? 'eye-slash' : 'eye', onClick: togglePasswordVisibility }}
                            autoComplete="current-password"
                            label="Password"
                            loading={isLoading}
                            placeholder="Type your password here"
                            prependIcon={{ icon: 'lock', onClick: undefined }}
                            registerFormHook={{ ...register('password') }}
                            type="text"/>
                        <Checkbox label="Remember me" name="remember_me"/>
                        <button className={styles.submitButton} disabled={!isDirty || !isValid} type="submit">Submit
                        </button>
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
    );
};

export default Login;