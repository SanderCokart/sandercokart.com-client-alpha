import {useApi} from '@/providers/ApiProvider';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/account/email/VerifyEmail.module.scss';
import {useRouter} from 'next/router';
import type {FC} from 'react';
import {useEffect} from 'react';

export const VerifyEmail: FC = () => {
  const router = useRouter();
  const api = useApi();
  const {user} = useAuth();

  const {query: {user: userQuery, hash, expires, signature}, isReady} = router;

  const timeOutAction = () => {
    setTimeout(() => {
      router.push('/blog/recent');
    }, 3000);
  };

  useEffect(() => {
    if (isReady && user?.email_verified_at) {
      api.get(`/account/email/verify/${userQuery}/${hash}?expires=${expires}&signature=${signature}`)
          .then((res) => {
            if (res.status === 200) timeOutAction();
          })
          .catch(err => {
            console.log(err);
          });
    } else {
      timeOutAction();
    }
  }, []);


  if (user?.email_verified_at)
    return (
        <div className={styles.container}>
          <h1>Email has already been verified!</h1>
          <p>You will be redirected to the dashboard shortly!</p>
        </div>
    );

  return (
      <div className={styles.container}>
        <h1>Email Verified</h1>
        <p>You will be redirected to the dashboard shortly!</p>
      </div>
  );
};

export default VerifyEmail;
