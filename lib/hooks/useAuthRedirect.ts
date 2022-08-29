import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useAuth} from '@/providers/AuthProvider';
import {Middleware} from '@/types/CustomTypes';

const UseAuthRedirect = (middleware: Middleware) => {
    const { isLoading, shouldRedirect } = useAuth({ middleware });
    const router = useRouter();

    useEffect(() => {
        if (shouldRedirect) router.replace('/login');
    }, [shouldRedirect, router]);

    return isLoading || shouldRedirect;
};

export default UseAuthRedirect;