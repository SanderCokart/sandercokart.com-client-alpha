import LabelErrorAccessory from '@/components/formComponents/LabelErrorAccessory/LabelErrorAccessory';
import styles from './Textarea.module.scss';
import type {ChangeEvent} from 'react';
import {TextareaHTMLAttributes, HTMLAttributes, LabelHTMLAttributes} from 'react';
import Skeleton from 'react-loading-skeleton';
import {UseFormRegisterReturn} from 'react-hook-form';


interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    loading?: boolean;
    name?: string;
    label?: string;
    registerFormHook?: UseFormRegisterReturn;
    containerProps?: HTMLAttributes<HTMLDivElement>;
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

const Textarea = (props: TextareaProps) => {
    const {
        loading = false,
        containerProps = undefined,
        labelProps = undefined,
        name = undefined,
        label = undefined,
        onChange = undefined,
        onBlur = undefined,
        registerFormHook,
        ...restOfProps
    } = props;

    const nameAndId = registerFormHook?.name || name || '';

    const autoGrow = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };


    return (
        <div className={styles.control} {...containerProps}>
            {label && <label className={styles.label} {...labelProps} htmlFor={nameAndId}>{label}</label>}

            {registerFormHook && <LabelErrorAccessory name={nameAndId}/>}

            <div className={styles.inputContainer}>

                {loading ? (
                    <Skeleton borderRadius={0} className={styles.textarea} duration={.75} style={{ padding: 0 }}/>
                ) : (
                     <textarea
                         ref={(el) => {
                             registerFormHook?.ref(el);
                         }}
                         className={styles.textarea}
                         onBlur={(e) => {
                             registerFormHook?.onBlur(e);
                             onBlur?.(e);
                         }}
                         onChange={(e) => {
                             registerFormHook?.onChange(e);
                             onChange?.(e);
                             autoGrow(e);
                         }}
                         {...restOfProps}
                         id={nameAndId}
                         name={nameAndId}/>
                 )}
            </div>
        </div>
    );
};

export default Textarea;