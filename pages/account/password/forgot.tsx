import Input from '@/components/formComponents/Input/Input';
import axios from '@/functions/shared/axios';
import styles from '@/styles/pages/password/Forgot.module.scss';
import type {PasswordForgotFormValues} from '@/types/FormValueTypes';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';
import setFormErrors from '@/functions/client/setFormErrors';
import CenteredFormLayout from '@/layouts/CenteredFormLayout';
import {Button} from '@/components/Button/Button';
import {ApiPasswordForgotRoute} from '@/constants/api-routes';

export const ForgotPasswordPage = () => {
    const forgotPasswordForm = useForm({
        resolver: yupResolver(Yup.object().shape({
            email: Yup.string().email().required('This field is required')
        })),
        mode: 'all'
    });

    const { formState: { isValid, isDirty }, register, setError } = forgotPasswordForm;

    const onSubmitPasswordForgot = async (formValues: PasswordForgotFormValues) => {
        const response = await axios.simplePost(ApiPasswordForgotRoute, formValues);
        if (response.type === 'form') {
            setFormErrors(setError, response.errors);
            return;
        }
    };

    return (
        <FormProvider {...forgotPasswordForm}>
            <CenteredFormLayout title="Forgot Password">
                <form noValidate className={styles.form}
                      onSubmit={forgotPasswordForm.handleSubmit(onSubmitPasswordForgot)}>
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
