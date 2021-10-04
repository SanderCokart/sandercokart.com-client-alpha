import type {FC} from 'react';
import {ErrorMessage, Field} from 'Formik';
import type {InputProps} from '@/types/FormControlTypes';
import styles from '@/styles/components/formComponents/Input.module.scss';
import CustomInput from '@/components/formComponents/CustomInput';

export const Input: FC<InputProps> = (props) => {

    const { prependIcon, appendIcon, name, label, ...rest } = props;

    return (
        <div className={styles.formControl}>
            {label && <label className={styles.labelStandalone} htmlFor={name}>{label}</label>}
            <Field appendIcon={appendIcon} as={CustomInput} name={name} prependIcon={prependIcon} type="text" {...rest}
                   id={name}/>
            <div className={styles.formControlError}>
                <ErrorMessage name={name}/>
            </div>
        </div>
    );
};

export default Input;