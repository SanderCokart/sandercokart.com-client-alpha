import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useSWRConfig} from 'swr';

import BoxContainer from '@/components/BoxContainer';
import {DummyLoader} from '@/components/Loader';

import {ApiGetUserRoute, ApiPostEmailVerifyRoute} from '@/constants/api-routes';
import {LocalHomePageRoute} from '@/constants/local-routes';

import axios from '@/functions/shared/axios';

import useRedirect from '@/hooks/useRedirect';

import {useAuthV2} from '@/providers/AuthProviderV2';

import styles from '@/styles/pages/account/email/VerifyEmail.module.scss';

const UserMustLogin = () => {
    const { setRedirect } = useAuthV2();
    const { asPath } = useRouter();
    setRedirect(asPath);

    return (
        <BoxContainer center>
            <h1>Please login to verify your email.</h1>
            <p className={styles.notice}>You will be sent to the login page within 5 seconds to deal with this
                matter.</p>
        </BoxContainer>
    );
};

const UserIsAlreadyVerified = () => {
    useRedirect({ url: LocalHomePageRoute, timeout: 5000 });
    return (
        <BoxContainer center>
            <h1>You are already verified!</h1>
            <p className={styles.notice}>You will be sent back to the home page within 5 seconds.</p>
        </BoxContainer>
    );
};

const UserHasBeenVerified = () => {
    useRedirect({ url: LocalHomePageRoute, timeout: 5000 });
    return (
        <BoxContainer center>
            <h1>Your email has been verified!</h1>
            <p className={styles.notice}>You will be sent back to the home page within 5 seconds.</p>
        </BoxContainer>
    );
};

const VerifyEmailPage = () => {
    const { isLoggedIn, isVerified, initializing } = useAuthV2();
    const router = useRouter();
    const { mutate } = useSWRConfig();
    const { query } = router;
    const { identifier, token } = query;
    const [isNotLoggedIn, setIsNotLoggedIn] = useState(false);
    const [alreadyVerified, setAlreadyVerified] = useState(false);
    const [verificationCompleted, setVerificationCompleted] = useState(false);

    useEffect(() => {
        if (router.isReady && !initializing) {
            if (!isLoggedIn) setIsNotLoggedIn(true);
            else if (isVerified) setAlreadyVerified(true);
            else if (!verificationCompleted) verifyEmail();
        }
    }, [router.isReady, initializing, verificationCompleted]);

    const verifyEmail = async () => {
        const response = await axios.simplePost(ApiPostEmailVerifyRoute, { identifier, token });
        if (response.type === 'success') {
            setVerificationCompleted(true);
            mutate(ApiGetUserRoute);
        }
    };

    if (!initializing) {
        if (isNotLoggedIn) return <UserMustLogin/>;
        else if (alreadyVerified) return <UserIsAlreadyVerified/>;
        else if (!alreadyVerified && !isNotLoggedIn) {
            return <UserHasBeenVerified/>;
        }
    }

    return null;
};

export default VerifyEmailPage;

VerifyEmailPage.requireAuth = true;
VerifyEmailPage.redirectTimeout = 5000;
VerifyEmailPage.disableLoader = true;