import type {LoginCredentials} from '@/providers/AuthProvider';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/Login.module.scss';
import Link from 'next/link';
import {useRouter} from 'next/router';
import type {ChangeEvent, FC, FormEvent} from 'react';
import {useState} from 'react';

export const Login: FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    remember_me: false
  });

  const router = useRouter();
  const {login} = useAuth();
  const {query} = router;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevState) => {
      return ({
        ...prevState,
        [e.target.name]: e.target.name === 'remember_me' ? e.target.checked : e.target.value
      });
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(credentials).then(({status}) => {
      if (status === 200) {
        if (query?.type === 'verify_email')
          return router.push({pathname: '/account/email/verify', query});
        return router.push('/blog/recent');
      }
    });
  };


  return (
      <div className={styles.login}>
        <form noValidate className={styles.form} onSubmit={onSubmit}>

          <div className={styles.inputs}>
            <div className={styles.formControl}>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" onChange={onChange}/>
            </div>
            <div className={styles.formControl}>
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" onChange={onChange}/>
            </div>
            <div className={styles.remember}>
              <label htmlFor="remember_me">Remember me</label>
              <input id="remember_me" name="remember_me" type="checkbox" onChange={onChange}/>
            </div>
            <div>
              <button type="submit">Submit</button>
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
