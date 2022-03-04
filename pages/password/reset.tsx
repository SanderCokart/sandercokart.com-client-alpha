import Input from '@/components/formComponents/Input';
import axios from '@/functions/shared/axios';
import styles from '@/styles/pages/account/PasswordReset.module.scss';
import type {PasswordResetFormValues} from '@/types/FormValueTypes';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useRouter} from 'next/router';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';

export const ResetPasswordPage = () => {
    const router = useRouter();
    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            password: Yup.string().min(8).max(50).required('This field is required')
                .matches(/[a-z]/, 'must contain a lower case character')
                .matches(/[A-Z]/, 'must contain an upper case character')
                .matches(/[0-9]/, 'must contain a number')
                .matches(/[!@#$%^&*]/, 'must contain a special case character'),
            password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
        })),
        mode: 'all',
        defaultValues: {
            password: '',
            password_confirmation: ''
        }
    });


    const { query } = router; //token and email
    const { formState: { isValid, isDirty } } = methods;

    const resetPassword = async (formValues: PasswordResetFormValues) => {
        await axios.simplePatch('/password/reset', formValues, { params: query });
    };

    return (
        <div className={styles.reset}>
            <FormProvider {...methods}>
                <form noValidate className={styles.form} onSubmit={methods.handleSubmit(resetPassword)}>
                    <header className={styles.header}>
                        <h1>Reset Password</h1>
                    </header>
                    <main className={styles.main}>
                        <Input autoComplete="new-password" label="New password" name="password"
                               placeholder="Type your new password..."
                               prependIcon={{ icon: ['fas', 'lock'] }}
                               type="password"/>
                        <Input autoComplete="new-password" label="Password confirmation" name="password_confirmation"
                               placeholder="Type your new password again..."
                               prependIcon={{ icon: ['fas', 'lock'] }} type="password"/>
                        <button className={styles.submitButton} disabled={!isDirty || !isValid} type="submit">Submit
                        </button>
                    </main>
                </form>
            </FormProvider>
        </div>
    );
};

export default ResetPasswordPage;