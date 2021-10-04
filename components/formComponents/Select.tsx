import type {FC} from 'react';
import {ErrorMessage} from 'Formik';
import {SelectProps} from '@/types/FormControlTypes';
import styles from '@/styles/components/formComponents/Select.module.scss';
import CustomInput from '@/components/formComponents/CustomInput';


export const Select: FC<SelectProps> = (props) => {

    const { prependIcon, appendIcon, name, label, options, ...rest } = props;

    return (
        <div className={styles.formControl}>
            {label && <label className={styles.labelStandalone} htmlFor={name}>{label}</label>}
            <CustomInput appendIcon={appendIcon} as="select" options={options} prependIcon={prependIcon}/>
            <div className={styles.formControlError}>
                <ErrorMessage name={name}/>
            </div>
        </div>
    );
};

export default Select;