import Input from '@/components/formComponents/Input';
import {useApi} from '@/providers/ApiProvider';
import styles from '@/styles/account/Register.module.scss';
import {RegisterPayload} from '@/types/AuthProviderTypes';
import {Form, Formik, useFormikContext} from 'formik';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {useState} from 'react';
import * as yup from 'yup';

const timeout = 5000;

export const CreateAccount: FC = () => {
    const api = useApi();
    const router = useRouter();

    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (formValues: RegisterPayload) => {
        api.post('/register', formValues).then(({ status, data }) => {
            if (status === 200) {
                setSubmitted(true);
                setTimeout((params) => {
                    router.push('/login');
                }, timeout);
            }
        });
    };

    const initialValues: RegisterPayload = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    };


    const registerSchema = yup.object().shape({
        name: yup.string().required('This field is required'),
        email: yup.string().email('Must be a valid email').required('This field is required'),
        password: yup.string().min(8, '').max(50).required('This field is required').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
        ),
        password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('This field is required')
    });

    return (
        <div className={styles.register}>
        <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={onSubmit}>
            {submitted ? <EmailSend/> : <RegisterForm/>}
        </Formik>
        </div>
    );
};

export default CreateAccount;


const RegisterForm: FC = () => {
    const { isValid, dirty } = useFormikContext();
    return (
        <Form noValidate className={styles.form}>
            <header className={styles.header}>
                <h1>Register</h1>
            </header>
            <main className={styles.main}>
                <Input autoComplete="name" label="Full name" name="name"
                       placeholder="Type your full name"
                       prependIcon={['fas', 'user']}/>
                <Input autoComplete="email" name="email" placeholder="Type you email address"
                       prependIcon={['fas', 'envelope']}
                       type="email"/>
                <Input autoComplete="new-password" label="Password" name="password"
                       placeholder="Type your password"
                       prependIcon={['fas', 'lock']} type="password"/>
                <Input autoComplete="new-password" label="Password" name="password_confirmation"
                       placeholder="Type your password again"
                       prependIcon={['fas', 'lock']} type="password"/>
                <button className={styles.submitButton} disabled={!dirty || !isValid} type="submit">
                    Submit
                </button>
            </main>
        </Form>
    );
};

const EmailSend: FC = () => {
    const { values }: { values: RegisterPayload } = useFormikContext();
    return (
        <div>
            <h1>Please verify your email! We sent you an email at {values.email} </h1>
            <p>You will be sent back to the login page in {timeout / 1000} seconds</p>
        </div>
    );
};