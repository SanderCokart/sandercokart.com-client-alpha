import {User} from '@/types/ModelTypes';

export interface LoginPayload {
    email: string;
    password: string;
    remember_me: boolean;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface PasswordForgotPayload {
    email: string;
}

export interface PasswordResetPayload {
    password: string,
    password_confirmation: string,
}

export interface PasswordChangePayload {
    current_password: string,
    password: string,
    password_confirmation: string,
    sign_out_everywhere: boolean,
}

export interface EmailChangePayload {
    email: string;
}

export interface EmailCompromisedPayload {
    password: string,
    password_confirmation: string
}

export interface AuthContextInitialProps {
    user: User | null;
    loggedIn: boolean;
    isAdmin: boolean;
    isVerified: boolean;
    loading: boolean;
    justVerified: boolean;
    login?: (credentials: LoginPayload) => Promise<{ status: number }>;
    logout?: () => Promise<{ status: number }>;
    check?: () => Promise<{ status: number }>;
}

export interface AuthContextProps extends AuthContextInitialProps {
    login: (credentials: LoginPayload) => Promise<{ status: number }>;
    logout: () => Promise<{ status: number }>;
    check: () => Promise<{ status: number }>;
}