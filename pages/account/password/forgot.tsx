import {useApi} from '@/providers/ApiProvider';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/PasswordForgot.module.scss';
import Head from 'next/head';
import type {ChangeEvent, FC, FormEvent} from 'react';
import {useState} from 'react';

export const PasswordForgot: FC = () => {
  const api = useApi();
  const {requestPasswordReset} = useAuth();

  const [email, setEmail] = useState('');


  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    requestPasswordReset(email);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
      <div className={styles.outerContainer}>
        <Head>
          <title>Forgot Password - sandercokart.com</title>
          <meta content="Reset your password" name="description"/>
        </Head>

        <div className={styles.innerContainer}>
          <header>
            <h1>Forgot your password?</h1>
          </header>

          <main>
            <form noValidate onSubmit={onSubmit}>
              <label>
                E-Mail
                <input name="email" type="email" value={email} onChange={onChange}/>
              </label>
              <button type="submit">Request new password</button>
            </form>
          </main>
        </div>
      </div>
  );
};

export default PasswordForgot;
