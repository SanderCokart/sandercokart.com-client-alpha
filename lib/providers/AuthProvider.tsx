import {useRouter} from 'next/router';
import type {ReactNode, Dispatch, SetStateAction} from 'react';
import {createContext, useContext, useState} from 'react';
import useSWR from 'swr';

import {
    ApiCSRFTokenRoute,
    ApiGetUserRoute,
    ApiPostLoginRoute,
    ApiPostLogoutRoute,
    ApiClearSessionCookiesRoute
} from '@/constants/api-routes';

import axios from '@/functions/shared/axios';

import useLocalStorage from '@/hooks/useLocalStorage';

import type {CustomApiPromise} from '@/types/CustomTypes';
import type {LoginFormValues} from '@/types/FormValueTypes';
import type {UserModel} from '@/types/ModelTypes';

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext({});

interface AuthContextType {
    user: UserModel | null;
    logout: () => CustomApiPromise<{ message: string }>;
    login: (props: LoginFormValues) => CustomApiPromise<{ message: string }>;
    quickMutate: () => void;
    clearSessionStorage: () => void;
    clearLocalStorage: () => void;
    clearSessionCookies: () => void;
    setShowLoading: Dispatch<SetStateAction<boolean>>;
    ensureUserIsLoggedIn: () => void;
    isAdmin: boolean;
    isVerified: boolean;
    isLoggedIn: boolean;
    showLoading: boolean;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const router = useRouter();
    const [isLoggedIn, setLoggedIn] = useLocalStorage('loggedIn', false);
    const [showLoading, setShowLoading] = useState(false);

    const { data: user, mutate } =
        useSWR<UserModel | null>(isLoggedIn ? ApiGetUserRoute : null, {
            onError: async () => {
                await router.replace('/login');
                setLoggedIn(false);
                setShowLoading(false);
            },
            onSuccess: async () => {
                setLoggedIn(true);
                setShowLoading(false);
            }
        });

    const csrf = () => axios.get(ApiCSRFTokenRoute);

    const login = async (formValues: LoginFormValues) => {
        setShowLoading(true);
        await csrf();
        const response = await axios.simplePost(ApiPostLoginRoute, formValues);
        await mutate();
        setLoggedIn(true);
        return response;
    };

    const logout = async () => {
        if (user) {
            const response = await axios.simplePost(ApiPostLogoutRoute);
            setLoggedIn(false);
            await mutate(null, { revalidate: false });
            return response;
        }
    };

    const quickMutate = async () => {
        await mutate(null, { revalidate: false });
    };

    const clearSessionStorage = () => {
        sessionStorage.clear();
    };

    const clearLocalStorage = () => {
        localStorage.clear();
    };

    const clearSessionCookies = async () => {
        await axios.simplePost(ApiClearSessionCookiesRoute);
    };

    const ensureUserIsLoggedIn = async () => {
        await mutate();
    };

    return (
        <AuthContext.Provider value={{
            isAdmin: !!user?.roles?.find((role) => role.name === 'Admin') ?? false,
            isVerified: !!user?.email_verified_at,
            user,
            isLoggedIn,
            showLoading,
            login,
            logout,
            quickMutate,
            clearLocalStorage,
            clearSessionStorage,
            clearSessionCookies,
            ensureUserIsLoggedIn,
            setShowLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext) as AuthContextType;
};

export default AuthProvider;