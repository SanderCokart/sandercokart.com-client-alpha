import AuthProvider from '@/providers/AuthProvider';
import LoadingProvider from '@/providers/LoadingProvider';
import '@/styles/globals.scss';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faCalendar,
    faCheck,
    faEnvelope,
    faFileImage,
    faLock,
    faPlus,
    faSpinner,
    faTimes,
    faTrash,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import type {AppProps} from 'next/app';
import Link from 'next/link';
import ApiProvider from 'providers/ApiProvider';


library.add(...[faSpinner, faEnvelope, faLock, faCheck, faCalendar, faUser, faTimes, faPlus, faFileImage, faTrash]);

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <ApiProvider>
            <AuthProvider>
                <LoadingProvider>
                    <Link href="/login"><a>login</a></Link>
                    <Link href="/blog/recent"><a>blog/recent</a></Link>
                    <Link href="/account"><a>account</a></Link>
                    <Link href="/test"><a>test</a></Link>
                    <Component {...pageProps} />
                </LoadingProvider>
            </AuthProvider>
        </ApiProvider>
    );
}

export default MyApp;
