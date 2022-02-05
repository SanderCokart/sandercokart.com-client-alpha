import exp from 'constants';
import type {InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes} from 'react';
import {FontAwesomeIconType} from './CustomTypes';

type Options = Array<{ label: string, value: string }>

export interface CheckBoxProps extends InputHTMLAttributes<any> {
    name: string;
    label: string;
}

export interface CheckBoxGroupProps extends InputHTMLAttributes<any> {
    name: string;
    label?: string;
    options: Options;
}

export interface DateProps extends InputHTMLAttributes<any> {
    name: string;
    label?: string;
    type?: 'date' | 'datetime-local' | 'week' | 'time';
    prependIcon?: FontAwesomeIconType;
    appendIcon?: FontAwesomeIconType;
}

export interface InputProps extends InputHTMLAttributes<any> {
    name: string;
    label?: string;
    placeholder?: string;
    prependIcon?: FontAwesomeIconType;
    appendIcon?: FontAwesomeIconType;
    type?: 'password' | 'email' | 'text' | 'number';
}

export interface FileProps extends InputHTMLAttributes<any> {
    name: string;
    multiple?: boolean;
}

export interface RadioProps extends InputHTMLAttributes<any> {
    name: string;
    label?: string;
    options: Options;
}

export interface SelectProps extends SelectHTMLAttributes<any> {
    name: string;
    label?: string;
    prependIcon?: FontAwesomeIconType;
    appendIcon?: FontAwesomeIconType;
}


export interface TextAreaProps extends TextareaHTMLAttributes<any> {
    name: string;
    label?: string;
    prependIcon?: FontAwesomeIconType;
    appendIcon?: FontAwesomeIconType;
}

export interface SwitchProps {
    name: string;
    label?: string;
    icon?: FontAwesomeIconType;
    onToggle: (state: boolean) => void;
}

export interface UnregisteredInputProps extends InputHTMLAttributes<any> {
    name?: string;
    label?: string;
    placeholder?: string;
    prependIcon?: FontAwesomeIconType;
    appendIcon?: FontAwesomeIconType;
    type?: 'password' | 'email' | 'text' | 'number';
}