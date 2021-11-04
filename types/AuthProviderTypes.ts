export interface ForgotPasswordPayload {
    email: string;
}

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

export interface ResetPasswordPayload {
    password: string,
    password_confirmation: string,
}

export interface ChangePasswordPayload {
    current_password: string,
    password: string,
    password_confirmation: string,
    sign_out_everywhere: boolean,
}

export interface ChangeEmailPayload {
    email: string;
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
    login?: (credentials: LoginPayload) => Promise<{ status: number }>;
    logout?: () => Promise<{ status: number }>;
    requestPasswordReset?: (payload: { email: string }) => Promise<{ status: number }>;
    check?: () => Promise<{ status: number }>;
    changePassword?: (values: ChangePasswordPayload) => Promise<{ status: number }>;
    changeEmail?: (values: ChangeEmailPayload) => Promise<{ status: number }>;
    verifyEmail?: () => Promise<{ status: number }>;
    resetPassword?: (payload: ResetPasswordPayload) => Promise<{ status: number }>;
}

export interface AuthContextProps extends AuthContextInitialProps {
    login: (credentials: LoginPayload) => Promise<{ status: number }>;
    logout: () => Promise<{ status: number }>;
    requestPasswordReset: (payload: ForgotPasswordPayload) => Promise<{ status: number }>;
    check: () => Promise<{ status: number }>;
    changePassword: (values: ChangePasswordPayload) => Promise<{ status: number }>;
    changeEmail: (values: ChangeEmailPayload) => Promise<{ status: number }>;
    verifyEmail: () => Promise<{ status: number }>;
    resetPassword: (payload: ResetPasswordPayload) => Promise<{ status: number }>;
}