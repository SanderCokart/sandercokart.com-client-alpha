import {useAuth} from '@/providers/AuthProvider';

import styles from './Debugger.module.scss';

const Debugger = () => {
    const {
        isLoggedIn,
        isAdmin,
        isVerified,
        user,
        login,
        logout,
        quickMutate,
        clearSessionStorage,
        clearLocalStorage,
        clearSessionCookies,
        ensureUserIsLoggedIn, setShowLoading
    } = useAuth();

    return (
        <div className={styles.container}>
            <button onClick={async () => {
                await login({ email: 'cokart32@gmail.com', password: 'Pa$$w0rd', remember_me: false });
                setShowLoading(false);
            }}>Login
            </button>
            <button onClick={logout}>Logout</button>
            <button onClick={quickMutate}>Mutate</button>
            <button onClick={clearLocalStorage}>Clear LocalStorage</button>
            <button onClick={clearSessionStorage}>Clear SessionStorage</button>
            <button onClick={clearSessionCookies}>Clear Cookies</button>
            <button onClick={ensureUserIsLoggedIn}>Check</button>
            <details className={styles.details}>
                <summary>JSON</summary>
                <pre className={styles.pre}>
                    {JSON.stringify({ isLoggedIn, isAdmin, isVerified, user }, null, 2)}
                </pre>
            </details>
        </div>
    );
};

export default Debugger;