import Loader from '@/components/Loader/Loader';
import styles from '@/styles/pages/portal/Portal.module.scss';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useSWRConfig} from 'swr';
import useAuthPage from '@/hooks/useAuthPage';

const PortalPage = () => {
    const visible = useAuthPage();
    const router = useRouter();
    const { mutate } = useSWRConfig();

    return (
        <>
            <Head>
                <title>portal</title>
            </Head>
            <Loader visible={visible}/>
            <div className={styles.portal}>
                <main className={styles.main}>

                </main>
            </div>
        </>
    );
};

export default PortalPage;