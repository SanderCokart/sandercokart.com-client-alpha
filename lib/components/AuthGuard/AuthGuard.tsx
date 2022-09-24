import {useRouter} from 'next/router';
import type {ReactNode} from 'react';
import {useEffect} from 'react';

import {DummyLoader} from '@/components/Loader';

import {LocalLoginPageRoute} from '@/constants/local-routes';

import {useAuthV2} from '@/providers/AuthProviderV2';

interface AuthGuardProps {
    children: ReactNode;
    timeout?: number;
    disableLoader: boolean;
}

const AuthGuard = ({ children, timeout, disableLoader }: AuthGuardProps) => {
    const { initializing, user, setRedirect } = useAuthV2();
    const router = useRouter();

    useEffect(() => {
        if (!initializing && !user) {
            // remember the page that user tried to access
            setRedirect(router.asPath);
            setTimeout(() => {
                router.push(LocalLoginPageRoute);
            }, timeout);
        }
    }, [initializing, router, user, setRedirect]);
    return (
        <>
            {!disableLoader &&
                <DummyLoader isVisible={initializing || (!initializing && !user)} text="Initializing..."/>}
            {children}
        </>
    );
};

export default AuthGuard;