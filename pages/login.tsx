import {yupResolver} from '@hookform/resolvers/yup';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useForm, FormProvider} from 'react-hook-form';
import * as Yup from 'yup';

import BoxContainer from '@/components/BoxContainer';
import {Button} from '@/components/Button/Button';
import Checkbox from '@/components/formComponents/Checkbox/Checkbox';
import Input from '@/components/formComponents/Input/Input';
import {SmartLoader} from '@/components/Loader/SmartLoader';

import {
    LocalPasswordForgotPageRoute,
    LocalRegisterPageRoute,
    LocalEmailVerifyPageRoute,
    LocalHomePageRoute
} from '@/constants/local-routes';

import setFormErrors from '@/functions/client/setFormErrors';

import {useBooleanToggle} from '@/hooks/useToggle';

import CenteredFormLayout from '@/layouts/CenteredFormLayout';

import {useAuth} from '@/providers/AuthProvider';

import type {LoginFormValues} from '@/types/FormValueTypes';

import styles from '@/styles/pages/Login.module.scss';

export const Login = () => {
    const router = useRouter();
    const { login } = useAuth({ middleware: 'guest' });
    const [showPassword, toggleShowPassword] = useBooleanToggle();
    const loginForm = useForm<LoginFormValues>({
        resolver: yupResolver(Yup.object().shape({
            email: Yup.string()
                .min(5)
                .email()
                .required('This field is required'),
            password: Yup.string()
                .required('This field is required'),
            remember_me: Yup.boolean()
                .required('This field is required')
        })),
        mode: 'all'
    });
    const { formState: { isValid, isDirty }, handleSubmit, register, setError } = loginForm;

    const footer = (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <Link href={LocalPasswordForgotPageRoute}>
                    <a className={styles.link}>Forgot password?</a>
                </Link>
                <Link href={LocalRegisterPageRoute}>
                    <a className={styles.link}>Don't have an account yet?</a>
                </Link>
            </div>
        </footer>
    );

    const onSubmitLogin = handleSubmit(async (formValues) => {
        const response = await login(formValues);
        const { type: qType } = router.query;
        if (response.type === 'form') {
            setFormErrors(setError, response.errors);
            return;
        }

        switch (qType) {
            case'verify': {
                return router.push({
                    pathname: LocalEmailVerifyPageRoute,
                    query: router.query
                });
            }
        }
    });

    return (
        <BoxContainer>
            <SmartLoader middleware="guest" redirectTo={LocalHomePageRoute}/>
            <FormProvider {...loginForm}>
                <CenteredFormLayout footer={footer} title="Login">
                    <form noValidate className={styles.form} onSubmit={onSubmitLogin}>
                        <Input
                            autoComplete="email"
                            label="E-Mail"
                            placeholder="Enter your email here"
                            prependIcon={{ icon: 'envelope', onClick: undefined }}
                            registerFormHook={{ ...register('email') }}
                            type="text"/>
                        <Input
                            appendIcon={{
                                icon: showPassword ? 'eye-slash' : 'eye',
                                onClick: toggleShowPassword
                            }}
                            autoComplete="current-password"
                            label="Password"
                            placeholder="Type your password here"
                            prependIcon={{ icon: 'lock', onClick: undefined }}
                            registerFormHook={{ ...register('password') }}
                            type={showPassword ? 'text' : 'password'}/>
                        <Checkbox label="Remember me" registerFormHook={{ ...register('remember_me') }}/>

                        <Button disabled={!isDirty || !isValid} type="submit">Submit</Button>
                    </form>
                </CenteredFormLayout>
            </FormProvider>
        </BoxContainer>
    );
};

export default Login;
