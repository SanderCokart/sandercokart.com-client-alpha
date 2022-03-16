import {Button} from '@/components/Button';
import Input from '@/components/formComponents/Input';
import Loader from '@/components/Loader';
import axios from '@/functions/shared/axios';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/pages/account/Account.module.scss';
import type {EmailChangeFormValues, PasswordChangeFormValues} from '@/types/FormValueTypes';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {toast} from 'react-toastify';

export const AccountPage = () => {
    const { logout, shouldRedirect, isLoading } = useAuth({ middleware: 'auth' });
    const router = useRouter();


    useEffect(() => {
        if (shouldRedirect) router.push('/login');
    }, [shouldRedirect]);

    if (isLoading || shouldRedirect) return <Loader/>;

    const onClickLogout = async () => {
        const { status } = await logout();
        status === 200 && await router.push('/');
    };


    return (
        <div className={styles.account}>
            <PasswordForm/>
            <EmailForm/>
            <div className={styles.actions}>
                <Button onClick={onClickLogout}>logout</Button>
            </div>
        </div>
    );
};

const PasswordForm = () => {
    const changePasswordForm = useForm({
        resolver: yupResolver(Yup.object().shape({
            current_password: Yup.string().required('This field is required'),
            password: Yup.string().min(8).max(50).required('This field is required')
                .matches(/[a-z]/, 'must contain a lower case character')
                .matches(/[A-Z]/, 'must contain an upper case character')
                .matches(/[0-9]/, 'must contain a number')
                .matches(/[!@#$%^&*]/, 'must contain a special case character'),
            password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('This field is required')
        })),
        mode: 'all'
    });


    const onSubmitPasswordChange = async (formValues: PasswordChangeFormValues) => {
        await axios.simplePatch('/account/password/change', formValues);
    };

    const { formState: { isDirty, isValid }, handleSubmit, register } = changePasswordForm;

    return (
        <FormProvider {...changePasswordForm}>
            <form noValidate className={styles.form} onSubmit={handleSubmit(onSubmitPasswordChange)}>
                <header className={styles.header}>
                    <h1>Change password</h1>
                </header>
                <main className={styles.main}>
                    <Input autoComplete="current-password" label="Current password"
                           placeholder="Type your current password"
                           registerFormHook={{ ...register('current_password') }}
                           type="password"/>
                    <Input autoComplete="new-password" label="New password" placeholder="Type your new password"
                           registerFormHook={{ ...register('password') }} type="password"/>
                    <Input autoComplete="new-password" label="Confirm password"
                           placeholder="Type your new password again"
                           registerFormHook={{ ...register('password_confirmation') }}
                           type="password"/>
                    <Button disabled={!isDirty || !isValid} type="submit">Submit</Button>
                </main>
            </form>
        </FormProvider>
    );
};

const EmailForm = () => {
    const { user } = useAuth();

    const changeEmailForm = useForm({
        resolver: yupResolver(Yup.object().shape({
            email: Yup.string().email().required()
        })),
        mode: 'all',
        defaultValues: {
            email: user?.email
        }
    });
    const { formState: { isDirty, isValid }, handleSubmit, register, setError } = changeEmailForm;

    const onSubmitEmailChange = async (formValues: EmailChangeFormValues) => {
        const { error, status, data } = await axios.simplePatch(`/account/email/change/${user?.id}`, formValues);
        if (status !== 200) {
            if (error?.response?.data?.errors)
                setError('email', {
                    type: 'manual',
                    message: error.response.data.errors?.['email'][0]
                });
            return;
        }

        console.log(data);
    };


    return (
        <FormProvider {...changeEmailForm}>
            <form noValidate className={styles.form} onSubmit={handleSubmit(onSubmitEmailChange)}>
                <header className={styles.header}>
                    <h1>Change email</h1>
                </header>
                <main className={styles.main}>
                    <Input autoComplete="email" label="Email" registerFormHook={{ ...register('email') }}/>
                    <Button disabled={!isDirty || !isValid} type="submit">Submit</Button>
                </main>
            </form>
        </FormProvider>
    );
};

export default AccountPage;