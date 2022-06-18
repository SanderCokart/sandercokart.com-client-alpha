import LabelErrorAccessory from '@/components/formComponents/LabelErrorAccessory/LabelErrorAccessory';
import styles from './Color.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {InputHTMLAttributes, HTMLAttributes, LabelHTMLAttributes} from 'react';
import {useRef} from 'react';
import Skeleton from 'react-loading-skeleton';
import {UseFormRegisterReturn} from 'react-hook-form';
import type {FontAwesomeIconType} from '@/types/CustomTypes';
import classnames from 'classnames';


interface ColorProps extends InputHTMLAttributes<HTMLInputElement> {
    loading?: boolean;
    name?: string;
    label?: string;
    registerFormHook?: UseFormRegisterReturn;
    icon?: FontAwesomeIconType;
    containerProps?: HTMLAttributes<HTMLDivElement>;
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

const Color = (props: ColorProps) => {
    const inputRef = useRef<null | HTMLInputElement>(null);
    const {
        loading = false,
        icon = undefined,
        value = '#F00505',
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


    const nameAndId = registerFormHook?.name || name || '';

    const classNames = classnames([
        styles.input,
        className
    ]);

    return (
        <div className={styles.control} {...containerProps}>
            {label && <label className={styles.label} {...labelProps} htmlFor={nameAndId}>{label}</label>}

            {registerFormHook && <LabelErrorAccessory name={nameAndId}/>}

            <div className={styles.inputContainer}>
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
                         type="color"/>
                 )}

                {icon && <FontAwesomeIcon fixedWidth className={styles.icon} icon={icon}/>}
                <span className={styles.hex}>{value}</span>
            </div>
        </div>
    );
};

export default Color;