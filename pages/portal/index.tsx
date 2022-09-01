import Head from 'next/head';
import {useRouter} from 'next/router';
import {useSWRConfig} from 'swr';

import {SmartLoader} from '@/components/Loader/SmartLoader';

import {LocalLoginPageRoute} from '@/constants/local-routes';

import styles from '@/styles/pages/portal/Portal.module.scss';

const PortalPage = () => {
    const router = useRouter();
    const { mutate } = useSWRConfig();

    return (
        <>
            <Head>
                <title>portal</title>
            </Head>
            <SmartLoader middleware="auth" redirectTo={LocalLoginPageRoute}/>
            <div className={styles.portal}>
                <main className={styles.main}>

                </main>
            </div>
        </>
    );
};

export default PortalPage;