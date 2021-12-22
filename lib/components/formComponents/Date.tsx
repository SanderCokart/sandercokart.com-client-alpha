import styles from '@/styles/components/formComponents/Date.module.scss';
import type {DateProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {FC} from 'react';
import {useFormContext} from 'react-hook-form';


const Date: FC<DateProps> = (props) => {
    const {
        name, prependIcon, appendIcon = ['fas', 'calendar'], label,
        id = name,
        type = 'date',
        ...rest
    } = props;

    const { register, formState: { errors: { [name]: error } } } = useFormContext();

    const dateClassName = `${styles.date} ${prependIcon ? styles.prependIconPadding : ''} ${appendIcon ? styles.appendIconPadding : ''}`;

    return (
        <div className={styles.formControl}>
            <div>
                {label && <label className={styles.labelStandalone} htmlFor={id}>{label}</label>}

                {error &&
                    <div className={styles.formControlError}>
                        <span>{error.message}</span>
                    </div>
                }

                <div className={styles.iconContainer}>
                    {prependIcon &&
                        <FontAwesomeIcon className={styles.prependIcon} icon={prependIcon}/>}
                    <input {...rest} {...register(name)} className={dateClassName} id={id} name={name} type={type}/>
                    {appendIcon && <FontAwesomeIcon className={styles.appendIcon} icon={appendIcon}/>}
                    <div className={styles.line}/>
                </div>
            </div>
        </div>
    );
};

export default Date;