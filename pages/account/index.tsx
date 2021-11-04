import Checkbox from '@/components/formComponents/Checkbox';
import Input from '@/components/formComponents/Input';
import Loader from '@/components/Loader';
import {useApi} from '@/providers/ApiProvider';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/account/Account.module.scss';
import {ChangeEmailPayload, ChangePasswordPayload} from '@/types/AuthProviderTypes';
import {Form, Formik, useFormikContext} from 'formik';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import * as yup from 'yup';

export const Account: FC = () => {
    const { logout, isVerified, user, changePassword, changeEmail } = useAuth();
    const router = useRouter();
    const api = useApi();

    if (!user) {
        router.replace('/login');
        return <Loader/>;
    }

    const initialValuesPassword: ChangePasswordPayload = {
        current_password: '',
        password: '',
        password_confirmation: '',
        sign_out_everywhere: true
    };

    const initialValuesEmail: ChangeEmailPayload = {
        email: user?.email
    };

    const onLogout = async () => {
        const { status } = await logout();
        console.log(status);
        status === 200 && router.push('/blog/recent');
    };

    const passwordSchema = yup.object().shape({
        current_password: yup.string().required('This field is required'),
        password: yup.string().min(8, '').max(50).required('This field is required').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
        ),
        password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('This field is required')
    });

    const emailSchema = yup.object().shape({
        email: yup.string().email().required()
    });

    return (
        <div className={styles.account}>
            <Formik initialValues={initialValuesPassword} validationSchema={passwordSchema} onSubmit={changePassword}>
                <PasswordForm/>
            </Formik>

            <Formik initialValues={initialValuesEmail} validationSchema={emailSchema} onSubmit={changeEmail}>
                <EmailForm/>
            </Formik>
            <div className={styles.actions}>
                <button className={styles.logoutButton} onClick={onLogout}>logout</button>
            </div>
        </div>
    );
};

const PasswordForm: FC = () => {
    const { isValid, dirty } = useFormikContext();

    return (
        <Form className={styles.form}>
            <header className={styles.header}>
                <h1>Change password</h1>
            </header>
            <main className={styles.main}>
                <Input autoComplete="current-password" label="Current password" name="current_password"
                       placeholder="Type your current password"
                       type="password"/>
                <Input autoComplete="new-password" label="New password" name="password"
                       placeholder="Type your new password" type="password"/>
                <Input autoComplete="new-password" label="Confirm password" name="password_confirmation"
                       placeholder="Type your new password again"
                       type="password"/>
                <Checkbox label="Sign out on all other devices" name="sign_out_everywhere"/>
                <button disabled={!dirty || !isValid} type="submit">Submit</button>
            </main>
        </Form>
    );
};

const EmailForm: FC = () => {
    const { isValid, dirty } = useFormikContext();

    return (
        <Form className={styles.form}>
            <header className={styles.header}>
                <h1>Change email</h1>
            </header>
            <main className={styles.main}>
                <Input autoComplete="email" label="Email" name="email"/>
                <button disabled={!dirty || !isValid} type="submit">Submit</button>
            </main>
        </Form>
    );
};

export default Account;