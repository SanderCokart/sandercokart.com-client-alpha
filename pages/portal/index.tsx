import Loader from '@/components/Loader';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/pages/portal/Portal.module.scss';
import type {FC} from 'react';
import Head from 'next/head';

const Portal: FC = () => {
    const { isLoading } = useAuth({ middleware: 'auth' });

    if (isLoading) return <Loader/>;

    return (
        <>
            <Head>
                <title>portal</title>
            </Head>
        <div className={styles.portal}>
            <main className={styles.main}>

            </main>
        </div>
        </>
    );
};

export default Portal;