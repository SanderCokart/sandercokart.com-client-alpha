import Head from 'next/head';
import {useRouter} from 'next/router';
import {useSWRConfig} from 'swr';

import {SmartLoader} from '@/components/Loader/SmartLoader';

import useAuthPage from '@/hooks/useAuthPage';

import styles from '@/styles/pages/portal/Portal.module.scss';

const PortalPage = () => {
    const visible = useAuthPage();
    const router = useRouter();
    const { mutate } = useSWRConfig();

    return (
        <>
            <Head>
                <title>portal</title>
            </Head>
            <SmartLoader visible={visible}/>
            <div className={styles.portal}>
                <main className={styles.main}>

                </main>
            </div>
        </>
    );
};

export default PortalPage;