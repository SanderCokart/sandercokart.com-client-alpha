export interface CreatePostFormValues {
    title: string;
    excerpt: string;
    banner_image: object;
    markdown: string;
}

export interface LoginFormValues {
    email: string;
    password: string;
    remember_me: boolean;
}

export interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface PasswordForgotFormValues {
    email: string;
}

export interface PasswordResetFormValues {
    password: string,
    password_confirmation: string,
}

export interface PasswordChangeFormValues {
    current_password: string,
    password: string,
    password_confirmation: string,
    sign_out_everywhere: boolean,
}

export interface EmailChangeFormValues {
    email: string;
}

export interface EmailCompromisedFormValues {
    password: string,
    password_confirmation: string
}