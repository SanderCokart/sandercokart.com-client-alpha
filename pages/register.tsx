import Input from '@/components/formComponents/Input';
import axios from '@/functions/shared/axios';
import styles from '@/styles/pages/account/Register.module.scss';
import type {RegisterFormValues} from '@/types/FormValueTypes';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import * as Yup from 'yup';

export const CreateAccount: FC = () => {
    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            name: Yup.string().required('This field is required'),
            email: Yup.string().email('Must be a valid email').required('This field is required'),
            password: Yup.string().min(8, '').max(50).required('This field is required').matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
            ),
            password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('This field is required')
        })),
        mode: 'all',
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    });

    const { formState: { isSubmitted } } = methods;

    return (
        <div className={styles.register}>
            <FormProvider {...methods}>
                {isSubmitted ? <EmailSend/> : <RegisterForm/>}
            </FormProvider>
        </div>
    );
};

export default CreateAccount;


const RegisterForm: FC = () => {
    const router = useRouter();
    const { formState: { isValid, isDirty }, handleSubmit } = useFormContext();

    const register = async (formValues: RegisterFormValues) => {
        const { error } = await axios.simplePost('/register', formValues);
        if (!error) setTimeout(() => router.push('/login'), 3000);
    };

    return (
        <form noValidate className={styles.form} onSubmit={handleSubmit(register)}>
            <header className={styles.header}>
                <h1>Register</h1>
            </header>
            <main className={styles.main}>
                <Input autoComplete="name" label="Full name" name="name"
                       placeholder="Type your full name"
                       prependIcon={['fas', 'user']}/>
                <Input autoComplete="email" name="email" placeholder="Type you email address"
                       prependIcon={['fas', 'envelope']}
                       type="email"/>
                <Input autoComplete="new-password" label="Password" name="password"
                       placeholder="Type your password"
                       prependIcon={['fas', 'lock']} type="password"/>
                <Input autoComplete="new-password" label="Password" name="password_confirmation"
                       placeholder="Type your password again"
                       prependIcon={['fas', 'lock']} type="password"/>
                <button className={styles.submitButton} disabled={!isDirty || !isValid} type="submit">
                    Submit
                </button>
            </main>
        </form>
    );
};

const EmailSend: FC = () => {
    const { getValues } = useFormContext();
    const email = getValues('email');

    return (
        <div>
            <h1>Please verify your email! We sent you an email at {email} </h1>
            <p>You will be sent back to the login page in {3000 / 1000} seconds</p>
        </div>
    );
};