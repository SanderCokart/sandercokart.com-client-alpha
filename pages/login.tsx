import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/Login.module.scss';
import Link from 'next/link';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import Checkbox from '@/components/formComponents/Checkbox';
import Input from '@/components/formComponents/Input';
import type {LoginCredentialsType} from '@/types/AuthProviderTypes';

export const Login: FC = () => {

    const router = useRouter();
    const { login } = useAuth();
    const { query: { user, hash, type, signature, expires } } = router;

    const loginSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(6).max(50).required(),
        remember_me: yup.boolean().required()
    });

    const initialValues = {
        email: '',
        password: '',
        remember_me: false
    };

    const onSubmit = (values: LoginCredentialsType) => {
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

    // document.documentElement.dataset.theme = 'light';

    return (
        <div className={styles.login}>
            <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={onSubmit}>
                {({ isValid, dirty }) => (
                    <Form noValidate className={styles.form}>
                        <div>
                            <header>
                                <h1>Login</h1>
                            </header>
                            <main>
                                <Input autoComplete="email" label="E-Mail" name="email" placeholder="Type you email address"
                                       prependIcon={['fas', 'envelope']}
                                       type="email"/>
                                <Input autoComplete="current-password" label="Password" name="password" placeholder="Type your password"
                                       prependIcon={['fas', 'lock']} type="password"/>
                                <Checkbox label="Remember me" name="remember_me"/>
                                <button disabled={!dirty || !isValid} type="submit">Submit</button>
                            </main>
                        </div>

                        <footer>
                            <div className={styles.links}>
                                <Link href="/password/forgot">
                                    <a>Forgot password?</a>
                                </Link>
                                <Link href="/register">
                                    <a>Don't have an account yet?</a>
                                </Link>
                            </div>
                        </footer>

                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
