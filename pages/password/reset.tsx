import Input from '@/components/formComponents/Input';
import {handler, useApi} from '@/providers/ApiProvider';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/account/PasswordReset.module.scss';
import {PasswordResetPayload} from '@/types/AuthProviderTypes';
import {Form, Formik, useFormikContext} from 'formik';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import * as yup from 'yup';

export const PasswordReset: FC = () => {
    const router = useRouter();
    const { query } = router; //token and email
    const api = useApi();

    const initialValues = {
        password: '',
        password_confirmation: ''
    };

    const loginSchema = yup.object().shape({
        password: yup.string().min(8, '').max(50).required('This field is required').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
        ),
        password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('This field is required')
    });

    const resetPassword = async (formValues: PasswordResetPayload) => {
        await handler(api.patch('/password/reset', formValues, { params: query }));
    };

    return (
        <div className={styles.reset}>
            <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={resetPassword}>
                <ResetPasswordForm/>
            </Formik>
        </div>
    );
};

export default PasswordReset;


const ResetPasswordForm: FC = () => {
    const { isValid, dirty } = useFormikContext();
    return (
        <Form noValidate className={styles.form}>
            <header className={styles.header}>
                <h1>Reset Password</h1>
            </header>
            <main className={styles.main}>
                <Input autoComplete="new-password" label="New password" name="password"
                       placeholder="Type your new password..."
                       prependIcon={['fas', 'lock']}
                       type="email"/>
                <Input autoComplete="new-password" label="Password confirmation" name="password_confirmation"
                       placeholder="Type your new password again..."
                       prependIcon={['fas', 'lock']} type="password"/>
                <button className={styles.submitButton} disabled={!dirty || !isValid} type="submit">Submit</button>
            </main>
        </Form>
    );
};