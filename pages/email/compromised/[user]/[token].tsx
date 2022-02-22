import Input from '@/components/formComponents/Input';
import axios from '@/functions/shared/axios';
import styles from '@/styles/pages/account/password/ChangePassword.module.scss';
import type {EmailCompromisedFormValues} from '@/types/FormValueTypes';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';

const ChangePassword: FC = () => {
    const router = useRouter();
    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            email: Yup.string().email('Must be a valid email').required('This field is required'),
            password: Yup.string().min(8).max(50).required('This field is required')
                .matches(/[a-z]/, 'must contain a lower case character')
                .matches(/[A-Z]/, 'must contain an upper case character')
                .matches(/[0-9]/, 'must contain a number')
                .matches(/[!@#$%^&*]/, 'must contain a special case character'),
            password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('This field is required')
        })),
        mode: 'all',
        defaultValues: {
            password: '',
            password_confirmation: ''
        }
    });

    const { query: { user, token } } = router;
    const { formState: { isValid, isDirty }, handleSubmit } = methods;

    const onSubmit = async (formValues: EmailCompromisedFormValues) => {
        await axios.simplePatch(`/email/compromised/${user}/${token}`, formValues);
    };

    return (
        <div className={styles.changePassword}>
            <FormProvider {...methods}>
                <form noValidate className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <header className={styles.header}>
                            <h1>Change password & Email</h1>
                        </header>
                        <main className={styles.main}>
                            <Input autoComplete="email" label="Email" name="email" placeholder="Type your email address"
                                   type="email"/>
                            <Input autoComplete="new-password" label="New password" name="password"
                                   placeholder="Type your new password" type="password"/>
                            <Input autoComplete="new-password" label="Confirm password" name="password_confirmation"
                                   placeholder="Type your new password again"
                                   type="password"/>
                            <button className={styles.submitButton} disabled={!isDirty || !isValid} type="submit">
                                Submit
                            </button>
                        </main>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default ChangePassword;
