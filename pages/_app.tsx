//LOADED CSS BEFORE PACKAGES
import '@/styles/globals.before.scss';
//PACKAGES
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';
import 'swiper/scss';
import 'swiper/scss/navigation';


//CSS AFTER PACKAGES
import '@/styles/globals.after.scss';
//----------------------------------------------------------------------------------------------------------------------
import GlobalSWRConfig from '@/config/GlobalSWRConfig';
import {config} from '@fortawesome/fontawesome-svg-core';
import type {NextPage} from 'next';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {SkeletonTheme} from 'react-loading-skeleton';
import {ToastContainer} from 'react-toastify';
import {SWRConfig} from 'swr';

import AuthGuard from '@/components/AuthGuard';
import Navigation from '@/components/Navigation';

import AuthProviderV2 from '@/providers/AuthProviderV2';
import ThemeProvider, {useTheme} from '@/providers/ThemeProvider';

import type {PropsWithChildren} from '@/types/CustomTypes';

config.autoAddCss = false;

const Providers = ({ children }: PropsWithChildren) => {
    return <SWRConfig value={GlobalSWRConfig}>
        <SkeletonTheme baseColor="var(--bg)" borderRadius="0" highlightColor="var(--acc)">
            <AuthProviderV2>
                <ThemeProvider>
                    {children}
                    <ToastContainerWithTheme/>
                </ThemeProvider>
            </AuthProviderV2>
        </SkeletonTheme>
    </SWRConfig>;
};

export type NextApplicationPage<P = unknown, IP = P> = NextPage<P, IP> & {
    requireAuth?: boolean;
    redirectTimeout?: number;
    disableLoader: boolean;
}

const ToastContainerWithTheme = () => {
    const { theme } = useTheme();

    if (theme === 'device') {
        const deviceTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        return <ToastContainer autoClose={false} theme={deviceTheme}/>;
    }

    return <ToastContainer autoClose={false} theme={theme}/>;
};

const MyApp = ({ Component, pageProps }: AppProps & { Component: NextApplicationPage; pageProps: unknown }) => (
    <>
        <Head>
            <title>SanderCokart.com</title>
            <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
        </Head>
        <Providers>
            <Navigation/>
            {/*<Debugger/>*/}
            {Component.requireAuth ? (
                <AuthGuard disableLoader={Component.disableLoader} timeout={Component.redirectTimeout}>
                    <Component {...pageProps} />
                </AuthGuard>
            ) : (
                 // public page
                 <Component {...pageProps} />
             )}
        </Providers>
    </>
);

export default MyApp;
