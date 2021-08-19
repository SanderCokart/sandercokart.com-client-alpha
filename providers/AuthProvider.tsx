import {useApi} from '@/providers/ApiProvider';
import type {FC} from 'react';
import {createContext, useContext, useEffect, useState} from 'react';

export interface ForgotPassword {
  email: string;
}

export interface LoginCredentials extends ForgotPassword {
  password: string;
  remember_me: boolean;
}

export interface RegisterCredentials extends LoginCredentials {
  password_confirmation: string;
  name: string;
}

type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user?: User | null;
  loggedIn?: boolean;
  loading?: boolean;
}

interface AuthContext extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ status: number }>
  logout: () => void
}

export const AuthContext = createContext({} as AuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC = ({children}) => {
  const api = useApi();
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true
  });

  const sS = (override: AuthState): void => {
    setState(prevState => {
      return {...prevState, ...override};
    });
  };

  const login = (credentials: LoginCredentials) => {
    return api.post('/login', credentials)
        .then(({data, status}) => {
          sS({user: data.user, loading: false});
          return {status};
        })
        .catch(({status}) => {
          sS({loading: false});
          return {status};
        });
  };

  const logout = () => {
    api.post('/logout')
        .then(({status}) => {
          if (status === 200)
            sS({loading: false, user: null});
        })
        .catch(err => {
          sS({loading: false});
        });
  };

  useEffect(() => {
    api.get('/check')
        .then(({data, status}) => {
          sS({user: data.user, loading: false});
        })
        .catch(() => {
          sS({loading: false});
        });
  }, []);

  return (
      <AuthContext.Provider value={{...state, loggedIn: !!state.user, login, logout}}>
        {children}
      </AuthContext.Provider>
  );
};


export default AuthProvider;
