import type {FC} from 'react';
import {ErrorMessage, Field} from 'formik';
import type {CheckBoxProps} from '@/types/FormControlTypes';
import styles from '@/styles/components/formComponents/Checkbox.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const Input: FC<CheckBoxProps> = (props) => {
    return (
        <div className={styles.formControl}>
            <label className={styles.labelWrapper} htmlFor={props.name}>{props.label}
                <Field id={props.name} type="checkbox" {...props}/>
                <div className={styles.checkmark}>
                    <FontAwesomeIcon icon={['fas', 'check']}/>
                </div>
            </label>
            <div className={styles.formControlError}>
                <ErrorMessage name={props.name}/>
            </div>
        </div>
    );
};

export default Input;