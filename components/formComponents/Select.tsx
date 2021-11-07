import styles from '@/styles/components/formComponents/Select.module.scss';
import {SelectProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ErrorMessage, Field, FieldProps} from 'formik';
import type {FC} from 'react';


export const Select: FC<SelectProps> = (props) => {

    const { prependIcon, appendIcon, name, label, children, ...rest } = props;

    const selectClassName = `${styles.input} ${prependIcon ? styles.prependIconPadding : '' && appendIcon ? styles.appendIconPadding : ''}`;

    return (
        <div className={styles.formControl}>
            {label && <label className={styles.labelStandalone} htmlFor={name}>{label}</label>}
            <div className={styles.formControlError}>
                <ErrorMessage component="span" name={name}/>
            </div>
            <Field name={name} {...rest}>
                {(fieldProps: FieldProps) => {
                    const { field } = fieldProps;
                    return (
                        <div className={styles.iconContainer}>
                            {prependIcon && <FontAwesomeIcon className={styles.prependIcon} icon={prependIcon}/>}
                            <select className={selectClassName} {...field}>
                                {children}
                            </select>
                            {appendIcon && <FontAwesomeIcon className={styles.appendIcon} icon={appendIcon}/>}
                        </div>
                    );
                }}
            </Field>
        </div>
    );
};

export default Select;