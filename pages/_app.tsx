import RouteProtector from '@/components/RouteProtector';
import AuthProvider from '@/providers/AuthProvider';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import type {AppProps} from 'next/app';
import ApiProvider from 'providers/ApiProvider';
import '@/styles/globals.scss';

library.add(...[faSpinner]);

function MyApp({Component, pageProps}: AppProps) {
  return (
      <ApiProvider>
        <AuthProvider>
          <RouteProtector>
            <Component {...pageProps} />
          </RouteProtector>
        </AuthProvider>
      </ApiProvider>
  );
}

export default MyApp;
