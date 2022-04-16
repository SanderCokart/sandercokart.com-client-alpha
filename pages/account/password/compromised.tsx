import axios from '@/functions/shared/axios';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useRouter} from 'next/router';
import * as Yup from 'yup';
import {useForm, FormProvider} from 'react-hook-form';
import Input from '@/components/formComponents/Input';
import {Button} from '@/components/Button';
import setFormErrors from '@/functions/client/setFormErrors';
import type {PasswordCompromisedFormValues} from '@/types/FormValueTypes';
import CenteredFormLayout from '@/layouts/CenteredFormLayout';
import {LoadingOverlay} from '@mantine/core';
import {ApiPasswordCompromisedRoute} from '@/constants/api-routes';


const PasswordCompromisedPage = () => {
    const router = useRouter();
    const passwordCompromisedForm = useForm({
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

    const { formState: { isValid, isDirty, isSubmitting }, register, handleSubmit, setError } = passwordCompromisedForm;

    const onSubmitCompromisedPassword = async (formValues: PasswordCompromisedFormValues) => {
        const response = await axios.simplePatch(ApiPasswordCompromisedRoute, formValues, { params: { ...router.query } });
        switch (response.type) {
            case 'success':
                router.push('/login');
                return;
            case 'form':
                setFormErrors(setError, response.errors);
                return;
            default:
                return;
        }
    };

    return (
        <FormProvider {...passwordCompromisedForm}>
            <form noValidate onSubmit={handleSubmit(onSubmitCompromisedPassword)}>
                <CenteredFormLayout title="Reset Compromised Password">
                    <Input label="New password" placeholder="Type your new password"
                           registerFormHook={{ ...register('password') }}
                           type="password"/>
                    <Input label="Confirm password" placeholder="Type your new password again"
                           registerFormHook={{ ...register('password_confirmation') }}
                           type="password"/>
                    <Button disabled={!isDirty || !isValid} type="submit">Submit</Button>
                </CenteredFormLayout>
            </form>
        </FormProvider>
    );
};

export default PasswordCompromisedPage;
