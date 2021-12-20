import Input from '../../lib/components/formComponents/Input';
import {handler, useApi} from '../../lib/providers/ApiProvider';
import styles from '@/styles/pages/account/PasswordForgot.module.scss';
import {PasswordForgotPayload} from '@/types/AuthProviderTypes';
import {yupResolver} from '@hookform/resolvers/yup';
import type {FC} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';

export const PasswordForgot: FC = () => {
    const api = useApi();
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

    const requestPasswordReset = async (formValues: PasswordForgotPayload) => {
        await handler(api.post('/password/request', formValues));
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
