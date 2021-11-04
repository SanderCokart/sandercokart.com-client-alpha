import Input from '@/components/formComponents/Input';
import {handler, useApi} from '@/providers/ApiProvider';
import styles from '@/styles/account/password/ChangePassword.module.scss';
import {EmailCompromisedPayload} from '@/types/AuthProviderTypes';
import {Form, Formik, useFormikContext} from 'formik';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import * as yup from 'yup';

const ChangePassword: FC = () => {
    const router = useRouter();
    const api = useApi();

    const { query: { user, token } } = router;

    const initialValues = {
        password: '',
        password_confirmation: ''
    };

    const changePasswordSchema = yup.object().shape({
        email: yup.string().email('Must be a valid email').required('This field is required'),
        password: yup.string().min(8, '').max(50).required('This field is required').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
        ),
        password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('This field is required')
    });

    const onSubmit = async (formValues: EmailCompromisedPayload) => {
        await handler(api.patch(`/email/compromised/${user}/${token}`, formValues));
    };

    return (
        <div className={styles.changePassword}>
            <Formik initialValues={initialValues} validationSchema={changePasswordSchema} onSubmit={onSubmit}>
                <ChangeEmailAndPasswordForm/>
            </Formik>
        </div>
    );
};

const ChangeEmailAndPasswordForm: FC = () => {
    const { isValid, dirty } = useFormikContext();

    return (
        <Form className={styles.form}>
            <div>
                <header className={styles.header}>
                    <h1>Change password & Email</h1>
                </header>
                <main className={styles.main}>
                    <Input autoComplete="email" label="Email" name="email" placeholder="Type your email address"
                           type="email"/>
                    <Input autoComplete="new-password" label="New password" name="password"
                           placeholder="Type your new password" type="password"/>
                    <Input autoComplete="new-password" label="Confirm password" name="password_confirmation"
                           placeholder="Type your new password again"
                           type="password"/>
                    <button className={styles.submitButton} disabled={!dirty || !isValid} type="submit">
                        Submit
                    </button>
                </main>
            </div>
        </Form>
    );
};

export default ChangePassword;
