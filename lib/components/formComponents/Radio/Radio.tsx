import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Fragment, InputHTMLAttributes, HTMLAttributes, LabelHTMLAttributes} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';

import LabelErrorAccessory from '@/components/formComponents/LabelErrorAccessory/LabelErrorAccessory';

import styles from './Radio.module.scss';


interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    loading?: boolean;
    name?: string;
    selectedValue?: string;
    label?: string;
    registerFormHook?: UseFormRegisterReturn;
    containerProps?: HTMLAttributes<HTMLDivElement>;
    optionsContainerProps?: HTMLAttributes<HTMLDivElement>;
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
    nestedLabelProps?: LabelHTMLAttributes<HTMLLabelElement>;
    options: RadioCheckboxOptions[];
}

interface RadioCheckboxOptions {
    label: string;
    value: string;
}

const Radio = (props: RadioProps) => {
    const {
        loading = false,
        containerProps = undefined,
        optionsContainerProps = undefined,
        labelProps = undefined,
        nestedLabelProps = undefined,
        selectedValue = undefined,
        name = undefined,
        label = undefined,
        onChange = undefined,
        onBlur = undefined,
        registerFormHook,
        options,
        ...restOfProps
    } = props;

    if (!(registerFormHook?.name || name)) throw new Error('Radio: name or registerFormHook is required');
    const nameAndId = registerFormHook?.name || name || '';

    return (
        <div className={styles.control} {...containerProps}>
            {label && <label className={styles.label} {...labelProps} htmlFor="">{label}</label>}
            {registerFormHook && <LabelErrorAccessory className={styles.error} name={nameAndId}/>}
            <div className={styles.optionsContainer} {...optionsContainerProps}>
                {options.map((option) => {
                        const nestedNameAndId = `${nameAndId}-${option.value}`;
                        return (
                            <Fragment key={option.label}>
                                <label className={styles.nestedLabel} {...nestedLabelProps} htmlFor={nestedNameAndId}>
                                    {option.label}
                                    <input
                                        ref={(el) => {
                                            registerFormHook?.ref(el);
                                        }}
                                        checked={registerFormHook ? undefined : (selectedValue === option.value)}
                                        className={styles.input}
                                        value={option.value}
                                        onBlur={(e) => {
                                            registerFormHook?.onBlur(e);
                                            onBlur && onBlur(e);
                                        }}
                                        onChange={(e) => {
                                            registerFormHook?.onChange(e);
                                            onChange?.(e);
                                        }}
                                        {...restOfProps}
                                        id={nestedNameAndId}
                                        name={nameAndId}
                                        type="radio"/>
                                    <div className={styles.checkbox}>
                                        <FontAwesomeIcon icon="check"/>
                                    </div>
                                </label>
                            </Fragment>
                        );
                    }
                )}
            </div>
        </div>
    );
};

export default Radio;