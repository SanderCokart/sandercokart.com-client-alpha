import type {FC} from 'react';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/account/email/VerifyEmail.module.scss';
import Loader from '@/components/Loader';
import {useApi} from '@/providers/ApiProvider';

const VerifyEmail: FC = () => {
    const router = useRouter();
    const api = useApi();
    const { loggedIn, isVerified, justVerified, check, oS } = useAuth();
    console.log(router.query);
    const { query: { user, hash, type, signature, expires }, isReady } = router;

    const timeout = 5000;

    useEffect(() => {
        if (loggedIn && !isVerified && isReady) {
            api.get(`/account/email/verify/${user}/${hash}?expires=${expires}&type=${type}&signature=${signature}`).then(() => {
                check();
                oS({ justVerified: true });
            });
        }
    }, [isVerified]);

    if (!loggedIn) {
        setTimeout(() => {
            console.log(router.query);
            router.push({
                pathname: '/login',
                query: router.query
            });
        }, timeout);
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