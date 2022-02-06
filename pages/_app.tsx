import Navigation from '@/components/Navigation';
import GlobalSWRConfig from '@/config/GlobalSWRConfig';
import icons from '@/data/icons';
import AuthProvider from '@/providers/AuthProvider';
import '@/styles/globals.scss';
import {library} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import 'react-loading-skeleton/dist/skeleton.css';
import {SkeletonTheme} from 'react-loading-skeleton';
import {SWRConfig} from 'swr';

library.add(...icons);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>SanderCokart.com</title>
                <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
            </Head>
            <SWRConfig value={GlobalSWRConfig}>
                <SkeletonTheme baseColor="var(--bg)" borderRadius="0" highlightColor="var(--acc)">
                <AuthProvider>
                    <Navigation/>
                    <Component {...pageProps} />
                </AuthProvider>
                </SkeletonTheme>
            </SWRConfig>
        </>
    );
}

export default MyApp;
