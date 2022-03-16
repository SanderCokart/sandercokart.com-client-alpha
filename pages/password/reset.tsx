import Input from '@/components/formComponents/Input';
import axios from '@/functions/shared/axios';
import styles from '@/styles/pages/account/PasswordReset.module.scss';
import type {PasswordResetFormValues} from '@/types/FormValueTypes';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useRouter} from 'next/router';
import type {UseFormProps} from 'react-hook-form';
import {useFormContext} from 'react-hook-form';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import {Button} from '@/components/Button';
import CenteredBoxForm from '@/components/CenteredBoxForm';

export const PasswordResetPage = () => {
    const router = useRouter();
    const formOptions: UseFormProps = {
        resolver: yupResolver(Yup.object().shape({
            password: Yup.string().min(8).max(50).required('This field is required')
                .matches(/[a-z]/, 'must contain a lower case character')
                .matches(/[A-Z]/, 'must contain an upper case character')
                .matches(/[0-9]/, 'must contain a number')
                .matches(/[!@#$%^&*]/, 'must contain a special case character'),
            password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
        })),
        mode: 'all'
    };

    const onSubmit = async (formValues: PasswordResetFormValues) => {
        const { query } = router; //token and email
        const { error } = await axios.simplePatch('/account/password/reset', formValues, { params: query });
        if (!error) {
            toast.success('Password reset successfully');
            router.push('/account/login');
        }
    };

    return (
        <CenteredBoxForm formOptions={formOptions} title="Reset Password" onSubmit={onSubmit}>
            <PasswordResetForm/>
        </CenteredBoxForm>
    );
};

const PasswordResetForm = () => {
    const { formState: { isValid, isDirty }, register } = useFormContext();

    return (
        <>
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
        </>
    );
};

export default PasswordResetPage;