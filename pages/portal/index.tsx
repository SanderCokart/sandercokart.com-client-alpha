import Head from 'next/head';

import styles from '@/styles/pages/portal/Portal.module.scss';

const PortalPage = () => {

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

export default PortalPage;

PortalPage.requireAuth = true;