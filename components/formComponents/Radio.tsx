import type {FC} from 'react';
import {Fragment} from 'react';
import {ErrorMessage, Field, FieldAttributes} from 'formik';
import {RadioProps} from '@/types/FormControlTypes';
import styles from '@/styles/components/formComponents/Radio.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const Select: FC<RadioProps> = (props) => {
    const { label, name, options, ...rest } = props;

    return (
        <div className={styles.formControl}>
            {label && <label className={styles.labelStandalone} htmlFor={name}>{label}</label>}
            <div className={styles.optionsContainer}>
                <Field {...rest} name={name}>
                    {
                        ({ field }: FieldAttributes<any>) => {
                            return options.map((option) => {
                                return (
                                    <Fragment key={option.key}>
                                        <label className={styles.labelWrapper} htmlFor={`${name} ${option.value}`}>
                                            {option.key}
                                            <input {...field}
                                                   checked={field.value === option.value}
                                                   id={`${name} ${option.value}`}
                                                   type="radio"
                                                   value={option.value}/>
                                            <div className={styles.checkmark}>
                                                <FontAwesomeIcon icon={['fas', 'check']}/>
                                            </div>
                                        </label>
                                    </Fragment>
                                );
                            });
                        }
                    }
                </Field>
            </div>
            <div className={styles.formControlError}>
                <ErrorMessage name={name}/>
            </div>
        </div>
    );
};

export default Select;