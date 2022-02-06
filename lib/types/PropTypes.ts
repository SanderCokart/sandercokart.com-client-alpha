import {MDXRemoteSerializeResult} from 'next-mdx-remote';
import {
    ButtonHTMLAttributes,
    HTMLAttributes,
    InputHTMLAttributes,
    LabelHTMLAttributes, MutableRefObject, SelectHTMLAttributes,
    TextareaHTMLAttributes
} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';
import type {FontAwesomeIconType, Middleware} from './CustomTypes';
import type {ArticleModel, UserModel} from './ModelTypes';
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

export interface MapCollectionProps {
    collection: CursorPaginationResponse;
}

export interface SwitchProps {
    name: string;
    label?: string;
    icon?: FontAwesomeIconType;
    onToggle: (state: boolean) => void;
}

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    loading?: boolean;
    name?: string;
    label?: string;
    registerFormHook?: UseFormRegisterReturn;
    containerProps?: HTMLAttributes<HTMLDivElement>;
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

export interface CheckboxGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    loading?: boolean;
    name?: string;
    label?: string;
    registerFormHook?: UseFormRegisterReturn;
    containerProps?: HTMLAttributes<HTMLDivElement>;
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
    nestedLabelProps?: LabelHTMLAttributes<HTMLLabelElement>;
    options: FormRadioCheckboxOptions[];
}

interface FormRadioCheckboxOptions {
    label: string;
    value: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    loading?: boolean;
    name?: string;
    label?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'color' | 'date' | 'datetime-local' | 'week' | 'time';
    registerFormHook?: UseFormRegisterReturn;
    prependIcon?: { icon: FontAwesomeIconType, onClick?: (ref: MutableRefObject<HTMLInputElement | null>) => void },
    appendIcon?: { icon: FontAwesomeIconType, onClick?: (ref: MutableRefObject<HTMLInputElement | null>) => void },
    containerProps?: HTMLAttributes<HTMLDivElement>;
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

export interface LabelErrorAccessoryProps extends HTMLAttributes<HTMLSpanElement>{
    name: string;
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    loading?: boolean;
    name?: string;
    label?: string;
    registerFormHook?: UseFormRegisterReturn;
    containerProps?: HTMLAttributes<HTMLDivElement>;
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
    nestedLabelProps?: LabelHTMLAttributes<HTMLLabelElement>;
    options: FormRadioCheckboxOptions[];
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    loading?: boolean;
    name?: string;
    label?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'color' | 'date' | 'datetime-local' | 'week' | 'time';
    registerFormHook?: UseFormRegisterReturn;
    prependIcon?: { icon: FontAwesomeIconType, onClick?: (ref: MutableRefObject<HTMLSelectElement | null>) => void },
    appendIcon?: { icon: FontAwesomeIconType, onClick?: (ref: MutableRefObject<HTMLSelectElement | null>) => void },
    containerProps?: HTMLAttributes<HTMLDivElement>;
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    loading?: boolean;
    name?: string;
    label?: string;
    registerFormHook?: UseFormRegisterReturn;
    containerProps?: HTMLAttributes<HTMLDivElement>;
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}