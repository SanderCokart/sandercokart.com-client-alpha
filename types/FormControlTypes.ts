import type {IconName, IconPrefix} from '@fortawesome/fontawesome-svg-core';
import type {InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes} from 'react';
import {ErrorOption} from 'react-hook-form';

type Options = Array<{ label: string, value: string }>

export interface CheckBoxProps extends InputHTMLAttributes<any> {
    label: string;
    error: ErrorOption;
}

export interface CheckBoxGroupProps extends InputHTMLAttributes<any> {
    label?: string;
    options: Options;
    error: ErrorOption;
}

export interface DateProps extends InputHTMLAttributes<any> {
    label?: string;
    type?: 'date' | 'datetime-local' | 'week' | 'time';
    prependIcon?: [IconPrefix, IconName];
    appendIcon?: [IconPrefix, IconName];
    error: ErrorOption;
}

export interface InputProps extends InputHTMLAttributes<any> {
    label?: string;
    placeholder?: string;
    prependIcon?: [IconPrefix, IconName];
    appendIcon?: [IconPrefix, IconName];
    type?: 'password' | 'email' | 'text';
    error: ErrorOption;
}

export interface FileProps extends InputHTMLAttributes<any> {
    placeholder?: string;
    multiple?: boolean;
}

export interface RadioProps extends InputHTMLAttributes<any> {
    label?: string;
    options: Options;
    error: ErrorOption;
}

export interface SelectProps extends SelectHTMLAttributes<any> {
    label?: string;
    prependIcon?: [IconPrefix, IconName];
    appendIcon?: [IconPrefix, IconName];
    error: ErrorOption;
}


export interface TextAreaProps extends TextareaHTMLAttributes<any> {
    label?: string;
    prependIcon?: [IconPrefix, IconName];
    appendIcon?: [IconPrefix, IconName];
    error: ErrorOption;
}
