import Navigation from '@/components/Navigation';
import AuthProvider from '@/providers/AuthProvider';
import LoadingProvider from '@/providers/LoadingProvider';
import '@/styles/globals.scss';
import {library} from '@fortawesome/fontawesome-svg-core';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import ApiProvider from 'providers/ApiProvider';
import icons from '../data/icons';

library.add(...icons);

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <ApiProvider>
            <AuthProvider>
                <LoadingProvider>
                    <Head>
                        <meta content="height=device-height,
                      width=device-width, initial-scale=1.0,
                      minimum-scale=1.0, maximum-scale=1.0,
                      user-scalable=no, target-densitydpi=device-dpi" name="viewport"/>
                        <title>home</title>
                    </Head>
                    <Navigation/>
                    <Component {...pageProps} />
                </LoadingProvider>
            </AuthProvider>
        </ApiProvider>
    );
}

export default MyApp;
