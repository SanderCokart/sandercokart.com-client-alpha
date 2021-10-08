import RouteProtector from '@/components/RouteProtector';
import AuthProvider from '@/providers/AuthProvider';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCalendar, faCheck, faEnvelope, faLock, faSpinner, faUser} from '@fortawesome/free-solid-svg-icons';
import type {AppProps} from 'next/app';
import ApiProvider from 'providers/ApiProvider';
import '@/styles/globals.scss';
import LoadingProvider from '@/providers/LoadingProvider';


library.add(...[faSpinner, faEnvelope, faLock, faCheck, faCalendar, faUser]);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApiProvider>
            <AuthProvider>
                <LoadingProvider>
                    <RouteProtector>
                        <Component {...pageProps} />
                    </RouteProtector>
                </LoadingProvider>
            </AuthProvider>
        </ApiProvider>
    );
}

export default MyApp;
