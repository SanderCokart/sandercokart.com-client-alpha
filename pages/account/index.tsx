import {Button} from '@/components/Button/Button';
import Input from '@/components/formComponents/Input/Input';
import Loader from '@/components/Loader/Loader';
import axios from '@/functions/shared/axios';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/pages/account/Account.module.scss';
import type {EmailChangeFormValues, PasswordChangeFormValues} from '@/types/FormValueTypes';
import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';
import setFormErrors from '@/functions/client/setFormErrors';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import BoxContainer from '@/components/BoxContainer';
import {ApiPasswordChangeRoute} from '@/constants/api-routes';
import useAuthPage from '@/hooks/useAuthPage';
import {useEffect} from 'react';

const VerificationNotification = () => {
    const requestNewVerificationLink = async () => await axios.simplePost('/account/email/verify/retry');

    return (
        <>
            <h1 className={styles.verificationNotification}>Please verify your email to gain access too all
                features</h1>
            <Button fullWidth onClick={requestNewVerificationLink}>Request New Verification Link</Button>
        </>
    );
};

const BlockedFeature = () => {
    return <div className={styles.blocked}>
        <FontAwesomeIcon fixedWidth className={styles.blockedIcon} icon="lock"/>
    </div>;
};

export const AccountPage = () => {
    const { logout, isVerified } = useAuth({ middleware: 'auth' });
    const router = useRouter();
    const visible = useAuthPage();


    const onClickLogout = async () => {
        const response = await logout();
        if (response.type === 'success') {
            router.push('/');
        }
    };


    return (
        <BoxContainer className={styles.root}>
            {!isVerified && <VerificationNotification/>}
            <Loader visible={visible}/>
            <div className={styles.forms}>
                <PasswordForm/>
                <EmailForm/>
            </div>
            <div className={styles.actions}>
                <Button fullWidth onClick={onClickLogout}>logout</Button>
            </div>
        </BoxContainer>
    );
};


const PasswordForm = () => {
    const { isVerified } = useAuth();
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
        mode: 'all',
        defaultValues: {
            current_password: '',
            password: '',
            password_confirmation: ''
        }
    });
    const { formState: { isDirty, isValid }, handleSubmit, register, setError, reset } = changePasswordForm;


    const onSubmitPasswordChange = async (formValues: PasswordChangeFormValues) => {
        const response = await axios.simplePatch(ApiPasswordChangeRoute, formValues);
        if (response.type === 'form') {
            setFormErrors(setError, response.errors);
        }
        reset();
    };

    return (
        <FormProvider {...changePasswordForm}>
            <form noValidate className={styles.form} onSubmit={handleSubmit(onSubmitPasswordChange)}>

                {!isVerified && <BlockedFeature/>}

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
    const { user, isVerified } = useAuth();
    const changeEmailForm = useForm({
        resolver: yupResolver(Yup.object().shape({
            email: Yup.string().email().required()
        })),
        mode: 'all',
        defaultValues: {
            email: ''
        }
    });
    const { formState: { isDirty, isValid }, handleSubmit, register, setError, reset } = changeEmailForm;

    const onSubmitEmailChange = async (formValues: EmailChangeFormValues) => {
        const response = await axios.simplePatch(`/account/email/change`, formValues);
        if (response.type === 'form') {
            setFormErrors(setError, response.errors);
            return;
        }
    };

    useEffect(() => {
        reset({ email: user?.email });
    }, [user]);

    return (
        <FormProvider {...changeEmailForm}>
            <form noValidate className={styles.form} onSubmit={handleSubmit(onSubmitEmailChange)}>

                {!isVerified && <BlockedFeature/>}

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