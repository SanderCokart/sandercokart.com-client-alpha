import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';

import {Button} from '@/components/Button/Button';
import Input from '@/components/formComponents/Input/Input';
import {SmartLoader} from '@/components/Loader/SmartLoader';

import {ApiPostRegisterRoute} from '@/constants/api-routes';
import {LocalHomePageRoute, LocalLoginPageRoute} from '@/constants/local-routes';

import setFormErrors from '@/functions/client/setFormErrors';
import axios from '@/functions/shared/axios';

import useFieldVisibility from '@/hooks/useFieldVisibility';

import CenteredFormLayout from '@/layouts/CenteredFormLayout';

import type {RegisterFormValues} from '@/types/FormValueTypes';

import styles from '@/styles/pages/Register.module.scss';

const RegisterPage = () => {
    const router = useRouter();
    const { togglePasswordVisibility, showPasswordAsText } = useFieldVisibility();
    const registerForm = useForm<RegisterFormValues>({
        resolver: yupResolver(Yup.object().shape({
            name: Yup.string().min(2).required('This field is required'),
            email: Yup.string().email('Must be a valid email').required('This field is required'),
            password: Yup.string().min(8).max(50).required('This field is required')
                .matches(/[a-z]/, 'must contain a lower case character')
                .matches(/[A-Z]/, 'must contain an upper case character')
                .matches(/[0-9]/, 'must contain a number')
                .matches(/[!@#$%^&*]/, 'must contain a special case character'),
            password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
        })),
        mode: 'all'
    });
    const { formState: { isValid, isDirty }, handleSubmit, register, setError } = registerForm;

    const onSubmitRegister = handleSubmit(async (formValues) => {
        const response = await axios.simplePost(ApiPostRegisterRoute, formValues);
        if (response.type === 'form') {
            setFormErrors(setError, response.errors);
            return;
        }
        router.push(LocalLoginPageRoute);
    });

    return (
        <FormProvider {...registerForm}>
            <SmartLoader middleware="guest" redirectTo={LocalHomePageRoute}/>
            <CenteredFormLayout title="Register">
                <form noValidate className={styles.form} onSubmit={onSubmitRegister}>
                    <Input autoComplete="name"
                           label="Full name"
                           placeholder="Type your full name"
                           prependIcon={{ icon: 'user' }}
                           registerFormHook={{ ...register('name') }}/>
                    <Input autoComplete="email"
                           label="Email"
                           placeholder="Type you email address"
                           prependIcon={{ icon: 'envelope' }}
                           registerFormHook={{ ...register('email') }}
                           type="email"/>
                    <Input
                        appendIcon={{
                            icon: showPasswordAsText ? 'eye-slash' : 'eye',
                            onClick: togglePasswordVisibility
                        }}
                        autoComplete="new-password"
                        label="Password"
                        placeholder="Type your password"
                        prependIcon={{ icon: 'lock' }}
                        registerFormHook={{ ...register('password') }}
                        type="password"/>
                    <Input autoComplete="new-password"
                           label="Password"
                           placeholder="Type your password again"
                           prependIcon={{ icon: 'lock' }}
                           registerFormHook={{ ...register('password_confirmation') }}
                           type="password"/>
                    <Button disabled={!isDirty || !isValid} type="submit">Submit</Button>
                </form>
            </CenteredFormLayout>
        </FormProvider>
    );
};

export default RegisterPage;