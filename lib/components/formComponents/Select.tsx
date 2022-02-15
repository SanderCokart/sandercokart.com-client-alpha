import ConditionalButtonWrapper from '@/components/formComponents/ConditionalButtonWrapper';
import LabelErrorAccessory from '@/components/formComponents/LabelErrorAccessory';
import styles from '@/styles/components/formComponents/Select.module.scss';
import type {SelectProps} from '@/types/PropTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {FC} from 'react';
import {useRef} from 'react';
import Skeleton from 'react-loading-skeleton';


const Select: FC<SelectProps> = (props) => {
    const inputRef = useRef<null | HTMLSelectElement>(null);
    const {
        children,
        loading = false,
        appendIcon = undefined,
        prependIcon = undefined,
        containerProps = undefined,
        className,
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
                        borderRadius={0} className={styles.select} height="32px" style={{ padding: 0 }}/>
                ) : (
                     <select ref={(el) => {
                         registerFormHook?.ref(el);
                         inputRef.current = el;
                     }} className={[inputClassName, className].join(' ')} onBlur={(e) => {
                         registerFormHook?.onBlur(e);
                         onBlur?.(e);
                     }} onChange={(e) => {
                         registerFormHook?.onChange(e);
                         onChange?.(e);
                     }} onClick={e => e.stopPropagation()} {...restOfProps} id={nameAndId} name={nameAndId}>
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