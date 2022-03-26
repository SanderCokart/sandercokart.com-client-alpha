import Input from '@/components/formComponents/Input';
import axios from '@/functions/shared/axios';
import styles from '@/styles/pages/account/password/ChangePassword.module.scss';
import type {EmailCompromisedFormValues} from '@/types/FormValueTypes';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useRouter} from 'next/router';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';
import CenteredFormLayout from '@/layouts/CenteredFormLayout';
import {Button} from '@/components/Button';
import setFormErrors from '@/functions/client/setFormErrors';

const ChangePassword = () => {
    const router = useRouter();
    const emailCompromisedForm = useForm({
        resolver: yupResolver(Yup.object().shape({
            email: Yup.string()
                .email('Must be a valid email')
                .required('This field is required'),
            password: Yup.string()
                .min(8)
                .max(50)
                .required('This field is required')
                .matches(/[a-z]/, 'must contain a lower case character')
                .matches(/[A-Z]/, 'must contain an upper case character')
                .matches(/[0-9]/, 'must contain a number')
                .matches(/[!@#$%^&*]/, 'must contain a special case character'),
            password_confirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('This field is required')
        })),
        mode: 'all'
    });

    const { formState: { isValid, isDirty }, handleSubmit, register, setError, reset } = emailCompromisedForm;
    const { query: { user: qUser, token: qToken } } = router;

    const onSubmit = async (formValues: EmailCompromisedFormValues) => {
        const response = await axios.simplePatch('/account/email/compromised', formValues, {
            params: { user: qUser, token: qToken }
        });

        switch (response.type) {
            case 'form':
                setFormErrors(setError, response.errors);
                return;
            case 'success':
                router.push('/login');
                return;
            default:
                return;
        }
    };

    return (
        <FormProvider {...emailCompromisedForm}>
            <form noValidate className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <CenteredFormLayout title="Reset Compromised Email">
                    <Input autoComplete="email" label="Email" placeholder="Type your email address"
                           registerFormHook={{ ...register('email') }}
                           type="email"/>
                    <Input autoComplete="new-password" label="New password" placeholder="Type your new password"
                           registerFormHook={{ ...register('password') }} type="password"/>
                    <Input autoComplete="new-password" label="Confirm password"
                           placeholder="Type your new password again"
                           registerFormHook={{ ...register('password_confirmation') }}
                           type="password"/>
                    <Button fullWidth disabled={!isDirty || !isValid} type="submit">Submit</Button>
                </CenteredFormLayout>
            </form>
        </FormProvider>
    );
};

export default ChangePassword;
