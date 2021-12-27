import Input from '@/components/formComponents/Input';
import axios from '@/functions/shared/axios';
import styles from '@/styles/pages/account/PasswordForgot.module.scss';
import type {PasswordForgotFormValues} from '@/types/FormValueTypes';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import type {FC} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';

export const PasswordForgot: FC = () => {
    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            email: Yup.string().email().required('This field is required')

        })),
        mode: 'all',
        defaultValues: {
            email: ''
        }
    });

    const { formState: { isValid, isDirty } } = methods;

    const requestPasswordReset = async (formValues: PasswordForgotFormValues) => {
        await axios.simplePost('/password/request', formValues);
    };

    return (
        <div className={styles.forgot}>
            <FormProvider {...methods}>
                <form noValidate className={styles.form} onSubmit={methods.handleSubmit(requestPasswordReset)}>
                    <header className={styles.header}>
                        <h1>Forgot Password</h1>
                    </header>
                    <main className={styles.main}>
                        <Input autoComplete="email" name="email" placeholder="Enter your email..."/>
                        <button className={styles.submitButton} disabled={!isDirty || !isValid} type="submit">Request
                            new
                            password
                        </button>
                    </main>
                </form>
            </FormProvider>
        </div>
    );
};

export default PasswordForgot;
