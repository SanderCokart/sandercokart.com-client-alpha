import axios from '@/functions/shared/axios';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useRouter} from 'next/router';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import CenteredBoxForm from '@/components/CenteredBoxForm';
import type {UseFormProps} from 'react-hook-form';
import {useFormContext} from 'react-hook-form';
import Input from '@/components/formComponents/Input';
import {Button} from '@/components/Button';

interface ChangePasswordForm {
    password: string,
    password_confirmation: string
}

const PasswordCompromisedPage = () => {
    const router = useRouter();
    const formOptions: UseFormProps = {
        resolver: yupResolver(Yup.object().shape({
            password: Yup.string().min(8).max(50).required('This field is required').matches(/[a-z]/, 'must contain a lower case character')
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
    };

    const onSubmit = async (formValues: ChangePasswordForm) => {
        const {
            error,
            data
        } = await axios.simplePatch(`/account/password/compromised`, formValues, { params: { ...router.query } });
        if (error) {
            toast.error(error.response?.data?.message || 'Something went wrong while changing your password');
            return;
        }
        toast.success(data.message || 'Password changed successfully');
        return router.push('/');
    };

    return (
        <CenteredBoxForm formOptions={formOptions} title="Reset Compromised Password" onSubmit={onSubmit}>
            <PasswordCompromisedForm/>
        </CenteredBoxForm>
    );
};

const PasswordCompromisedForm = () => {
    const { formState: { isValid, isDirty }, register } = useFormContext();
    return (
        <>
            <Input label="New password" placeholder="Type your new password"
                   registerFormHook={{ ...register('password') }}
                   type="password"/>
            <Input label="Confirm password" placeholder="Type your new password again"
                   registerFormHook={{ ...register('password_confirmation') }}
                   type="password"/>
            <Button disabled={!isDirty || !isValid} type="submit">Submit</Button>
        </>
    );
};

export default PasswordCompromisedPage;
