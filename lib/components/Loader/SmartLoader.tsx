import classnames from 'classnames';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

import {useAuth} from '@/providers/AuthProvider';

import {Middleware} from '@/types/CustomTypes';

import Spinner from '@/public/static/assets/animated/spinner.svg';

import styles from './Loader.module.scss';

interface SmartLoaderProps {
    transparent?: boolean;
    middleware: Middleware;
    redirectTo: string;
}

export const SmartLoader = ({ transparent, middleware, redirectTo }: SmartLoaderProps) => {
    const { isLoading, shouldRedirect } = useAuth({ middleware });
    const router = useRouter();
    const showLoadingScreen = isLoading || shouldRedirect;

    const classNames = classnames([
        styles.root,
        (transparent && styles.transparent)
    ]);

    useEffect(() => {
        if (router.isReady && shouldRedirect) router.replace(redirectTo);
    }, [shouldRedirect, router]);


    if (showLoadingScreen) {
        return (
            <div className={classNames}>
                <Spinner height={300} width={300}/>
            </div>
        );
    }
    return null;
};

interface DummyLoaderProps {
    transparent?: boolean;
    isVisible: boolean;
}

export const DummyLoader = ({ isVisible, transparent }: DummyLoaderProps) => {
    const classNames = classnames([
        styles.root,
        (transparent && styles.transparent)
    ]);

    if (isVisible) {
        return (
            <div className={classNames}>
                <Spinner height={300} width={300}/>
            </div>
        );
    }
    return null;
};
