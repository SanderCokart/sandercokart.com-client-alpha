import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';

import BoxContainer from '@/components/BoxContainer';
import {Button} from '@/components/Button/Button';
import Input from '@/components/formComponents/Input/Input';

import {
    ApiPatchChangePasswordRoute,
    ApiPostEmailVerifyRetryRoute,
    ApiPatchEmailChangeRoute
} from '@/constants/api-routes';

import setFormErrors from '@/functions/client/setFormErrors';
import axios from '@/functions/shared/axios';

import {useAuthV2} from '@/providers/AuthProviderV2';

import type {EmailChangeFormValues, PasswordChangeFormValues} from '@/types/FormValueTypes';

import styles from '@/styles/pages/account/Account.module.scss';

const VerificationNotification = () => {
    const requestNewVerificationLink = async () => await axios.simplePost(ApiPostEmailVerifyRetryRoute);

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
    const { logout, isVerified } = useAuthV2();

    return (
        <BoxContainer className={styles.root}>
            {!isVerified && <VerificationNotification/>}
            <div className={styles.forms}>
                <PasswordForm/>
                <EmailForm/>
            </div>
            <div className={styles.actions}>
                <Button fullWidth onClick={logout}>logout</Button>
            </div>
        </BoxContainer>
    );
};

const PasswordForm = () => {
    const { isVerified } = useAuthV2();
    const changePasswordForm = useForm<PasswordChangeFormValues>({
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

    const onSubmitPasswordChange = handleSubmit(async (formValues) => {
        const response = await axios.simplePatch(ApiPatchChangePasswordRoute, formValues);
        if (response.type === 'form') {
            setFormErrors(setError, response.errors);
        }
        reset();
    });

    return (
        <FormProvider {...changePasswordForm}>
            <form noValidate className={styles.form} onSubmit={onSubmitPasswordChange}>

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
    const { user, isVerified, mutate: mutateUser } = useAuthV2();
    const changeEmailForm = useForm<EmailChangeFormValues>({
        resolver: yupResolver(Yup.object().shape({
            email: Yup.string().email().required()
        })),
        mode: 'all',
        defaultValues: {
            email: ''
        }
    });
    const { formState: { isDirty, isValid }, handleSubmit, register, setError, reset } = changeEmailForm;

    const onSubmitEmailChange = handleSubmit(async (formValues) => {
        const response = await axios.simplePatch(ApiPatchEmailChangeRoute, formValues);

        switch (response.type) {
            case 'form':
                setFormErrors(setError, response.errors);
                return;
            case 'success':
                mutateUser((currentData) => ({
                    ...currentData,
                    email_verified_at: null
                }), { revalidate: false });
                return;
        }
    });

    useEffect(() => {
        reset({ email: user?.email });
    }, [user]);

    return (
        <FormProvider {...changeEmailForm}>
            <form noValidate className={styles.form} onSubmit={onSubmitEmailChange}>

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

AccountPage.requireAuth = true;