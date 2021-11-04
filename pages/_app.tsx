import AuthProvider from '@/providers/AuthProvider';
import LoadingProvider from '@/providers/LoadingProvider';
import '@/styles/globals.scss';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faCalendar,
    faCheck,
    faEnvelope,
    faLock,
    faPlus,
    faSpinner,
    faTimes,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import type {AppProps} from 'next/app';
import ApiProvider from 'providers/ApiProvider';


library.add(...[faSpinner, faEnvelope, faLock, faCheck, faCalendar, faUser, faTimes,faPlus]);

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <ApiProvider>
            <AuthProvider>
                <LoadingProvider>
                    <Component {...pageProps} />
                </LoadingProvider>
            </AuthProvider>
        </ApiProvider>
    );
}

export default MyApp;
