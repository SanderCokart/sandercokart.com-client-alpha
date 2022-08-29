import styles from './Loader.module.scss';
import Spinner from '@/public/static/assets/animated/spinner.svg';
import {useAuth} from '@/providers/AuthProvider';
import {useRouter} from 'next/router';
import {Middleware} from '@/types/CustomTypes';
import {useEffect} from 'react';

interface LoaderProps {
    transparent?: boolean;
    middleware: Middleware;
    redirectTo: string;
}

export const Loader = ({ transparent, middleware, redirectTo }: LoaderProps) => {
    const { isLoading, shouldRedirect } = useAuth({ middleware });
    const router = useRouter();
    const showLoadingScreen = isLoading || shouldRedirect;

    const classNames = [
        styles.root,
        (transparent && styles.transparent)
    ];

    useEffect(() => {
        if (shouldRedirect) router.replace(redirectTo);
    }, [shouldRedirect, router]);


    if (showLoadingScreen) {
        return (
            <div className={classNames.join(' ')}>
                <Spinner height={300} width={300}/>
            </div>
        );
    }
    return null;
};

export default Loader;
