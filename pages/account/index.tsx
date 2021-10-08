import {useAuth} from '@/providers/AuthProvider';
import type {FC} from 'react';

export const Account: FC = () => {
    const { logout, requestPasswordReset, requestEmailChange, isVerified } = useAuth();

    const handleRequestPasswordReset = () => {
        requestPasswordReset();
    };

    const handleRequestEmailChange = () => {
        requestEmailChange();
    };

    return (
        <div>
            {!isVerified && <p>Please verify your email! <br/> You will have limited functionality while your email is not verified!</p>}
            <button onClick={logout}>Logout</button>
            <button onClick={handleRequestPasswordReset}>Request Password Reset</button>
            <button onClick={handleRequestEmailChange}>Request Email Change</button>
        </div>
    );
};

export default Account;
