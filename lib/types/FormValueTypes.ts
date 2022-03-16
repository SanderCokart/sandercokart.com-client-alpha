import {FileModel, StatusModel} from '@/types/ModelTypes';

export interface CreatePostFormValues {
    title: string;
    excerpt: string;
    banner: FileModel[];
    status: StatusModel;
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
}

export interface EmailChangeFormValues {
    email: string;
}

export interface EmailCompromisedFormValues {
    password: string,
    password_confirmation: string
}