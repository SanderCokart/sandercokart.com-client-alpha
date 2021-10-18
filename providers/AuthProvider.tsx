import {useApi} from '@/providers/ApiProvider';
import type {FC} from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
import type {AuthContextInitialProps, LoginCredentialsType} from '@/types/AuthProviderTypes';
import {AuthContextProps} from '@/types/AuthProviderTypes';

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

    const oS = (override: Partial<AuthContextInitialProps>): void => {
        setState(prevState => {
            return { ...prevState, ...override };
        });
    };

    const login = (credentials: LoginCredentialsType) => {
        return api.post('/login', credentials)
            .then(({ data: { user }, status }) => {
                oS({ user, loading: false });
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
        return api.post('/password/request', { email })
            .then(({ status }) => {
                return { status };
            })
            .catch(({ response: { status } }) => {
                return { status };
            });
    };

    // const requestEmailChange = (email = state.user?.email) => {
    //     return api.post('/account/email/request', { email })
    //         .then(({ status }) => {
    //             return { status };
    //         })
    //         .catch(({ response: { status } }) => {
    //             return { status };
    //         });
    // };

    const check = () => {
        return api.get('/check')
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
            // requestEmailChange,
            oS,
            check
        }}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;
