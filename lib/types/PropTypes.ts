import {MDXRemoteSerializeResult} from 'next-mdx-remote';
import {MutableRefObject} from 'react';
import type {FontAwesomeIcon} from './CustomTypes';
import type {Post, User} from './ModelTypes';
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
    post: Post;
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
    user: User;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

export interface PostRowProps {
    post: Post;
}

export interface BlogPostProps {
    post: Post;
    mdxSource: MDXRemoteSerializeResult;
}

export interface PaginatedModelProviderProps {
    model: string;
    middleware?: 'guest' | 'auth';
}

export interface EditPostFormProps {
    post: Post;
}

export interface MarkdownEditorProps {
    name: string;
}

export interface ToolbarProps {
    name:string;
}