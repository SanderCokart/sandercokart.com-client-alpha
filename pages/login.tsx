import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/Login.module.scss';
import Link from 'next/link';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {Form, Formik, FormikValues} from 'formik';
import * as yup from 'yup';
import Checkbox from '@/components/formComponents/Checkbox';
import Input from '@/components/formComponents/Input';

export const Login: FC = () => {

    const router = useRouter();
    const { login } = useAuth();
    const { query } = router;

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

    const onSubmit = (values: FormikValues) => {
        console.log(values);
    };

    // document.documentElement.dataset.theme = 'light';

    const options = [
        { key: 'Option 1', value: 'option1' },
        { key: 'Option 2', value: 'option2' },
        { key: 'Option 3', value: 'option3' }
    ];

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={onSubmit}>
            <Form noValidate className={styles.form}>
                <div>
                    <header>
                        <h1>Login</h1>
                    </header>

                    <main>
                        <Input name="email" placeholder="Type you email address" prependIcon={['fas', 'envelope']}
                               type="email"/>
                        <Input label="Password" name="password" placeholder="Type your password"
                               prependIcon={['fas', 'lock']} type="password"/>
                        <Checkbox label="Remember me" name="remember_me"/>
                        <button type="submit">Submit</button>
                    </main>
                </div>

                <footer>
                    <div className={styles.links}>
                        <Link href="/account/password/forgot">
                            <a>Forgot password?</a>
                        </Link>
                        <Link href="/account/create">
                            <a>Don't have an account yet?</a>
                        </Link>
                    </div>
                </footer>

            </Form>
        </Formik>
    );
};

export default Login;
