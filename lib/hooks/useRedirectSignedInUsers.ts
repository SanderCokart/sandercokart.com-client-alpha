import {useRouter} from 'next/router';
import {useEffect} from 'react';

import {LocalAccountPageRoute} from '@/constants/local-routes';

import {useAuthV2} from '@/providers/AuthProviderV2';

const UseRedirectSignedInUsers = () => {
    const { initializing, getRedirect, clearRedirect, user } = useAuthV2();
    const router = useRouter();

    useEffect(() => {
        if (!initializing) {
            if (user) {
                const redirect = getRedirect();
                if (redirect) {
                    router.push(redirect); // go to page which redirected to login
                    clearRedirect();
                } else {
                    router.push(LocalAccountPageRoute); // go to default protected page
                }
            }
        }
    }, [router, getRedirect, clearRedirect, initializing, user]);
    return { shouldShowLoadingScreen: initializing };
};

export default UseRedirectSignedInUsers;