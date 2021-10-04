export interface ForgotPasswordType {
    email: string;
}

export interface LoginCredentialsType extends ForgotPasswordType {
    password: string;
    remember_me: boolean;
}

export interface RegisterCredentialsType extends LoginCredentialsType {
    password_confirmation: string;
    name: string;
}

export type UserType = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
}

export interface AuthStateType {
    user?: UserType | null;
    loggedIn?: boolean;
    loading?: boolean;
}

export interface AuthContextType extends AuthStateType {
    login: (credentials: LoginCredentialsType) => void;
    logout: () => void;
    requestPasswordReset: (email?: string) => void;
    requestEmailChange: (email?: string) => void;
}