import Input from '@/components/formComponents/Input';
import axios from '@/functions/shared/axios';
import styles from '@/styles/pages/account/PasswordReset.module.scss';
import type {PasswordResetFormValues} from '@/types/FormValueTypes';
import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';

export const PasswordReset: FC = () => {
    const router = useRouter();
    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            password: Yup.string().min(8, '').max(50).required('This field is required').matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
            ),
            password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('This field is required')
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
                               prependIcon={['fas', 'lock']}
                               type="password"/>
                        <Input autoComplete="new-password" label="Password confirmation" name="password_confirmation"
                               placeholder="Type your new password again..."
                               prependIcon={['fas', 'lock']} type="password"/>
                        <button className={styles.submitButton} disabled={!isDirty || !isValid} type="submit">Submit
                        </button>
                    </main>
                </form>
            </FormProvider>
        </div>
    );
};

export default PasswordReset;