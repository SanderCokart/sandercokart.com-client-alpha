import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';

import {Button} from '@/components/Button/Button';
import Input from '@/components/formComponents/Input/Input';

import {ApiPatchEmailCompromisedRoute} from '@/constants/api-routes';
import {LocalLoginPageRoute} from '@/constants/local-routes';

import setFormErrors from '@/functions/client/setFormErrors';
import axios from '@/functions/shared/axios';

import CenteredFormLayout from '@/layouts/CenteredFormLayout';

import type {EmailCompromisedFormValues} from '@/types/FormValueTypes';

import styles from '@/styles/pages/account/password/ChangePassword.module.scss';

const ChangePassword = () => {
    const router = useRouter();
    const emailCompromisedForm = useForm<EmailCompromisedFormValues>({
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

    const { formState: { isValid, isDirty }, handleSubmit, register, setError } = emailCompromisedForm;

    const onSubmit = handleSubmit(async (formValues) => {
        const response = await axios.simplePatch(ApiPatchEmailCompromisedRoute, formValues, {
            params: router.query
        });

        switch (response.type) {
            case 'form':
                setFormErrors(setError, response.errors);
                return;
            case 'success':
                router.push(LocalLoginPageRoute);
                return;
            default:
                return;
        }
    });

    return (
        <FormProvider {...emailCompromisedForm}>
            <form noValidate className={styles.form} onSubmit={onSubmit}>
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
