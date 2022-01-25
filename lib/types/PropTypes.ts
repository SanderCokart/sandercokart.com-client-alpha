import {MDXRemoteSerializeResult} from 'next-mdx-remote';
import {ButtonHTMLAttributes, HTMLAttributes, TextareaHTMLAttributes} from 'react';
import type {FontAwesomeIcon} from './CustomTypes';
import type {PostModel, UserModel} from './ModelTypes';
import type {PostsResponse} from './ResponseTypes';

export interface NavItemProps {
    href: string;
    icon: FontAwesomeIcon;
    text: string;
}

export interface DropdownProps {
    icon: FontAwesomeIcon;
    text: string;
}

export interface BlogProps {
    initialData: PostsResponse;
}

export interface RecentPostLayoutProps {
    post: PostModel;
}

export interface MobileMenuProps {
    name: string;
    icon: FontAwesomeIcon;
    onClick: () => void;
    showSpan?: boolean;
    id?: string;
}

export interface MobileItemProps {
    onClick: () => void;
    name: string;
    href: string;
    icon: FontAwesomeIcon;
}

export interface PortalNavItemProps {
    href: string;
    text: string;
}

export interface UserRowProps {
    user: UserModel;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

export interface PostRowProps {
    post: PostModel;
}

export interface BlogPostProps {
    post: PostModel;
    mdxSource: MDXRemoteSerializeResult;
}

export interface PaginatedModelProviderProps {
    middleware?: 'guest' | 'auth';
    modelName: string;
    url: string;
}

export interface EditPostFormProps {
    post: PostModel;
}

export interface MarkdownEditorProps extends HTMLAttributes<HTMLDivElement> {
    name: string;
    textareaProps?: TextareaHTMLAttributes<any>;
}

export interface ToolbarProps {
    name: string;
}

export interface FileProps {
    editMode?: boolean;
    multiple?: boolean;
    name: string;
}

export interface FileDropBoxProps {
    editMode?: boolean;
    multiple?: boolean;
    name: string;
}

export interface FilePreviewCarouselProps {
    editMode?: boolean;
    multiple?: boolean;
    name: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<any> {

}