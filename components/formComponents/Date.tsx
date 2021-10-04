import type {FC} from 'react';
import {ErrorMessage, Field} from 'Formik';
import type {DatePickerProps} from '@/types/FormControlTypes';
import styles from '@/styles/components/formComponents/Date.module.scss';
import CustomInput from '@/components/formComponents/CustomInput';

const Date: FC<DatePickerProps> = (props) => {
    const { name, label, type = 'date', appendIcon = ['fas', 'calendar'], prependIcon = 'date', ...rest } = props;
    return (
        <div className={styles.formControl}>
            {label && <label className={styles.labelStandalone} htmlFor={name}>{label}</label>}
            <div className={styles.iconContainer}>
                <Field {...rest} appendIcon={appendIcon} as={CustomInput} id={name} name={name}
                       prependIcon={prependIcon} type={type}/>
            </div>
            <div className={styles.formControlError}>
                <ErrorMessage name={name}/>
            </div>
        </div>
    );
};

export default Date;