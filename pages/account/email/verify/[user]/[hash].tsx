import Loader from '@/components/Loader';
import axios from '@/functions/shared/axios';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/pages/account/email/VerifyEmail.module.scss';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {useEffect, useState} from 'react';
import {useSWRConfig} from 'swr';

const VerifyEmail: FC = () => {
    const { isLoading, loggedIn, isVerified } = useAuth();
    const router = useRouter();
    const { mutate } = useSWRConfig();
    const { query } = router;
    const { user, hash, type, signature, expires } = query;

    const [verificationCompleted, setVerificationCompleted] = useState(false);


    const verifyEmail = async () => {
        const { data } = await axios.simplePost(`/account/email/verify/${user}/${hash}`, null, {
            params: { expires, type, signature }
        });

        if (data) setVerificationCompleted(true);
        mutate('/user');
    };

    useEffect(() => {
        if (router.isReady) {
            if (loggedIn && !isVerified && !verificationCompleted) verifyEmail();

            else if (loggedIn && verificationCompleted)
                setTimeout(() => {
                    router.replace('/blog');
                }, 5000);

            else if (isVerified && !verificationCompleted)
                setTimeout(() => {
                    router.replace('/blog');
                }, 5000);

            else if (!loggedIn && !isLoading)
                setTimeout(() => {
                    router.replace({
                        pathname: '/login',
                        query: router.query
                    });
                }, 5000);
        }


    }, [loggedIn, isVerified, verificationCompleted, router, isLoading]);

    if (!loggedIn && !isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.box}>
                    <h1>Please login to verify your email.</h1>
                    <p>You will be sent to the login page within 5 seconds to deal with this matter.</p>
                </div>
            </div>
        );
    }

    if (loggedIn && verificationCompleted) {
        return (
            <div className={styles.container}>
                <div className={styles.box}>
                    <h1>Your email has been verified!</h1>
                    <p>You will be sent to the home page within 5 seconds.</p>
                </div>
            </div>
        );
    }

    if (isVerified && !verificationCompleted) {
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