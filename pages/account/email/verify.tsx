// import Loader from '@/components/Loader';
// import axios from '@/functions/shared/axios';
// import {useAuth} from '@/providers/AuthProvider';
// import styles from '@/styles/pages/account/email/VerifyEmail.module.scss';
// import {useRouter} from 'next/router';
// import {useEffect, useState} from 'react';
// import {useSWRConfig} from 'swr';
//
// const VerifyEmail = () => {
//     const { isLoading, loggedIn, isVerified } = useAuth();
//     const router = useRouter();
//     const { mutate } = useSWRConfig();
//     const { query } = router;
//     const { user, hash, type, signature, expires } = query;
//
//     const [verificationCompleted, setVerificationCompleted] = useState(false);
//
//
//     const verifyEmail = async () => {
//         const { data } = await axios.simplePost(`/account/email/verify/${user}/${hash}`, null, {
//             params: { expires, type, signature }
//         });
//
//         if (data) setVerificationCompleted(true);
//         mutate('/user');
//     };
//
//     useEffect(() => {
//         if (router.isReady) {
//             if (loggedIn && !isVerified && !verificationCompleted) verifyEmail();
//
//             else if (loggedIn && verificationCompleted)
//                 setTimeout(() => {
//                     router.replace('/');
//                 }, 5000);
//
//             else if (isVerified && !verificationCompleted)
//                 setTimeout(() => {
//                     router.replace('/');
//                 }, 5000);
//
//             else if (!loggedIn && !isLoading)
//                 setTimeout(() => {
//                     router.replace({
//                         pathname: '/login',
//                         query: router.query
//                     });
//                 }, 5000);
//         }
//
//
//     }, [loggedIn, isVerified, verificationCompleted, router, isLoading]);
//
//     if (!loggedIn && !isLoading) {
//         return (
//             <div className={styles.container}>
//                 <div className={styles.box}>
//                     <h1>Please login to verify your email.</h1>
//                     <p>You will be sent to the login page within 5 seconds to deal with this matter.</p>
//                 </div>
//             </div>
//         );
//     }
//
//     if (loggedIn && verificationCompleted) {
//         return (
//             <div className={styles.container}>
//                 <div className={styles.box}>
//                     <h1>Your email has been verified!</h1>
//                     <p>You will be sent to the home page within 5 seconds.</p>
//                 </div>
//             </div>
//         );
//     }
//
//     if (isVerified && !verificationCompleted) {
//         return (
//             <div className={styles.container}>
//                 <div className={styles.box}>
//                     <h1>Your email has already been verified!</h1>
//                     <p>You will be sent to the home page within 5 seconds.</p>
//                 </div>
//             </div>
//         );
//     }
//
//     return <Loader/>;
// };
//
// export default VerifyEmail;

import {useRouter} from 'next/router';
import Loader from '@/components/Loader';
import BoxContainer from '@/components/BoxContainer';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/pages/account/email/VerifyEmail.module.scss';
import {useEffect, useState} from 'react';
import axios from '@/functions/shared/axios';
import {useSWRConfig} from 'swr';
import useRedirect from '@/hooks/useRedirect';

const UserMustLogin = () => {
    useRedirect('/login', true);
    return (
        <BoxContainer center>
            <h1>Please login to verify your email.</h1>
            <p className={styles.notice}>You will be sent to the login page within 5 seconds to deal with this
                matter.</p>
        </BoxContainer>
    );
};

const UserIsAlreadyVerified = () => {
    useRedirect('/');
    return (
        <BoxContainer center>
            <h1>You are already verified!</h1>
            <p className={styles.notice}>You will be sent back to the home page within 5 seconds.</p>
        </BoxContainer>
    );
};

const UserHasBeenVerified = () => {
    useRedirect('/');
    return (
        <BoxContainer center>
            <h1>Your email has been verified!</h1>
            <p className={styles.notice}>You will be sent back to the home page within 5 seconds.</p>
        </BoxContainer>
    );
};

const VerifyEmailPage = () => {
    const { isLoggedIn, isVerified, isLoading: authIsLoading } = useAuth();
    const router = useRouter();
    const { mutate } = useSWRConfig();
    const { query } = router;
    const { identifier, token } = query;
    const [isNotLoggedIn, setIsNotLoggedIn] = useState(false);
    const [alreadyVerified, setAlreadyVerified] = useState(false);
    const [verificationCompleted, setVerificationCompleted] = useState(false);


    useEffect(() => {
        if (router.isReady && !authIsLoading) {
            if (!isLoggedIn) setIsNotLoggedIn(true);
            else if (isVerified) setAlreadyVerified(true);
            else if (!verificationCompleted) verifyEmail();
        }
    }, [router.isReady, authIsLoading, verificationCompleted]);

    const verifyEmail = async () => {
        const response = await axios.simplePost('/account/email/verify', { identifier, token });
        if (response.type === 'success') {
            setVerificationCompleted(true);
            mutate('/account/user', { identifier, token }, false);
        }
    };

    if (!authIsLoading) {
        if (isNotLoggedIn) return <UserMustLogin/>;
        else if (alreadyVerified) return <UserIsAlreadyVerified/>;
        else if (!alreadyVerified && !isNotLoggedIn) {
            return <UserHasBeenVerified/>;
        }
    }
    return (
        <BoxContainer>
            <Loader visible={true}/>
        </BoxContainer>
    );
};

export default VerifyEmailPage;