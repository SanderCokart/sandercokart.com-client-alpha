import styles from '@/styles/CreateAccount.module.scss';
import {useApi} from 'providers/ApiProvider';
import {ChangeEvent, FC, FormEvent, useState} from 'react';


export const CreateAccount: FC = () => {
  const api = useApi();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });


  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.post('/register', form).then(({status, data}) => {
      if (status === 200)
        console.log(data);
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };

  return (
      <div className={styles.createAccount}>
        <form noValidate onSubmit={onSubmit}>
          <div>
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" type="text" onChange={onChange}/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" onChange={onChange}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" onChange={onChange}/>
          </div>
          <div>
            <label htmlFor="password_confirmation">Password Confirmation</label>
            <input id="password_confirmation" name="password_confirmation" type="password" onChange={onChange}/>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
  );
};

export default CreateAccount;
