import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useAuth} from '@/providers/AuthProvider';

const UseAuthPage = () => {
    const { isLoading, shouldRedirect } = useAuth({middleware:'auth'});
    const router = useRouter();

    useEffect(() => {
        if (shouldRedirect) router.replace('/login');
    }, [shouldRedirect, router]);

    return isLoading || shouldRedirect;
};

export default UseAuthPage;