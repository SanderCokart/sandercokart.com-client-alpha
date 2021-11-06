import CustomInput from '@/components/formComponents/CustomInput';
import styles from '@/styles/components/formComponents/TextArea.module.scss';
import {TextAreaProps} from '@/types/FormControlTypes';
import {ErrorMessage} from 'formik';
import type {FC} from 'react';

const TextArea: FC<TextAreaProps> = (props) => {

    const { appendIcon, prependIcon, name, label, ...rest } = props;

    return (
        <div className={styles.formControl}>
            {label && <label className={styles.labelStandalone} htmlFor={name}>{label}</label>}
            <div className={styles.formControlError}>
                <ErrorMessage name={name}/>
            </div>
            <CustomInput appendIcon={appendIcon} as="textarea" prependIcon={prependIcon} {...rest}/>
        </div>
    );
};

export default TextArea;