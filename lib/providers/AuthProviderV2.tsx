import type {ReactNode} from 'react';
import {createContext, useState, useContext} from 'react';
import useSWR from 'swr';

import {ApiGetUserRoute, ApiPostLoginRoute, ApiPostLogoutRoute, ApiCSRFTokenRoute} from '@/constants/api-routes';

import axios from '@/functions/shared/axios';

import useLocalStorage from '@/hooks/useLocalStorage';

import type {CustomApiPromise} from '@/types/CustomTypes';
import type {LoginFormValues} from '@/types/FormValueTypes';
import type {UserModel} from '@/types/ModelTypes';

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextType {
    initializing: boolean;
    user: UserModel | null;
    logout: () => CustomApiPromise<{ message: string }>;
    login: (props: LoginFormValues) => CustomApiPromise<{ message: string }>;
    isAdmin: boolean;
    isVerified: boolean;
    isLoggedIn: boolean;
    setRedirect: (redirect: string) => void;
    getRedirect: () => string | null;
    clearRedirect: () => void;
}

const redirectKey = 'sign_in_redirect';

const AuthContext = createContext({});

export const useAuthV2 = () => {
    return useContext(AuthContext) as AuthContextType;
};

function AuthProvider({ children }: AuthProviderProps) {
    const [initializing, setInitializing] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn');

    const { data: user, mutate } = useSWR<UserModel | null>(ApiGetUserRoute,
        {
            onError: async () => {
                setIsLoggedIn(false);
                setInitializing(false);
            },

            onSuccess: async () => {
                setIsLoggedIn(true);
                setInitializing(false);
            }
        });

    const csrf = () => axios.get(ApiCSRFTokenRoute);

    const login = async (formValues: LoginFormValues) => {
        await csrf();
        const response = await axios.simplePost(ApiPostLoginRoute, formValues);
        await mutate();
        return response;
    };

    const logout = async () => {
        if (user) {
            const response = await axios.simplePost(ApiPostLogoutRoute);
            await mutate(null, { revalidate: false });
            setIsLoggedIn(false);
            return response;
        }
    };

    const setRedirect = (redirect: string) => {
        window.sessionStorage.setItem(redirectKey, redirect);
    };

    const getRedirect = (): string | null => window.sessionStorage.getItem(redirectKey);

    const clearRedirect = () => window.sessionStorage.removeItem(redirectKey);

    return (
        <AuthContext.Provider value={{
            user,
            initializing,
            isLoggedIn,
            isAdmin: !!user?.roles?.find((role) => role.name === 'Admin') ?? false,
            isVerified: !!user?.email_verified_at,
            login,
            logout,
            setRedirect,
            getRedirect,
            clearRedirect
        }}>{children}</AuthContext.Provider>
    );

}

export default AuthProvider;