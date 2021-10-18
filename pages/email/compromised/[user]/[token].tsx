import type {FC} from 'react';
import {Form, Formik, useFormikContext} from 'formik';
import styles from '@/styles/account/password/ChangePassword.module.scss';
import Input from '@/components/formComponents/Input';
import {useRouter} from 'next/router';
import {useApi} from '@/providers/ApiProvider';
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

    const onSubmit = async (values: { password: string, password_confirmation: string }) => {
        try {
            const { data, status } = await api.patch(`/email/compromised/${user}/${token}`, values);
        } catch (err) {
            console.error(err);
        }
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
                <header>
                    <h1>Change password & Email</h1>
                </header>
                <main>
                    <Input autoComplete="email" label="Email" name="email" placeholder="Type your email address" type="email"/>
                    <Input autoComplete="new-password" label="New password" name="password" placeholder="Type your new password" type="password"/>
                    <Input autoComplete="new-password" label="Confirm password" name="password_confirmation"
                           placeholder="Type your new password again"
                           type="password"/>
                    <button disabled={!dirty || !isValid} type="submit">Submit</button>
                </main>
            </div>
        </Form>
    );
};

export default ChangePassword;
