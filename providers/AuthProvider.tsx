import {useApi} from '@/providers/ApiProvider';
import type {FC} from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
import type {AuthContextType, AuthStateType, LoginCredentialsType} from '@/types/AuthProviderTypes';

export const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC = ({ children }) => {
    const api = useApi();

    const [state, setState] = useState<AuthStateType>({
        user: null,
        loading: true,
        justVerified: false,
        loggedIn: false
    });

    const oS = (override: AuthStateType): void => {
        setState(prevState => {
            return { ...prevState, ...override };
        });
    };

    const login = (credentials: LoginCredentialsType) => {
        return api.post('/account/login', credentials)
            .then(({ data: { user }, status }) => {
                oS({ user: user, loading: false });
                return { status };
            })
            .catch(({ status }) => {
                oS({ loading: false });
                return { status };
            });
    };

    const logout = () => {
        oS({ loading: true });
        return api.post('/account/logout')
            .then(({ status }) => {
                oS({ loading: false, user: null });
                return { status };
            })
            .catch(({ response: { status } }) => {
                oS({ loading: false });
                return { status };
            });
    };

    const requestPasswordReset = (email = state.user?.email) => {
        return api.post('/account/password/request', { email })
            .then(({ status }) => {
                return { status };
            })
            .catch(({ response: { status } }) => {
                return { status };
            });
    };

    const requestEmailChange = (email = state.user?.email) => {
        return api.post('/account/email/request', { email })
            .then(({ status }) => {
                return { status };
            })
            .catch(({ response: { status } }) => {
                return { status };
            });
    };

    const check = () => {
        return api.get('/account/check')
            .then(({ data, status }) => {
                oS({ user: data.user, loading: false });
                return { status };
            })
            .catch(({ response: { status } }) => {
                oS({ loading: false });
                return { status };
            });
    };

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
            requestEmailChange,
            oS,
            check
        }}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;
