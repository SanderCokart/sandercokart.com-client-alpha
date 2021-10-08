import type {FC} from 'react';
import {Fragment} from 'react';
import {ErrorMessage, Field, FieldAttributes} from 'formik';
import {CheckBoxGroupProps} from '@/types/FormControlTypes';
import styles from '@/styles/components/formComponents/CheckboxGroup.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const CheckboxGroup: FC<CheckBoxGroupProps> = (props) => {
    const { name, label, options, ...rest } = props;

    return (
        <div className={styles.formControl}>
            {label && <label className={styles.labelStandalone} htmlFor={name}>{label}</label>}
            <div className={styles.optionsContainer}>
                <Field name={name} {...rest}>
                    {
                        ({ field }: FieldAttributes<any>) => {
                            return options.map((option) => {
                                return (
                                    <Fragment key={option.key}>
                                        <label className={styles.labelWrapper} htmlFor={`${name} ${option.value}`}>
                                            {option.key}
                                            <input {...field}
                                                   checked={field.value.includes(option.value)}
                                                   id={`${name} ${option.value}`}
                                                   type="checkbox"
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
        </div>
    );
};

export default CheckboxGroup;