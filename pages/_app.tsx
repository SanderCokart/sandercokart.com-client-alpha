import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/scss';
import 'swiper/scss/scrollbar';
import 'react-responsive-modal/styles.css';
import '@/styles/globals.scss';
import AuthProvider from '@/providers/AuthProvider';
import GlobalSWRConfig from '@/config/GlobalSWRConfig';
import Head from 'next/head';
import Navigation from '@/components/Navigation/Navigation';
import ThemeProvider from '@/providers/ThemeProvider';
import icons from '@/data/icons';
import type {AppProps} from 'next/app';
import {SWRConfig} from 'swr';
import {SkeletonTheme} from 'react-loading-skeleton';
import {ToastContainer} from 'react-toastify';
import {library,config} from '@fortawesome/fontawesome-svg-core';
import {MantineProvider} from '@mantine/core';
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
                    <MantineProvider theme={{loader: 'bars'}}>
                        <AuthProvider>
                            <ThemeProvider>
                                <Navigation/>
                                <Component {...pageProps} />
                            </ThemeProvider>
                        </AuthProvider>
                    </MantineProvider>
                </SkeletonTheme>
                <ToastContainer autoClose={false}/>
            </SWRConfig>
        </>
    );
}

export default MyApp;
