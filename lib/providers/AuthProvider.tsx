import type {LoginFormValues} from '@/types/FormValueTypes';
import type {ReactNode} from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
import useSWR from 'swr';
import axios from '../functions/shared/axios';
import {UserModel} from '@/types/ModelTypes';
import {AxiosError} from 'axios';
import {CustomApiPromise} from '@/types/CustomTypes';

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
    loggedIn: boolean;
}

export const useAuth = ({ middleware }: useAuthProps = {}) => {
    const context = useContext(AuthContext) as AuthContextType;
    const { user, error, isLoading } = context;

    const shouldRedirect = () => {
        if (middleware === 'guest' && user) return true;
        return !!(middleware === 'auth' && !user && error);
    };

    return { ...context, isLoading, shouldRedirect: shouldRedirect() };
};

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const { data: user, mutate, error } = useSWR('/user',
        () => axios.get('/account/user')
            .then(response => response.data)
            .catch(error => {
                throw error;
            })
    );

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const login = async (formValues: LoginFormValues) => {
        await csrf();
        const response = await axios.simplePost('/account/login', formValues);
        await mutate();
        return response;
    };

    const logout = async () => {
        if (user) {
            const response = await axios.simplePost('/account/logout');
            await mutate(null);
            return response;
        }
    };

    useEffect(() => {
        if (user && error) mutate(null);
        else if (user || error) setTimeout(() => setIsLoading(false), 1000);
    }, [user, error]);

    return (
        <AuthContext.Provider value={{
            mutate,
            isLoading,
            isAdmin: user?.roles.includes('admin'),
            isVerified: !!user?.emailVerifiedAt,
            loggedIn: !!user,
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