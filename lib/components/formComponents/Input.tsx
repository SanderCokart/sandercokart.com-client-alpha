import styles from '@/styles/components/formComponents/Input.module.scss';
import type {InputProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {FC} from 'react';
import {useFormContext} from 'react-hook-form';

const Input: FC<InputProps> = (props) => {
    const {
        name, prependIcon, appendIcon, label,
        id = name,
        type = 'text',
        ...rest
    } = props;

    const { register, formState: { errors: { [name]: error } } } = useFormContext();

    const inputClassName = `${styles.input} ${prependIcon ? styles.prependIconPadding : ''} ${appendIcon ? styles.appendIconPadding : ''}`;

    return (
        <div className={styles.formControl}>
            <div>
                {label && <label className={styles.labelStandalone} htmlFor={id}>{label}</label>}

                <div className={styles.formControlError}>
                    {error && <span>{error.message}</span>}
                </div>

                <div className={styles.iconContainer}>
                    {prependIcon &&
                    <FontAwesomeIcon className={styles.prependIcon} icon={prependIcon}/>}
                    <input {...rest} {...register(name)} className={inputClassName} id={id} name={name} type={type}/>
                    {appendIcon && <FontAwesomeIcon className={styles.appendIcon} icon={appendIcon}/>}
                    <div className={styles.line}/>
                </div>
            </div>
        </div>
    );
};

export default Input;