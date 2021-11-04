import Checkbox from '@/components/formComponents/Checkbox';
import Input from '@/components/formComponents/Input';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/Login.module.scss';
import type {LoginPayload} from '@/types/AuthProviderTypes';
import {Form, Formik, useFormikContext} from 'formik';
import Link from 'next/link';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import * as yup from 'yup';

export const Login: FC = () => {

    const router = useRouter();
    const { login } = useAuth();
    const { query: { user, hash, type, signature, expires } } = router;

    const loginSchema = yup.object().shape({
        email: yup.string().email().required('This field is required'),
        password: yup.string().min(6).max(50).required('This field is required'),
        remember_me: yup.boolean().required('This field is required')
    });

    const initialValues = {
        email: '',
        password: '',
        remember_me: false
    };

    const onSubmit = (values: LoginPayload) => {
        login(values).then(({ status }) => {
            if (status === 200)
                switch (type) {
                    case 'verify': {
                        router.push({
                            pathname: `/account/email/verify/${user}/${hash}`,
                            query: { expires, type, signature }
                        });
                        break;
                    }
                    default: {
                        router.push('/blog/recent');
                        return;
                    }
                }
        });
    };

    return (
        <div className={styles.login}>
            <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={onSubmit}>
                <LoginForm/>
            </Formik>
        </div>
    );
};


const LoginForm: FC = () => {
    const { isValid, dirty } = useFormikContext();

    return (
        <Form noValidate className={styles.form}>
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
                <button className={styles.submitButton} disabled={!dirty || !isValid} type="submit">Submit</button>
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

        </Form>
    );
};

export default Login;