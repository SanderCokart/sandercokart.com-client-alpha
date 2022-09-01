import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {InputHTMLAttributes, HTMLAttributes, LabelHTMLAttributes} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';

import LabelErrorAccessory from '@/components/formComponents/LabelErrorAccessory/LabelErrorAccessory';

import styles from './Checkbox.module.scss';


interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    loading?: boolean;
    name?: string;
    label?: string;
    registerFormHook?: UseFormRegisterReturn;
    containerProps?: HTMLAttributes<HTMLDivElement>;
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

const Checkbox = (props: CheckboxProps) => {
    const {
        loading = false,
        containerProps = undefined,
        labelProps = undefined,
        name = undefined,
        label = undefined,
        onBlur = undefined,
        onChange = undefined,
        registerFormHook,
        ...restOfProps
    } = props;

    const nameAndId = registerFormHook?.name || name || '';

    return (
        <div className={styles.control} {...containerProps}>
            <label className={styles.label} {...labelProps} htmlFor={nameAndId}>
                {label}
                <input
                    ref={(el) => {
                        registerFormHook?.ref(el);
                    }}
                    className={styles.input}
                    id={nameAndId}
                    name={nameAndId}
                    {...restOfProps}
                    type="checkbox"
                    onBlur={(e) => {
                        registerFormHook?.onBlur(e);
                        onBlur?.(e);
                    }}
                    onChange={(e) => {
                        registerFormHook?.onChange(e);
                        onChange?.(e);
                    }}/>
                <div className={styles.checkbox}>
                    <FontAwesomeIcon icon="check"/>
                </div>
            </label>
            <LabelErrorAccessory name={nameAndId}/>
        </div>
    );
};

export default Checkbox;