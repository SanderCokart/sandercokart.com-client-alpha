import styles from '@/styles/account/CreateAccount.module.scss';
import {useApi} from '@/providers/ApiProvider';
import type {FC} from 'react';
import {useState} from 'react';
import {Form, Formik, FormikValues} from 'formik';
import Input from '@/components/formComponents/Input';
import * as yup from 'yup';
import {useRouter} from 'next/router';


export const CreateAccount: FC = () => {
    const api = useApi();
    const router = useRouter();

    const [submitted, setSubmitted] = useState(false);
    const timeout = 5000;

    const onSubmit = (values: FormikValues) => {
        api.post('/register', values).then(({ status, data }) => {
            if (status === 200) {
                setSubmitted(true);
                setTimeout((params) => {
                    router.push('/login');
                }, timeout);
            }
        });
    };

    const initialValues = {
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
        <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={onSubmit}>
            {({ isValid, dirty, values }) => {
                return submitted ? (
                    <div>
                        <h1>Please verify your email! We sent you an email at {values.email} </h1>
                        <p>You will be sent back to the login page in {timeout / 1000} seconds</p>
                    </div>
                ) : (
                    <Form noValidate className={styles.form}>
                        <div>
                            <header>
                                <h1>Register</h1>
                            </header>
                            <main>
                                <Input autoComplete="name" label="Full name" name="name"
                                       placeholder="Type your full name"
                                       prependIcon={['fas', 'user']}/>
                                <Input autoComplete="email" name="email" placeholder="Type you email address"
                                       prependIcon={['fas', 'envelope']}
                                       type="email"/>
                                <Input autoComplete="new-password" label="Password" name="password" placeholder="Type your password"
                                       prependIcon={['fas', 'lock']} type="password"/>
                                <Input autoComplete="new-password" label="Password" name="password_confirmation"
                                       placeholder="Type your password again"
                                       prependIcon={['fas', 'lock']} type="password"/>
                                <button disabled={!dirty || !isValid} type="submit">Submit</button>
                            </main>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default CreateAccount;
