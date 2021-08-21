import Loader from '@/components/Loader';
import {useAuth} from '@/providers/AuthProvider';
import {useRouter} from 'next/router';
import type {FC} from 'react';

export const RouteProtector: FC = ({children}) => {
  const {loggedIn, loading} = useAuth();
  const router = useRouter();

  const redirectIfLoggedIn = ['/login', '/account/create', '/account/password/forgot', '/account/password/reset'];
  const requireAuth = ['/account'];

  if (loading) {
    return <Loader/>;
  }

  /* if logged in redirect to account page - TODO send to individual corresponding routes */
  if (redirectIfLoggedIn.includes(router.route) && loggedIn && !loading) {
    router.push('/account');
    return <Loader/>;
  }

  /* if page requires auth redirect to login */
  if (requireAuth.includes(router.route) && !loggedIn && !loading) {
    router.push('/login');
    return <Loader/>;
  }

  return <>{children}</>;
};

export default RouteProtector;
