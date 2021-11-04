import Input from '@/components/formComponents/Input';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/account/PasswordForgot.module.scss';
import {ForgotPasswordPayload} from '@/types/AuthProviderTypes';
import {Form, Formik, useFormikContext} from 'formik';
import type {FC} from 'react';
import {useState} from 'react';
import * as yup from 'yup';

export const PasswordForgot: FC = () => {
    const { requestPasswordReset } = useAuth();
    const onSubmit = (values: ForgotPasswordPayload) => {
        requestPasswordReset(values);
    };
    const [state, setState] = useState({
        email: ''
    });

    const forgotSchema = yup.object().shape({
        email: yup.string().email().required('This field is required')
    });

    return (
        <div className={styles.forgot}>
            <Formik initialValues={state}
                    validationSchema={forgotSchema}
                    onSubmit={onSubmit}>
                <ForgotForm/>
            </Formik>
        </div>
    );
};

export default PasswordForgot;


const ForgotForm: FC = () => {
    const { isValid, dirty } = useFormikContext();
    return (
        <Form noValidate className={styles.form}>
            <header className={styles.header}>
                <h1>Forgot Password</h1>
            </header>
            <main className={styles.main}>
                <Input name="email" placeholder="Enter your email..."/>
                <button className={styles.submitButton} type="submit">Request new password</button>
            </main>
        </Form>
    );
};