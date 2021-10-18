import {useApi} from '@/providers/ApiProvider';
import styles from '@/styles/account/PasswordReset.module.scss';
import Head from 'next/head';
import {useRouter} from 'next/router';
import type {ChangeEvent, FC, FormEvent} from 'react';
import {useState} from 'react';

export const PasswordReset: FC = () => {
  const api = useApi();
  const router = useRouter();
  const {query} = router; //token and email

  const [form, setForm] = useState({
    password: '',
    password_confirmation: '',
    ...query
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.patch('/password/reset', form)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.error(err);
        });
  };

  return (
      <div className={styles.outerContainer}>
        <Head>
          <title>Demo App | Reset Password</title>
          <meta content="Reset your password" name="description"/>
        </Head>

        <div className={styles.innerContainer}>
          <header>
            <h1>Reset Password</h1>
          </header>

          <main>
            <form noValidate onSubmit={onSubmit}>
              <label>
                Password
                <input name="password" type="password" value={form.password} onChange={onChange}/>
              </label>
              <label>
                Password Confirmation
                <input name="password_confirmation" type="password" value={form.password_confirmation} onChange={onChange}/>
              </label>
              <button type="submit">Confirm new password</button>
            </form>
          </main>
        </div>
      </div>
  );
};

export default PasswordReset;
