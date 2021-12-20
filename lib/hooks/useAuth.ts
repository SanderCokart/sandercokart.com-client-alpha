import type {LoginPayload} from '@/types/AuthProviderTypes';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import useSWR from 'swr';
import axios from '../functions/shared/axios';

interface Props {
    middleware?: 'guest' | 'auth';
}

export default function useAuth({ middleware }: Props = {}) {
    const router = useRouter();

    const { data: user, mutate, error } = useSWR('/user',
        () => axios.get('/user').then(response => response.data).catch(error => {
            throw error;
        })
    );

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const login = async (props: LoginPayload) => {
        await csrf();

        const response = await axios.simplePost('/login', props);
        mutate();
        router.push('/blog');
        return response;
    };

    const logout = async () => {
        const response = await axios.simplePost('/logout');
        mutate(null);
        router.push('/', undefined, { shallow: true });
        return response;
    };

    useEffect(() => {
        if (middleware === 'guest' && user) router.push('/blog');
        if (middleware === 'auth' && !user && error) logout();
    }, [user, error]);

    return {
        user,
        login,
        csrf,
        error,
        logout,
        isLoading: (!user || error),
        isAdmin: user?.roles.includes('admin'),
        isVerified: !!user?.emailVerifiedAt,
        loggedIn: !!user
    };
};