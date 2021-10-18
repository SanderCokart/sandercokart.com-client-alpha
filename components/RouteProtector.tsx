import type {FC} from 'react';

export const RouteProtector: FC = ({ children }) => {
    // const { loggedIn, loading } = useAuth();
    // const router = useRouter();
    //z
    // const redirectIfLoggedIn = ['/account/create', '/account/password/forgot', '/account/password/reset'];
    // const requireAuth = ['/account'];
    //
    // if (loading) {
    //     return <Loader/>;
    // }
    //
    // /* if logged in redirect to account page - TODO send to individual corresponding routes */
    // if (redirectIfLoggedIn.includes(router.route) && loggedIn && !loading) {
    //     if (router.query?.type === 'verify')
    //         router.push('/login');
    //     else
    //         router.push('/account');
    //     return <Loader/>;
    // }
    //
    // /* if page requires auth redirect to login */
    // if (requireAuth.includes(router.route) && !loggedIn && !loading) {
    //     router.push('/login');
    //     return <Loader/>;
    // }

    return <>{children}</>;
};

export default RouteProtector;
