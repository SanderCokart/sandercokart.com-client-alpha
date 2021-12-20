import Navigation from '../lib/components/Navigation';
import AuthProvider from '../lib/providers/AuthProvider';
import LoadingProvider from '../lib/providers/LoadingProvider';
import '@/styles/globals.scss';
import {library} from '@fortawesome/fontawesome-svg-core';
import type {AppProps} from 'next/app';
import ApiProvider from 'lib/providers/ApiProvider';
import icons from '../lib/data/icons';

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
