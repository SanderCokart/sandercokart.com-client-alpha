import {MDXRemoteSerializeResult} from 'next-mdx-remote';
import {ButtonHTMLAttributes, HTMLAttributes, TextareaHTMLAttributes} from 'react';
import type {FontAwesomeIconType, Middleware} from './CustomTypes';
import type {ArticleModel, UserModel} from './ModelTypes';
import {FileModel} from './ModelTypes';
import {CursorPaginationResponse} from './ResponseTypes';

export interface NavItemProps {
    href: string;
    icon: FontAwesomeIconType;
    text: string;
}

export interface DropdownProps {
    icon: FontAwesomeIconType;
    text: string;
}

export interface BlogProps {
    fallback: any;
}

export interface RecentPostLayoutProps {
    post: ArticleModel;
}

export interface MobileMenuProps {
    name: string;
    icon: FontAwesomeIconType;
    onClick: () => void;
    showSpan?: boolean;
    id?: string;
}

export interface MobileItemProps {
    onClick: () => void;
    name: string;
    href: string;
    icon: FontAwesomeIconType;
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
    post: ArticleModel;
}

export interface BlogPostProps {
    post: ArticleModel;
    mdxSource: MDXRemoteSerializeResult;
}

export interface PaginatedModelProviderProps {
    middleware?: Middleware;
    modelName: string;
    url: string;
}

export interface EditPostFormProps {
    post: ArticleModel;
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


export interface FileItemProps extends FileProps {
    file: File | FileModel,
    index: number
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

export interface CursorPaginationProviderProps {
    dataKey: string;
    url: string;
    middleware?: Middleware;
}

export interface MapCollectionsProps {
    collections: CursorPaginationResponse[];
}

export interface MapCollectionProps {
    collection: CursorPaginationResponse;
}

