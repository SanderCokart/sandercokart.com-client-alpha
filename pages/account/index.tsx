import {useAuth} from '@/providers/AuthProvider';
import type {FC} from 'react';
import {Form, Formik, useFormikContext} from 'formik';
import Input from '@/components/formComponents/Input';
import styles from '@/styles/account/Account.module.scss';
import {useApi} from '@/providers/ApiProvider';
import {useRouter} from 'next/router';
import Checkbox from '@/components/formComponents/Checkbox';
import * as yup from 'yup';

interface PasswordType {
    current_password: string,
    password: string,
    password_confirmation: string,
    sign_out_everywhere: boolean,
}

interface EmailType {
    email: string;
}

export const Account: FC = () => {
    const { logout, isVerified, user: { email, id: userId } } = useAuth();
    const router = useRouter();
    const api = useApi();

    const initialValuesPassword: PasswordType = {
        current_password: '',
        password: '',
        password_confirmation: '',
        sign_out_everywhere: true
    };

    const initialValuesEmail: EmailType = {
        email: email
    };

    const onLogout = () => {
        logout();
        router.push('/blog/recent');
    };

    const onPasswordSubmit = async (values: PasswordType) => {
        try {
            const { data } = await api.patch('/account/password/change', values);
        } catch (err) {
            console.error(err);
        }
    };

    const onEmailSubmit = async (values: EmailType) => {
        try {
            const { data } = await api.patch(`/account/email/change/${userId}`, values);
        } catch (err) {
            console.error(err);
        }
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
            <Formik initialValues={initialValuesPassword} validationSchema={passwordSchema} onSubmit={onPasswordSubmit}>
                <PasswordForm/>
            </Formik>

            <Formik initialValues={initialValuesEmail} validationSchema={emailSchema} onSubmit={onEmailSubmit}>
                <EmailForm/>
            </Formik>
            <button onClick={onLogout}>logout</button>
        </div>
    );
};

const PasswordForm: FC = () => {
    const { isValid, dirty } = useFormikContext();

    return (
        <Form className={styles.form}>
            <div>
                <header>
                    <h1>Change password</h1>
                </header>
                <main>
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
            </div>
        </Form>
    );
};

const EmailForm: FC = () => {
    const { isValid, dirty } = useFormikContext();

    return (
        <Form className={styles.form}>
            <div>
                <header>
                    <h1>Change email</h1>
                </header>
                <main>
                    <Input autoComplete="email" label="Email" name="email"/>
                    <button disabled={!dirty || !isValid} type="submit">Submit</button>
                </main>
            </div>
        </Form>
    );
};

export default Account;
