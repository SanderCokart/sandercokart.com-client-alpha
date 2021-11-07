import styles from '@/styles/components/formComponents/Date.module.scss';
import type {DatePickerProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ErrorMessage, Field, FieldProps} from 'formik';
import type {FC} from 'react';

const Date: FC<DatePickerProps> = (props) => {
    const {
        name,
        label,
        type = 'date',
        appendIcon = ['fas', 'calendar'],
        prependIcon,
        ...rest
    } = props;

    const dateClassName = `${styles.date} ${prependIcon ? styles.prependIconPadding : '' && appendIcon ? styles.appendIconPadding : ''}`;

    return (
        <div className={styles.formControl}>
            {label && <label className={styles.labelStandalone} htmlFor={name}>{label}</label>}
            <div className={styles.iconContainer}>
                <Field {...rest} appendIcon={appendIcon} id={name} name={name}
                       prependIcon={prependIcon} type={type}>
                    {(fieldProps: FieldProps) => {
                        const { field } = fieldProps;
                        return (
                            <div className={styles.iconContainer}>
                                {prependIcon && <FontAwesomeIcon className={styles.prependIcon} icon={prependIcon}/>}
                                <input {...field} className={dateClassName} type={type}/>
                                {appendIcon && <FontAwesomeIcon className={styles.appendIcon} icon={appendIcon}/>}
                                <div className={styles.line}/>
                            </div>
                        );
                    }}
                </Field>
            </div>
            <div className={styles.formControlError}>
                <ErrorMessage name={name}/>
            </div>
        </div>
    );
};

export default Date;