import Navigation from '@/components/Navigation';
import GlobalSWRConfig from '@/config/GlobalSWRConfig';
import icons from '@/data/icons';
import AuthProvider from '@/providers/AuthProvider';
import '@/styles/globals.scss';
import {library} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type {AppProps} from 'next/app';
import 'react-loading-skeleton/dist/skeleton.css';
import {SWRConfig} from 'swr';

library.add(...icons);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <SWRConfig value={GlobalSWRConfig}>
                <AuthProvider>
                    <Navigation/>
                    <Component {...pageProps} />
                </AuthProvider>
            </SWRConfig>
        </>
    );
}

export default MyApp;
