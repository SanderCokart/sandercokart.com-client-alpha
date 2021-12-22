import {AxiosError} from 'axios';
import {CustomApiPromise} from './CustomTypes';
import {LoginFormValues} from './FormValueTypes';
import type {User} from './ModelTypes';


// export interface AuthContextInitialProps {
//     user: User | null;
//     loggedIn: boolean;
//     isAdmin: boolean;
//     isVerified: boolean;
//     loading: boolean;
//     justVerified: boolean;
//     login?: (credentials: LoginFormValues) => Promise<{ status: number }>;
//     logout?: () => Promise<{ status: number }>;
//     check?: () => Promise<{ status: number }>;
// }
//
// export interface AuthContextProps extends AuthContextInitialProps {
//     login: (credentials: LoginFormValues) => Promise<{ status: number }>;
//     logout: () => Promise<{ status: number }>;
//     check: () => Promise<{ status: number }>;
// }

export interface AuthContextType {
    user: User | null;
    error: Error | AxiosError;
    csrf: () => void;
    logout: () => Promise<CustomApiPromise>;
    login: (props: LoginFormValues) => Promise<CustomApiPromise>;
    isLoading: boolean;
    isAdmin: boolean;
    isVerified: boolean;
    loggedIn: boolean;
}