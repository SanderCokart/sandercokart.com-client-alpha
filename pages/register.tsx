import Input from '@/components/formComponents/Input';
import axios from '@/functions/shared/axios';
import styles from '@/styles/pages/account/Register.module.scss';
import type {RegisterFormValues} from '@/types/FormValueTypes';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useRouter} from 'next/router';
import type {FC, MutableRefObject} from 'react';
import {useState} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import * as Yup from 'yup';

export const CreateAccount: FC = () => {
    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            name: Yup.string().required('This field is required'),
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

    const { formState: { isSubmitted, errors } } = methods;

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
    const { formState: { isValid, isDirty }, handleSubmit, register } = useFormContext();

    const submitRegistration = async (formValues: RegisterFormValues) => {
        const { error } = await axios.simplePost('/register', formValues);
        if (!error) setTimeout(() => router.push('/login'), 3000);
    };

    const [showPasswordAsText, setShowPasswordAsText] = useState(false);

    const togglePasswordVisibility = (ref: MutableRefObject<HTMLInputElement | null>) => {
        if (ref.current) {
            ref.current.type = ref.current.type === 'password' ? 'text' : 'password';
            setShowPasswordAsText(showPasswordAsText => !showPasswordAsText);
        }
    };

    return (
        <form noValidate className={styles.form} onSubmit={handleSubmit(submitRegistration)}>
            <header className={styles.header}>
                <h1>Register</h1>
            </header>
            <main className={styles.main}>
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
                    appendIcon={{ icon: showPasswordAsText ? 'eye-slash' : 'eye', onClick: togglePasswordVisibility }}
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