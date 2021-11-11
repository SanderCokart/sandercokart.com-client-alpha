import styles from '@/styles/components/formComponents/Date.module.scss';
import type {DateProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {forwardRef} from 'react';


const Date = forwardRef<HTMLInputElement, DateProps>(function Date(props, ref) {
    const {
        name, prependIcon, appendIcon  = ['fas', 'calendar'], label,
        id = name,
        error,
        type = 'date',
        ...rest
    } = props;

    const dateClassName = `${styles.date} ${prependIcon ? styles.prependIconPadding : '' && appendIcon ? styles.appendIconPadding : ''}`;

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
                    <input {...rest} ref={ref} className={dateClassName} id={id} name={name} type={type}/>
                    {appendIcon && <FontAwesomeIcon className={styles.appendIcon} icon={appendIcon}/>}
                    <div className={styles.line}/>
                </div>
            </div>
        </div>
    );
});

export default Date;