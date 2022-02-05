import styles from '@/styles/components/formComponents/Checkbox.module.scss';
import type {CheckBoxProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {FC} from 'react';
import {useFormContext} from 'react-hook-form';


const Checkbox: FC<CheckBoxProps> = (props) => {
    const {
        name, label,
        id = name,
        ...rest
    } = props;

    const { register, formState: { errors: { [name]: error } } } = useFormContext();


    return (
        <div className={styles.formControl}>
            <label className={styles.labelWrapper} htmlFor={props.name}>{props.label}
                <input {...rest} {...register(name)} id={id} name={name} type="checkbox"/>
                <div className={styles.checkmark}>
                    <FontAwesomeIcon icon={['fas', 'check']}/>
                </div>
            </label>
            <div className={styles.formControlError}>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    );
};

export default Checkbox;