import GlobalEventListeners from '@/components/GlobalEventListeners';
import GlobalSWRConfig from '@/config/GlobalSWRConfig';
import icons from '@/data/icons';
import AuthProvider from '@/providers/AuthProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import '@/styles/global/dropdown.scss';
import '@/styles/globals.scss';
import {library} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
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
                    <GlobalEventListeners/>
                    <AuthProvider>
                        <ThemeProvider>
                            {/*<Navigation/>*/}
                            <Component {...pageProps} />
                        </ThemeProvider>
                    </AuthProvider>
                </SkeletonTheme>
                <ToastContainer/>
            </SWRConfig>
        </>
    );
}

export default MyApp;
