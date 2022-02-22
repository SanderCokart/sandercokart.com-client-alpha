import ConditionalButtonWrapper from '@/components/formComponents/ConditionalButtonWrapper';
import LabelErrorAccessory from '@/components/formComponents/LabelErrorAccessory';
import styles from '@/styles/components/formComponents/Input.module.scss';
import type {InputProps} from '@/types/PropTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useRef} from 'react';
import type {FC} from 'react';
import Skeleton from 'react-loading-skeleton';


const Input: FC<InputProps> = (props) => {
    const inputRef = useRef<null | HTMLInputElement>(null);
    const {
        type = 'text',
        loading = false,
        appendIcon = undefined,
        prependIcon = undefined,
        containerProps = undefined,
        labelProps = undefined,
        name = undefined,
        label = undefined,
        onChange = undefined,
        onBlur = undefined,
        registerFormHook,
        ...restOfProps
    } = props;

    const handleNumberScrollingOnWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLInputElement;

        const max = Number(target.max);
        const min = Number(target.min);
        const value = Number(target.value);

        if ((e.deltaY < 0) && (!!max ? value < max : true)) {
            inputRef.current?.stepUp();
        } else if ((e.deltaY > 0) && (!!min ? value > min : true)) {
            inputRef.current?.stepDown();
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

    let inputClassName = styles.input;

    prependIcon && (inputClassName += ' ' + styles.withPrependIcon);
    appendIcon && (inputClassName += ' ' + styles.withAppendIcon);

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
                            console.log(e.key);
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
                     <input ref={(el) => {
                         registerFormHook?.ref(el);
                         inputRef.current = el;
                     }} className={
                         inputClassName
                     } onBlur={(e) => {
                         registerFormHook?.onBlur(e);
                         onBlur?.(e);
                     }} onChange={(e) => {
                         registerFormHook?.onChange(e);
                         onChange?.(e);
                     }} {...restOfProps} id={nameAndId} name={nameAndId} type={type}/>
                 )}

                {appendIcon && (
                    <ConditionalButtonWrapper
                        className={styles.iconButtonAppend}
                        condition={!!appendIcon.onClick}
                        onClick={() => {
                            !!appendIcon.onClick && appendIcon.onClick(inputRef);
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