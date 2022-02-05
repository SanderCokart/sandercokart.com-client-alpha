import ConditionalButtonWrapper from '@/components/formComponents/ConditionalButtonWrapper';
import LabelErrorAccessory from '@/components/formComponents/LabelErrorAccessory';
import styles from '@/styles/components/formComponents/Select.module.scss';
import {FontAwesomeIconType} from '@/types/CustomTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    FC,
    HTMLAttributes,
    InputHTMLAttributes,
    LabelHTMLAttributes,
    MutableRefObject, SelectHTMLAttributes,
    useCallback,
    useEffect,
    useRef
} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
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

const Select: FC<SelectProps> = (props) => {
    const inputRef = useRef<null | HTMLSelectElement>(null);
    const {
        children,
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

    const nameAndId = registerFormHook?.name || name || '';

    let inputClassName = styles.select;
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
                        className={`${styles.input}${prependIcon && ` ${styles.withPrependIcon}`}${appendIcon && ` ${styles.withAppendIcon}`}`}/>
                ) : (
                     <select ref={(el) => {
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
                     }} {...restOfProps} id={nameAndId} name={nameAndId}>
                         {children}
                     </select>
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

export default Select;