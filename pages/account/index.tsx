import {useAuth} from '@/providers/AuthProvider';
import type {FC} from 'react';

export const Account: FC = () => {
  const {logout} = useAuth();

  return (
      <div>
        <button onClick={logout}>Logout</button>
      </div>
  );
};

export default Account;
