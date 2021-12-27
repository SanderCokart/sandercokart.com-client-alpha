import Loader from '@/components/Loader';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/pages/portal/Portal.module.scss';
import Head from 'next/head';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {useEffect} from 'react';

const Portal: FC = () => {
    const { isLoading: isLoadingAuth, shouldRedirect } = useAuth({ middleware: 'auth' });
    const router = useRouter();


    useEffect(() => {
        if (shouldRedirect) router.push('/login');
    }, [shouldRedirect]);

    return (
        <>
            <Head>
                <title>portal</title>
            </Head>
            {(isLoadingAuth || shouldRedirect) && <Loader/>}
            <div className={styles.portal}>
                <main className={styles.main}>

                </main>
            </div>
        </>
    );
};

export default Portal;