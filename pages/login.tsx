import styles from '@/styles/Login.module.scss';
import Link from 'next/link';
import {FC} from 'react';

export const Login: FC = () => {
  return (
      <div className={styles.login}>
        <form noValidate className={styles.form}>

          <div className={styles.inputs}>
            <div className={styles.formControl}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email"/>
            </div>
            <div className={styles.formControl}>
              <label htmlFor="password">Password</label>
              <input id="password" type="password"/>
            </div>
            <div className={styles.remember}>
              <label htmlFor="remember_me">Remember me</label>
              <input id="remember_me" type="checkbox"/>
            </div>
          </div>

          <div className={styles.links}>
            <Link href="/password/forgot">
              <a>Forgot password?</a>
            </Link>
            <Link href="/account/create">
              <a>Don't have an account yet?</a>
            </Link>
          </div>
        </form>
      </div>
  );
};

export default Login;
