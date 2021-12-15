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
                    <Navigation/>
                    <Component {...pageProps} />
                </LoadingProvider>
            </AuthProvider>
        </ApiProvider>
    );
}

export default MyApp;
