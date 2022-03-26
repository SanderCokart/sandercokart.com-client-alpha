import {Button} from '@/components/Button';
import Checkbox from '@/components/formComponents/Checkbox';
import Input from '@/components/formComponents/Input';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/pages/Login.module.scss';
import type {LoginFormValues} from '@/types/FormValueTypes';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import * as Yup from 'yup';
import CenteredFormLayout from '@/layouts/CenteredFormLayout';
import setFormErrors from '@/functions/client/setFormErrors';
import {useBooleanToggle} from '@/hooks/useToggle';
import BoxContainer from '@/components/BoxContainer';
import {LoadingOverlay} from '@mantine/core';

export const Login = () => {
    const router = useRouter();
    const { login, isLoading: isLoadingAuth, shouldRedirect } = useAuth({ middleware: 'guest' });
    const [showPassword, toggleShowPassword] = useBooleanToggle();
    const loginForm = useForm({
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
    const { formState: { isValid, isDirty, isSubmitting }, handleSubmit, register, setError } = loginForm;

    useEffect(() => {
        if (shouldRedirect) router.push('/');
    }, [shouldRedirect]);

    const onSubmitLogin = async (formValues: LoginFormValues) => {
        const response = await login(formValues);
        const {
            query: {
                user: qUser,
                hash: qHash,
                type: qType,
                signature: qSignature,
                expires: qExpires
            }
        } = router;

        if (response.type === 'form') {
            setFormErrors(setError, response.errors);
            return;
        }

        switch (qType) {
            case'verify': {
                return router.push({
                    pathname: `/account/email/verify/${qUser}/${qHash}`,
                    query: { qExpires, qType, qSignature }
                });
            }
            default: {
                return router.push('/');
            }
        }
    };

    const footer = (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <Link href="/password/forgot">
                    <a className={styles.link}>Forgot password?</a>
                </Link>
                <Link href="/register">
                    <a className={styles.link}>Don't have an account yet?</a>
                </Link>
            </div>
        </footer>
    );
    return (
        <BoxContainer>
            <LoadingOverlay overlayColor="var(--bg)"  overlayOpacity={1} visible={isLoadingAuth || shouldRedirect}/>
            <FormProvider {...loginForm}>
                <form onSubmit={handleSubmit(onSubmitLogin)}>
                    <CenteredFormLayout footer={footer} title="Login">
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
                    </CenteredFormLayout>
                </form>
            </FormProvider>
        </BoxContainer>
    );
};

export default Login;
