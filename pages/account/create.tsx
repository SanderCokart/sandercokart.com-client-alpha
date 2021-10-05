import styles from '@/styles/CreateAccount.module.scss';
import {useApi} from 'providers/ApiProvider';
import type {FC} from 'react';
import {Form, Formik, FormikValues} from 'formik';
import Input from '@/components/formComponents/Input';
import * as yup from 'yup';
import {useRouter} from 'next/router';


export const CreateAccount: FC = () => {
    const api = useApi();
    const router = useRouter();


    const onSubmit = (values: FormikValues) => {
        api.post('/account/register', values).then(({ status, data }) => {
            if (status === 200)
                router.push('/login');
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
            <Form noValidate className={styles.form}>
                <div>
                    <header>
                        <h1>Register</h1>
                    </header>
                    <main>
                        <Input label="Full name" name="name" placeholder="Type your full name"
                               prependIcon={['fas', 'user']}/>
                        <Input name="email" placeholder="Type you email address" prependIcon={['fas', 'envelope']}
                               type="email"/>
                        <Input label="Password" name="password" placeholder="Type your password"
                               prependIcon={['fas', 'lock']} type="password"/>
                        <Input label="Password" name="password_confirmation" placeholder="Type your password again"
                               prependIcon={['fas', 'lock']} type="password"/>
                        <button type="submit">Submit</button>
                    </main>
                </div>
            </Form>
        </Formik>
    );
};

export default CreateAccount;
