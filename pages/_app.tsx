import AuthProvider from '@/providers/AuthProvider';
import type {AppProps} from 'next/app';
import ApiProvider from 'providers/ApiProvider';
import '../styles/globals.css';

function MyApp({Component, pageProps}: AppProps) {
  return (
      <ApiProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ApiProvider>
  );
}

export default MyApp;
