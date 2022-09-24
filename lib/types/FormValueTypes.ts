import type {FileModel, RoleModel} from '@/types/ModelTypes';

export interface CreatePostFormValues {
    title: string;
    excerpt: string;
    markdown: string;
    banner: FileModel[];
    published: boolean;
}

export type EditPostFormValues = CreatePostFormValues

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

export interface PasswordCompromisedFormValues {
    password: string,
    password_confirmation: string
}

export interface EmailChangeFormValues {
    email: string;
}

export interface EmailCompromisedFormValues {
    email: string;
    password: string,
    password_confirmation: string
}

export interface CreateUserFormValues {
    name: string;
    email: string;
    password: string;
    roles: RoleModel[];
}

export interface EditUserFormValues {
    name: string;
    email: string;
    roles: number[];
}