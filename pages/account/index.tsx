import {useAuth} from '@/providers/AuthProvider';
import type {FC} from 'react';

export const Account: FC = () => {
  const {logout, requestPasswordReset, requestEmailChange} = useAuth();

  const handleRequestPasswordReset = () => {
    requestPasswordReset();
  };

  const handleRequestEmailChange = () => {
    requestEmailChange();
  };

  return (
      <div>
        <button onClick={logout}>Logout</button>
        <button onClick={handleRequestPasswordReset}>Request Password Reset</button>
        <button onClick={handleRequestEmailChange}>Request Email Change</button>
      </div>
  );
};

export default Account;
