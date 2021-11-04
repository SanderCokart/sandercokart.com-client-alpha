import type {IconName, IconPrefix} from '@fortawesome/fontawesome-svg-core';
import type {InputHTMLAttributes, TextareaHTMLAttributes} from 'react';

export interface CheckBoxProps {
    name: string;
    label: string;
}

export interface CheckBoxGroupProps {
    name: string;
    label?: string;
    options: Array<{ key: string, value: string }>;
}

export interface DatePickerProps {
    name: string;
    label?: string;
    type?: 'date' | 'datetime-local' | 'week' | 'time';
    prependIcon?: [IconPrefix, IconName];
    appendIcon?: [IconPrefix, IconName];
}

export interface InputProps extends InputHTMLAttributes<any> {
    name: string;
    label?: string;
    placeholder?: string;
    prependIcon?: [IconPrefix, IconName];
    appendIcon?: [IconPrefix, IconName];
    type?: 'password' | 'email' | 'text' | 'file';
}

export interface FileProps extends InputHTMLAttributes<any> {
    name: string;
    placeholder?: string;
    multiple?: boolean;
}

export interface RadioProps {
    name: string;
    label?: string;
    options: Array<{ key: string, value: string }>;
}

export interface SelectProps {
    name: string;
    label?: string;
    prependIcon?: [IconPrefix, IconName];
    appendIcon?: [IconPrefix, IconName];
    options: Array<{ key: string, value: string }>;
}


export interface TextAreaProps extends TextareaHTMLAttributes<any> {
    name: string;
    label?: string;
    prependIcon?: [IconPrefix, IconName];
    appendIcon?: [IconPrefix, IconName];
}
