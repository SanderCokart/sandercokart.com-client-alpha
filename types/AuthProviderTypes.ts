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

export interface UserType {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
}

export interface AuthContextInitialProps {
    user: UserType | null;
    loggedIn: boolean;
    isVerified: boolean;
    loading: boolean;
    justVerified: boolean;
    login?: (credentials: LoginCredentialsType) => Promise<{ status: number }>;
    logout?: () => Promise<{ status: number }>;
    requestPasswordReset?: (email?: string) => Promise<{ status: number }>;
    requestEmailChange?: (email?: string) => Promise<{ status: number }>;
    oS?: (override: Partial<AuthContextInitialProps>) => void;
    check?: () => Promise<{ status: number }>;
}

export interface AuthContextProps extends AuthContextInitialProps {
    user: UserType;
    login: (credentials: LoginCredentialsType) => Promise<{ status: number }>;
    logout: () => Promise<{ status: number }>;
    requestPasswordReset: (email?: string) => Promise<{ status: number }>;
    requestEmailChange: (email?: string) => Promise<{ status: number }>;
    oS: (override: Partial<AuthContextInitialProps>) => void;
    check: () => Promise<{ status: number }>;
}