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
import icons from '@/data/icons';
import {library, config} from '@fortawesome/fontawesome-svg-core';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import Test from 'pages/test';
import {SkeletonTheme} from 'react-loading-skeleton';
import {ToastContainer} from 'react-toastify';
import {SWRConfig} from 'swr';

import Debugger from '@/components/Debugger';
import Navigation from '@/components/Navigation';

import AuthProvider from '@/providers/AuthProvider';
import ThemeProvider from '@/providers/ThemeProvider';

config.autoAddCss = false;
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
                        <Test>
                            <ThemeProvider>
                                <Navigation/>
                                <Debugger/>
                                <Component {...pageProps} />
                            </ThemeProvider>
                        </Test>
                    </AuthProvider>
                </SkeletonTheme>
                <ToastContainer autoClose={false}/>
            </SWRConfig>
        </>
    );
}

export default MyApp;
