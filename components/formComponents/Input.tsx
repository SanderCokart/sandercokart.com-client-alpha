import styles from '@/styles/components/formComponents/Input.module.scss';
import type {InputProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ErrorMessage, Field, FieldProps} from 'formik';
import type {FC} from 'react';

export const Input: FC<InputProps> = (props) => {

    const { prependIcon, appendIcon, name, label, type = 'text', ...rest } = props;

    const inputClassName = `${styles.input} ${prependIcon ? styles.prependIconPadding : '' && appendIcon ? styles.appendIconPadding : ''}`;

    return (
        <div className={styles.formControl}>
            <div>
                {label && <label className={styles.labelStandalone} htmlFor={name}>{label}</label>}
                <div className={styles.formControlError}>
                    <ErrorMessage component="span" name={name}/>
                </div>
                <Field appendIcon={appendIcon} name={name} prependIcon={prependIcon} type={type}
                       {...rest}
                       id={name}>
                    {
                        (fieldProps: FieldProps) => {
                            const { field } = fieldProps;
                            return (
                                <div className={styles.iconContainer}>
                                    {prependIcon &&
                                    <FontAwesomeIcon className={styles.prependIcon} icon={prependIcon}/>}
                                    <input className={inputClassName} {...field}/>
                                    {appendIcon && <FontAwesomeIcon className={styles.appendIcon} icon={appendIcon}/>}
                                    <div className={styles.line}/>
                                </div>
                            );
                        }
                    }
                </Field>
            </div>
        </div>
    );
};

export default Input;