import Loader from '@/components/Loader';
import {handler, useApi} from '@/providers/ApiProvider';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/account/email/VerifyEmail.module.scss';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {useCallback, useEffect} from 'react';

const VerifyEmail: FC = () => {
    const { loggedIn, isVerified, justVerified } = useAuth();
    const api = useApi();
    const router = useRouter();
    const { query } = router;
    const { user, hash, type, signature, expires } = query;

    const timeout = 5000;

    const verifyEmail = async () => {
        await handler(api.get(`/account/email/verify/${user}/${hash}`, {
            params: { expires, type, signature }
        }));
    };

    useEffect(() => {
        loggedIn && verifyEmail();
    }, []);

    if (!loggedIn) {
        setTimeout(() => {
            router.replace({
                pathname: '/login',
                query: router.query
            });
        }, 5000);

        return (
            <div className={styles.container}>
                <div className={styles.box}>
                    <h1>Please login to verify your email.</h1>
                    <p>You will be sent to the login page within seconds to deal with this matter.</p>
                </div>
            </div>
        );
    }

    if (loggedIn && isVerified && justVerified) {
        setTimeout(() => {
            router.replace('/blog/recent');
        }, timeout);
        return (
            <div className={styles.container}>
                <div className={styles.box}>
                    <h1>Your email has been verified!</h1>
                    <p>You will be sent to the home page within 5 seconds.</p>
                </div>
            </div>
        );
    }

    if (loggedIn && isVerified && !justVerified) {
        setTimeout(() => {
            router.replace('/blog/recent');
        }, timeout);
        return (
            <div className={styles.container}>
                <div className={styles.box}>
                    <h1>Your email has already been verified!</h1>
                    <p>You will be sent to the home page within 5 seconds.</p>
                </div>
            </div>
        );
    }

    return <Loader/>;
};

export default VerifyEmail;