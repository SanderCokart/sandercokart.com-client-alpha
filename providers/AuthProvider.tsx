import {handler, useApi} from '@/providers/ApiProvider';
import type {
    AuthContextInitialProps,
    ChangePasswordPayload,
    ForgotPasswordPayload,
    LoginPayload,
    ResetPasswordPayload
} from '@/types/AuthProviderTypes';
import {AuthContextProps, ChangeEmailPayload} from '@/types/AuthProviderTypes';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {createContext, useCallback, useContext, useEffect, useState} from 'react';

const defaultState = {
    user: null,
    loading: true,
    justVerified: false,
    loggedIn: false,
    isVerified: false
};

const AuthContext = createContext<AuthContextInitialProps>(defaultState);

export const useAuth = () => useContext(AuthContext) as AuthContextProps;

export const AuthProvider: FC = ({ children }) => {
    const api = useApi();
    const router = useRouter();
    const { query } = router;


    const [state, setState] = useState<AuthContextInitialProps>({
        user: null,
        loading: true,
        justVerified: false,
        loggedIn: false,
        isVerified: false
    });

    const login = useCallback(async (credentials: LoginPayload) => {
        setState(prev => ({ ...prev, loading: true }));
        const { data: { user }, status } = await handler(api.post('login', credentials));
        setState(prev => ({ ...prev, user: status === 200 ? user : null, loading: false }));
        return { status };
    }, [api]);

    const logout = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true }));
        const { status } = await handler(api.post('/account/logout'));
        setState(prev => ({ ...prev, loading: false }));
        return { status };
    }, [api]);

    /* PASSWORD CHANGE AND RESET */
    const requestPasswordReset = useCallback(async (payload: ForgotPasswordPayload) => {
        const { status } = await handler(api.post('/password/request', payload));
        return { status };
    }, [api]);

    const changePassword = useCallback(async (values: ChangePasswordPayload) => {
        const { status } = await handler(api.patch('/account/password/change', values));
        return { status };
    }, [api]);
    /* PASSWORD CHANGE AND RESET */

    /* EMAIL CHANGE */
    const changeEmail = useCallback(async (values: ChangeEmailPayload) => {
        const { status } = await handler(api.patch(`/account/email/change/${state.user?.id}`, values));
        return { status };
    }, [api, state.user]);

    /* EMAIL CHANGE */

    /*TODO QUERY DEPENDENT FUNCTIONS MOVE TO PAGE*/

    const verifyEmail = useCallback(async () => {
        const { user, hash, type, signature, expires } = query;
        const { data, status, error } =
            await handler(api.get(`/account/email/verify/${user}/${hash}`, { params: { expires, type, signature } }));
        setState(prev => ({ ...prev, justVerified: true }));
        check();
        return { status };
    }, [api, query]);

    const check = useCallback(async () => {
        const { data: { user }, status } = await handler(api.get('/check'));
        setState(prev => ({ ...prev, user: status === 200 ? user : null, loading: false }));
        return { status };
    }, [api]);

    const resetPassword = useCallback(async (payload: ResetPasswordPayload) => {
        const { data, status } = await handler(api.patch('/password/reset', payload, { params: query }));
        return { status };
    }, [api, query]);

    useEffect(() => {
        check();
    }, []);

    return (
        <AuthContext.Provider value={{
            ...state,
            loggedIn: !!state.user,
            isVerified: !!state.user?.email_verified_at,
            login,
            logout,
            requestPasswordReset,
            check,
            changePassword,
            changeEmail,
            verifyEmail,
            resetPassword
        }}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;
