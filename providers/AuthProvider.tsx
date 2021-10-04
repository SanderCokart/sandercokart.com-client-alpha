import {useApi} from '@/providers/ApiProvider';
import type {FC} from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import type {AuthContextType, AuthStateType, LoginCredentialsType} from '@/types/AuthProviderTypes';

export const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC = ({ children }) => {
    const api = useApi();
    const router = useRouter();
    const { query } = router;

    const [state, setState] = useState<AuthStateType>({
        user: null,
        loading: true
    });

    const sS = (override: AuthStateType): void => {
        setState(prevState => {
            return { ...prevState, ...override };
        });
    };

    const login = (credentials: LoginCredentialsType) => {
        return api.post('/account/login', credentials)
            .then(({ data, status }) => {
                if (status === 200) {
                    if (query?.type === 'verify_email')
                        router.push({ pathname: '/account/email/verify', query });
                    router.push('/blog/recent');
                }
                sS({ user: data.user, loading: false });
            })
            .catch(({ status }) => {
                sS({ loading: false });
            });
    };

    const logout = () => {
        sS({ loading: true });
        api.post('/account/logout')
            .then(({ status }) => {
                if (status === 200)
                    sS({ loading: false, user: null });
            })
            .catch(err => {
                sS({ loading: false });
            });
    };

    const requestPasswordReset = (email = state.user?.email) => {
        return api.post('/account/password/request', { email })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const requestEmailChange = (email = state.user?.email) => {
        return api.post('/account/email/request', { email })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        api.get('/account/check')
            .then(({ data, status }) => {
                sS({ user: data.user, loading: false });
            })
            .catch(() => {
                sS({ loading: false });
            });
    }, []);

    return (
        <AuthContext.Provider value={{
            ...state,
            loggedIn: !!state.user,
            login,
            logout,
            requestPasswordReset,
            requestEmailChange
        }}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;
