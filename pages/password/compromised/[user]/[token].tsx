import type {FC} from 'react';
import {Form, Formik, useFormikContext} from 'formik';
import styles from '@/styles/pages/account/password/ChangePassword.module.scss';
import Input from '../../../../lib/components/formComponents/Input';
import {useRouter} from 'next/router';
import {useApi} from '../../../../lib/providers/ApiProvider';
import * as yup from 'yup';

interface ChangePasswordForm {
    password: string,
    password_confirmation: string
}

const ChangePassword: FC = () => {
    const router = useRouter();
    const api = useApi();

    const { query: { user, token } } = router;

    const initialValues = {
        password: '',
        password_confirmation: ''
    };

    const changePasswordSchema = yup.object().shape({
        password: yup.string().min(8, '').max(50).required('This field is required').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
        ),
        password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('This field is required')
    });

    const onSubmit = (formValues: ChangePasswordForm) => {
        try {
            api.patch(`/password/compromised/${user}/${token}`, formValues);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.changePassword}>
            <Formik initialValues={initialValues} validationSchema={changePasswordSchema} onSubmit={onSubmit}>
                <ChangePasswordForm/>
            </Formik>
        </div>
    );
};

const ChangePasswordForm: FC = () => {
    const { isValid, dirty } = useFormikContext();

    return (
        <Form className={styles.form}>
            <div>
                <header>
                    <h1>Change password</h1>
                </header>
                <main>
                    <Input label="New password" name="password" placeholder="Type your new password" type="password"/>
                    <Input label="Confirm password" name="password_confirmation"
                           placeholder="Type your new password again"
                           type="password"/>
                    <button disabled={!dirty || !isValid} type="submit">Submit</button>
                </main>
            </div>
        </Form>
    );
};

export default ChangePassword;
