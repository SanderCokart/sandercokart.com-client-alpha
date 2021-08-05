import styles from '@/styles/Login.module.scss';
import {FC} from 'react';

export const Login: FC = () => {
  return (
      <div className={styles.login}>
        <form noValidate>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email"/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password"/>
          </div>
          <div>
            <label htmlFor="remember_me">Remember me</label>
            <input id="remember_me" type="checkbox"/>
          </div>
        </form>
      </div>
  );
};

export default Login;
