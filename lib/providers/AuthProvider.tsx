import type {AuthContextType} from '@/types/AuthProviderTypes';
import type {LoginFormValues} from '@/types/FormValueTypes';
import type {FC} from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
import useSWR from 'swr';
import axios from '../functions/shared/axios';

const AuthContext = createContext({});

interface Props {
    middleware?: 'guest' | 'auth';
}

export const useAuth = ({ middleware }: Props = {}) => {
    const context = useContext(AuthContext) as AuthContextType;
    const { user, error, isLoading } = context;

    console.log(!!(!user && error));


    const shouldRedirect = () => {
        if (middleware === 'guest' && user) return true;
        return !!(middleware === 'auth' && !user && error);
    };

    return { ...context, isLoading, shouldRedirect: shouldRedirect() };
};

const AuthProvider: FC = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { data: user, mutate, error } = useSWR('/user',
        () => axios.get('/user')
            .then(response => response.data)
            .catch(error => {
                throw error;
            })
    );

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const login = async (formValues: LoginFormValues) => {
        await csrf();
        const response = await axios.simplePost('/login', formValues);
        await mutate();
        return response;
    };

    const logout = async () => {
        if (user) {
            const response = await axios.simplePost('/logout');
            await mutate(null);
            return response;
        }
        return;
    };

    useEffect(() => {
        if (user || error)
            setIsLoading(false);
    }, [user, error]);

    return (
        <AuthContext.Provider value={{
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