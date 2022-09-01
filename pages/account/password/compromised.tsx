import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useForm, FormProvider} from 'react-hook-form';
import * as Yup from 'yup';

import {Button} from '@/components/Button/Button';
import Input from '@/components/formComponents/Input/Input';

import {ApiPatchCompromisedPasswordRoute} from '@/constants/api-routes';
import {LocalLoginPageRoute} from '@/constants/local-routes';

import setFormErrors from '@/functions/client/setFormErrors';
import axios from '@/functions/shared/axios';

import CenteredFormLayout from '@/layouts/CenteredFormLayout';

import type {PasswordCompromisedFormValues} from '@/types/FormValueTypes';

import styles from '@/styles/pages/account/password/CompromisedPassword.module.scss';


const PasswordCompromisedPage = () => {
    const router = useRouter();
    const passwordCompromisedForm = useForm<PasswordCompromisedFormValues>({
        resolver: yupResolver(Yup.object().shape({
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

    const { formState: { isValid, isDirty }, register, handleSubmit, setError } = passwordCompromisedForm;

    const onSubmitCompromisedPassword = handleSubmit(async (formValues) => {
        const response = await axios.simplePatch(ApiPatchCompromisedPasswordRoute, formValues, { params: { ...router.query } });
        switch (response.type) {
            case 'success':
                router.push(LocalLoginPageRoute);
                return;
            case 'form':
                setFormErrors(setError, response.errors);
                return;
            default:
                return;
        }
    });

    return (
        <FormProvider {...passwordCompromisedForm}>
            <CenteredFormLayout title="Reset Compromised Password">
                <form noValidate className={styles.form} onSubmit={onSubmitCompromisedPassword}>
                    <Input label="New password" placeholder="Type your new password"
                           registerFormHook={{ ...register('password') }}
                           type="password"/>
                    <Input label="Confirm password" placeholder="Type your new password again"
                           registerFormHook={{ ...register('password_confirmation') }}
                           type="password"/>
                    <Button disabled={!isDirty || !isValid} type="submit">Submit</Button>
                </form>
            </CenteredFormLayout>
        </FormProvider>
    );
};

export default PasswordCompromisedPage;
