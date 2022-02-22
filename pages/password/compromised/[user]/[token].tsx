import Input from '@/components/formComponents/Input';
import axios from '@/functions/shared/axios';
import styles from '@/styles/pages/account/password/ChangePassword.module.scss';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';

interface ChangePasswordForm {
    password: string,
    password_confirmation: string
}

const ChangePassword: FC = () => {
    const router = useRouter();
    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            password: Yup.string().min(8).max(50).required('This field is required')                .matches(/[a-z]/, 'must contain a lower case character')
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

    const onSubmit = async (formValues: ChangePasswordForm) => {
        await axios.simplePatch(`/password/compromised/${user}/${token}`, formValues);
    };

    return (
        <div className={styles.changePassword}>
            <header>
                <header className={styles.header}>
                    <h1>Reset Compromised Password</h1>
                </header>
            </header>
            <main>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input label="New password" name="password" placeholder="Type your new password"
                               type="password"/>
                        <Input label="Confirm password" name="password_confirmation"
                               placeholder="Type your new password again"
                               type="password"/>
                        <button disabled={!isDirty || !isValid} type="submit">Submit</button>
                    </form>
                </FormProvider>
            </main>
        </div>
    );
};

export default ChangePassword;
