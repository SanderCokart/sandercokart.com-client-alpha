import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {useForm, FormProvider} from 'react-hook-form';
import * as Yup from 'yup';

import {Button} from '@/components/Button/Button';
import Input from '@/components/formComponents/Input/Input';

import {ApiPatchResetPasswordRoute} from '@/constants/api-routes';
import {LocalLoginPageRoute} from '@/constants/local-routes';

import setFormErrors from '@/functions/client/setFormErrors';
import axios from '@/functions/shared/axios';

import CenteredFormLayout from '@/layouts/CenteredFormLayout';

import type {PasswordResetFormValues} from '@/types/FormValueTypes';

import styles from '@/styles/pages/account/PasswordReset.module.scss';

export const PasswordResetPage = () => {
    const router = useRouter();
    const resetPasswordForm = useForm<PasswordResetFormValues>({
        resolver: yupResolver(Yup.object().shape({
            password: Yup.string().min(8).max(50).required('This field is required')
                .matches(/[a-z]/, 'must contain a lower case character')
                .matches(/[A-Z]/, 'must contain an upper case character')
                .matches(/[0-9]/, 'must contain a number')
                .matches(/[!@#$%^&*]/, 'must contain a special case character'),
            password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
        })),
        mode: 'all'
    });
    const { handleSubmit, register, formState: { isValid, isDirty }, setError } = resetPasswordForm;


    const onSubmitPasswordReset = handleSubmit(async (formValues) => {
        const { query: { identifier, token } } = router;
        const response = await axios.simplePatch(ApiPatchResetPasswordRoute, formValues, {
            params: {
                identifier,
                token
            }
        });
        switch (response.type) {
            case 'form':
                setFormErrors(setError, response.errors);
                return;
            case 'success':
                router.push(LocalLoginPageRoute);
                return;
        }
    });

    return (
        <FormProvider {...resetPasswordForm}>
            <CenteredFormLayout title="Reset Password">
                <form noValidate className={styles.form} onSubmit={onSubmitPasswordReset}>
                    <Input autoComplete="new-password" label="New password" placeholder="Type your new password..."
                           prependIcon={{ icon: ['fas', 'lock'] }}
                           registerFormHook={{ ...register('password') }}
                           type="password"/>
                    <Input autoComplete="new-password" label="Password confirmation"
                           placeholder="Type your new password again..."
                           prependIcon={{ icon: ['fas', 'lock'] }}
                           registerFormHook={{ ...register('password_confirmation') }} type="password"/>
                    <Button className={styles.submitButton} disabled={!isDirty || !isValid} type="submit">
                        Submit
                    </Button>
                </form>
            </CenteredFormLayout>
        </FormProvider>
    );
};

export default PasswordResetPage;