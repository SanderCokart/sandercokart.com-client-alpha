import Input from '@/components/formComponents/Input';
import axios from '@/functions/shared/axios';
import styles from '@/styles/pages/account/PasswordForgot.module.scss';
import type {PasswordForgotFormValues} from '@/types/FormValueTypes';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {toast} from 'react-toastify';

export const ForgotPasswordPage = () => {
    const forgotPasswordForm = useForm({
        resolver: yupResolver(Yup.object().shape({
            email: Yup.string().email().required('This field is required')
        })),
        mode: 'all'
    });

    const { formState: { isValid, isDirty }, register } = forgotPasswordForm;

    const onSubmit = async (formValues: PasswordForgotFormValues) => {
        const {error} = await axios.simplePost('/account/password/request', formValues);
        if (!error) toast.success('An email has been sent to you with instructions on how to reset your password.');
    };

    return (
        <div className={styles.forgot}>
            <FormProvider {...forgotPasswordForm}>
                <form noValidate className={styles.form}
                      onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}>
                    <header className={styles.header}>
                        <h1>Forgot Password</h1>
                    </header>
                    <main className={styles.main}>
                        <Input autoComplete="email" label="Email"
                               placeholder="Enter your email address..."
                               registerFormHook={{ ...register('email') }}/>
                        <button className={styles.submitButton} disabled={!isDirty || !isValid} type="submit">
                            Request new password
                        </button>
                    </main>
                </form>
            </FormProvider>
        </div>
    );
};

export default ForgotPasswordPage;
