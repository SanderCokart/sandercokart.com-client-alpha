import Checkbox from '@/components/formComponents/Checkbox';
import Input from '@/components/formComponents/Input';
import {handler, useApi} from '@/providers/ApiProvider';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/account/Account.module.scss';
import {EmailChangePayload, PasswordChangePayload} from '@/types/AuthProviderTypes';
import {yupResolver} from '@hookform/resolvers/yup';
import Error from 'next/error';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';

export const Account: FC = () => {
    const { isVerified, logout, user } = useAuth();
    const router = useRouter();

    if (!user) {
        return <Error statusCode={404}/>;
    }


    const onLogout = async () => {
        const { status } = await logout();
        status === 200 && await router.push('/blog/recent');
    };


    return (
        <div className={styles.account}>
            <PasswordForm/>
            <EmailForm/>
            <div className={styles.actions}>
                <button className={styles.logoutButton} onClick={onLogout}>logout</button>
            </div>
        </div>
    );
};

const PasswordForm: FC = () => {
    const api = useApi();
    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            current_password: Yup.string().required('This field is required'),
            password: Yup.string().min(8, '').max(50).required('This field is required').matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
            ),
            password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('This field is required')
        })),
        mode: 'all',
        defaultValues: {
            current_password: '',
            password: '',
            password_confirmation: '',
            sign_out_everywhere: true
        }
    });


    const changePassword = async (formValues: PasswordChangePayload) => {
        await handler(api.patch('/account/password/change', formValues));
    };

    const { formState: { isDirty, isValid }, handleSubmit } = methods;

    return (
        <FormProvider {...methods}>
            <form noValidate className={styles.form} onSubmit={handleSubmit(changePassword)}>
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
                    <button disabled={!isDirty || !isValid} type="submit">Submit</button>
                </main>
            </form>
        </FormProvider>
    );
};

const EmailForm: FC = () => {
    const api = useApi();
    const { user } = useAuth();

    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            email: Yup.string().email().required()
        })),
        mode: 'all',
        defaultValues: {
            email: user?.email
        }
    });

    const changeEmail = async (formValues: EmailChangePayload) => {
        await handler(api.patch(`/account/email/change/${user?.id}`, formValues));
    };

    const { formState: { isDirty, isValid }, handleSubmit } = methods;

    return (
        <FormProvider {...methods}>
            <form noValidate className={styles.form} onSubmit={handleSubmit(changeEmail)}>
                <header className={styles.header}>
                    <h1>Change email</h1>
                </header>
                <main className={styles.main}>
                    <Input autoComplete="email" label="Email" name="email"/>
                    <button disabled={!isDirty || !isValid} type="submit">Submit</button>
                </main>
            </form>
        </FormProvider>
    );
};

export default Account;