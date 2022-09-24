import type {AxiosError} from 'axios';
import type {ReactNode} from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
import useSWR from 'swr';

import {ApiCSRFTokenRoute, ApiGetUserRoute, ApiPostLoginRoute, ApiPostLogoutRoute} from '@/constants/api-routes';

import type {CustomApiPromise} from '@/types/CustomTypes';
import type {LoginFormValues} from '@/types/FormValueTypes';
import type {UserModel} from '@/types/ModelTypes';

import axios from '../functions/shared/axios';

const AuthContext = createContext({});

interface useAuthProps {
    middleware?: 'guest' | 'auth';
}

interface AuthContextType {
    user: UserModel | null;
    error: Error | AxiosError;
    csrf: () => void;
    logout: () => CustomApiPromise<{ message: string }>;
    login: (props: LoginFormValues) => CustomApiPromise<{ message: string }>;
    isLoading: boolean;
    isAdmin: boolean;
    isVerified: boolean;
    isLoggedIn: boolean;
}

export const useAuth = ({ middleware }: useAuthProps = {}) => {
    const context = useContext(AuthContext) as AuthContextType;
    const { user, error, isLoading } = context;

    const shouldRedirect = () => {
        if (middleware === 'guest' && user) return true;
        return !!(middleware === 'auth' && (error || !user));
    };

    return { ...context, isLoading, shouldRedirect: shouldRedirect() };
};

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoading, setIsLoading] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {
        data: user,
        mutate,
        error
    } = useSWR<UserModel | null>(isLoggedIn ? ApiGetUserRoute : null, {
        onError: () => {
            localStorage.removeItem('isLoggedIn');
            setIsLoggedIn(false);
        }
    });

    const csrf = () => axios.get(ApiCSRFTokenRoute);

    const login = async (formValues: LoginFormValues) => {
        await csrf();
        const response = await axios.simplePost(ApiPostLoginRoute, formValues);
        await mutate();
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
        return response;
    };

    const logout = async () => {
        if (user) {
            const response = await axios.simplePost(ApiPostLogoutRoute);
            localStorage.removeItem('isLoggedIn');
            setIsLoggedIn(false);
            await mutate(null, { revalidate: false });
            return response;
        }
    };

    //check on initial load if the user has logged in before
    useEffect(() => {
        !!localStorage.getItem('isLoggedIn') && setIsLoggedIn(true);
    }, []);

    useEffect(() => {
        if (user && error) mutate(null);
        else setTimeout(() => setIsLoading(false), 1000);
    }, [user, error]);

    return (
        <AuthContext.Provider value={{
            mutate,
            isLoading,
            isAdmin: !!user?.roles?.find((role) => role.name === 'Admin') ?? false,
            isVerified: !!user?.email_verified_at,
            isLoggedIn,
            user,
            login,
            csrf,
            error,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;