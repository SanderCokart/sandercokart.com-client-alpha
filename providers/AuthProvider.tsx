import {handler, useApi} from '@/providers/ApiProvider';
import type {AuthContextInitialProps, LoginPayload} from '@/types/AuthProviderTypes';
import {AuthContextProps} from '@/types/AuthProviderTypes';
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
        setState(prev => ({ ...prev, loading: false, user: null }));
        return { status };
    }, [api]);


    /*TODO QUERY DEPENDENT FUNCTIONS MOVE TO PAGE*/


    const check = useCallback(async () => {
        const { data, status, error } = await handler(api.get('/check'));
        setState(prev => ({ ...prev, user: status === 200 ? data?.user : null, loading: false }));
        return { status };
    }, [api]);

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
            check
        }}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;
