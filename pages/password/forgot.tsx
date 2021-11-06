import Input from '@/components/formComponents/Input';
import {handler, useApi} from '@/providers/ApiProvider';
import styles from '@/styles/account/PasswordForgot.module.scss';
import {PasswordForgotPayload} from '@/types/AuthProviderTypes';
import {Form, Formik, useFormikContext} from 'formik';
import type {FC} from 'react';
import * as yup from 'yup';

export const PasswordForgot: FC = () => {
    const api = useApi();

    const requestPasswordReset = async (formValues: PasswordForgotPayload) => {
        await handler(api.post('/password/request', formValues));
    };

    const forgotSchema = yup.object().shape({
        email: yup.string().email().required('This field is required')
    });

    const initialValues = { email: '' };

    return (
        <div className={styles.forgot}>
            <Formik initialValues={initialValues}
                    validationSchema={forgotSchema}
                    onSubmit={requestPasswordReset}>
                <ForgotForm/>
            </Formik>
        </div>
    );
};

const ForgotForm: FC = () => {
    const { isValid, dirty } = useFormikContext();
    return (
        <Form noValidate className={styles.form}>
            <header className={styles.header}>
                <h1>Forgot Password</h1>
            </header>
            <main className={styles.main}>
                <Input name="email" placeholder="Enter your email..."/>
                <button className={styles.submitButton} disabled={!dirty || !isValid} type="submit">Request new
                    password
                </button>
            </main>
        </Form>
    );
};

export default PasswordForgot;
