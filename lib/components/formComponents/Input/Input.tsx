import type {IconLookup} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import type {InputHTMLAttributes, MutableRefObject, HTMLAttributes, LabelHTMLAttributes} from 'react';
import {useCallback, useEffect, useRef} from 'react';
import type {UseFormRegisterReturn} from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import ConditionalButtonWrapper from '@/components/formComponents/ConditionalButtonWrapper/ConditionalButtonWrapper';
import LabelErrorAccessory from '@/components/formComponents/LabelErrorAccessory/LabelErrorAccessory';

import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    loading?: boolean;
    name?: string;
    label?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'datetime-local' | 'week' | 'time';
    registerFormHook?: UseFormRegisterReturn;
    prependIcon?: { icon: IconLookup, onClick?: (ref: MutableRefObject<HTMLInputElement | null>) => void },
    appendIcon?: { icon: IconLookup, onClick?: (ref: MutableRefObject<HTMLInputElement | null>) => void },
    containerProps?: HTMLAttributes<HTMLDivElement>;
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
    centered?: boolean;
}

const Input = (props: InputProps) => {
    const inputRef = useRef<null | HTMLInputElement>(null);
    const {
        type = 'text',
        loading = false,
        centered = false,
        appendIcon = undefined,
        prependIcon = undefined,
        containerProps = undefined,
        labelProps = undefined,
        name = undefined,
        label = undefined,
        onChange = undefined,
        onBlur = undefined,
        className = undefined,
        registerFormHook,
        ...restOfProps
    } = props;

    const handleNumberScrollingOnWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLInputElement;

        const max = Number(target.max);
        const min = Number(target.min);
        const value = Number(target.value);

        const dispatchOnChange = () => {
            target.dispatchEvent(new Event('change', { bubbles: true }));
        };

        if ((e.deltaY < 0) && (!!max ? value < max : true)) {
            inputRef.current?.stepUp();
            dispatchOnChange();
        } else if ((e.deltaY > 0) && (!!min ? value > min : true)) {
            inputRef.current?.stepDown();
            dispatchOnChange();
        }

    }, []);

    useEffect(() => {
        if (type === 'number') {
            inputRef.current?.addEventListener('wheel', handleNumberScrollingOnWheel);
        }
        return () => {
            if (type === 'number') {
                inputRef.current?.removeEventListener('wheel', handleNumberScrollingOnWheel);
            }
        };
    }, []);

    const nameAndId = registerFormHook?.name || name || '';

    const classNames = classnames([
        styles.input,
        (prependIcon) && styles.withPrependIcon,
        (appendIcon) && styles.withAppendIcon,
        (centered) && styles.centered,
        className
    ]);

    return (
        <div className={styles.control} {...containerProps}>
            {label && <label className={styles.label} {...labelProps} htmlFor={nameAndId}>{label}</label>}

            {registerFormHook && <LabelErrorAccessory name={nameAndId}/>}

            <div className={styles.inputContainer}>
                {prependIcon && (
                    <ConditionalButtonWrapper
                        className={styles.iconButtonPrepend}
                        condition={!!prependIcon.onClick}
                        onClick={() => {
                            !!prependIcon.onClick && prependIcon.onClick(inputRef);
                        }}
                        onKeyUp={e => {
                            if (['Enter', 'Space'].includes(e.key)) {
                                !!prependIcon.onClick && prependIcon.onClick(inputRef);
                            }
                        }}>
                        <FontAwesomeIcon
                            className={!!prependIcon.onClick ? undefined : styles.iconPrepend}
                            icon={prependIcon.icon}
                        />
                    </ConditionalButtonWrapper>
                )}

                {loading ? (
                    <Skeleton
                        borderRadius={0}
                        className={styles.input}
                        height="31px"
                        style={{ padding: 0 }}/>
                ) : (
                     <input
                         ref={(el) => {
                             registerFormHook?.ref(el);
                             inputRef.current = el;
                         }}
                         className={classNames}
                         onBlur={(e) => {
                             registerFormHook?.onBlur(e);
                             onBlur?.(e);
                         }}
                         onChange={(e) => {
                             registerFormHook?.onChange(e);
                             onChange?.(e);
                         }}
                         {...restOfProps}
                         id={nameAndId}
                         name={nameAndId}
                         type={type}/>
                 )}

                {appendIcon && (
                    <ConditionalButtonWrapper
                        className={styles.iconButtonAppend}
                        condition={!!appendIcon.onClick}
                        onClick={() => {
                            !!appendIcon.onClick && appendIcon?.onClick(inputRef);
                        }}>
                        <FontAwesomeIcon className={!!appendIcon.onClick ? undefined : styles.iconAppend}
                                         icon={appendIcon.icon}/>
                    </ConditionalButtonWrapper>
                )}

                <div className={styles.whiteLine}/>
                <div className={styles.line}/>
            </div>
        </div>
    );
};

export default Input;