import Checkbox from '../lib/components/formComponents/Checkbox';
import Input from '../lib/components/formComponents/Input';
import {useAuth} from '../lib/providers/AuthProvider';
import styles from '@/styles/pages/Login.module.scss';
import type {LoginPayload} from '@/types/AuthProviderTypes';
import {yupResolver} from '@hookform/resolvers/yup';
import Link from 'next/link';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';

export const Login: FC = () => {

    const router = useRouter();
    const { login } = useAuth();
    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            email: Yup.string().email().required('This field is required'),
            password: Yup.string().min(6).max(50).required('This field is required'),
            remember_me: Yup.boolean().required('This field is required')
        })),
        mode: 'all',
        defaultValues: {
            email: '',
            password: '',
            remember_me: false
        }
    });

    const { query: { user, hash, type, signature, expires } } = router;
    const { formState: { isValid, isDirty } } = methods;

    const onSubmit = async (formValues: LoginPayload) => {
        const { status } = await login(formValues);
        if (status === 200) {
            switch (type) {
                case 'verify': {
                    router.push({
                        pathname: `/account/email/verify/${user}/${hash}`,
                        query: { expires, type, signature }
                    });
                    break;
                }
                default: {
                    router.push('/blog');
                    return;
                }
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
                        <Input autoComplete="email" label="E-Mail" name="email" placeholder="Type you email address"
                               prependIcon={['fas', 'envelope']}
                               type="email"/>
                        <Input autoComplete="current-password" label="Password" name="password"
                               placeholder="Type your password"
                               prependIcon={['fas', 'lock']} type="password"/>
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