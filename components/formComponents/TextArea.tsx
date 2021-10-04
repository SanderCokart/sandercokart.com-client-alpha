import type {FC} from 'react';
import {ErrorMessage} from 'Formik';
import {TextAreaProps} from '@/types/FormControlTypes';
import styles from '@/styles/components/formComponents/TextArea.module.scss';
import CustomInput from '@/components/formComponents/CustomInput';

const TextArea: FC<TextAreaProps> = (props) => {

    const { appendIcon, prependIcon, name, label, ...rest } = props;

    return (
        <div className={styles.formControl}>
            {label && <label className={styles.labelStandalone} htmlFor={name}>{label}</label>}
            <CustomInput appendIcon={appendIcon} as="textarea" prependIcon={prependIcon}/>
            <div className={styles.formControlError}>
                <ErrorMessage name={name}/>
            </div>
        </div>
    );
};

export default TextArea;