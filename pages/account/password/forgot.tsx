import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';

import {Button} from '@/components/Button/Button';
import Input from '@/components/formComponents/Input/Input';
import {DummyLoader} from '@/components/Loader';

import {ApiPostForgotPasswordRoute} from '@/constants/api-routes';

import setFormErrors from '@/functions/client/setFormErrors';
import axios from '@/functions/shared/axios';

import useRedirectSignedInUsers from '@/hooks/useRedirectSignedInUsers';

import CenteredFormLayout from '@/layouts/CenteredFormLayout';

import type {PasswordForgotFormValues} from '@/types/FormValueTypes';

import styles from '@/styles/pages/password/Forgot.module.scss';

export const ForgotPasswordPage = () => {
    const {shouldShowLoadingScreen} = useRedirectSignedInUsers();
    const forgotPasswordForm = useForm<PasswordForgotFormValues>({
        resolver: yupResolver(Yup.object().shape({
            email: Yup.string().email().required('This field is required')
        })),
        mode: 'all'
    });

    const { formState: { isValid, isDirty }, register, handleSubmit, setError } = forgotPasswordForm;

    const onSubmitPasswordForgot = handleSubmit(async (formValues) => {
        const response = await axios.simplePost(ApiPostForgotPasswordRoute, formValues);
        if (response.type === 'form') {
            setFormErrors(setError, response.errors);
            return;
        }
    });

    return (
        <FormProvider {...forgotPasswordForm}>
            <DummyLoader isVisible={shouldShowLoadingScreen} text="Initializing..."/>
            <CenteredFormLayout title="Forgot Password">
                <form noValidate className={styles.form}
                      onSubmit={onSubmitPasswordForgot}>
                    <Input autoComplete="email" label="Email"
                           placeholder="Enter your email address..."
                           registerFormHook={{ ...register('email') }}/>
                    <Button disabled={!isDirty || !isValid} type="submit">Request new password</Button>
                </form>
            </CenteredFormLayout>
        </FormProvider>
    );
};

export default ForgotPasswordPage;
