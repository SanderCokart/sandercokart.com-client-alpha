import styles from '@/styles/components/OLDformComponents/Select.module.scss';
import type {SelectProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {forwardRef} from 'react';
import {useFormContext} from 'react-hook-form';


const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(props, ref) {
    const {
        name, prependIcon, appendIcon, label,
        id = name,
        children,
        ...rest
    } = props;

    const { register, formState: { errors: { [name]: error } } } = useFormContext();

    const selectClassName = `${styles.select} ${prependIcon ? styles.prependIconPadding : ''} ${appendIcon ? styles.appendIconPadding : ''}`;

    return (
        <div className={styles.formControl}>
            <div>
                {label && <label className={styles.labelStandalone} htmlFor={id}>{label}</label>}
                <div className={styles.formControlError}>
                    {error && <span>{error.message}</span>}
                </div>

                <div className={styles.iconContainer}>
                    {prependIcon && <FontAwesomeIcon className={styles.prependIcon} icon={prependIcon}/>}
                    <select  {...register(name)} className={selectClassName} name={name} {...rest}>
                        {children}
                    </select>
                    {appendIcon && <FontAwesomeIcon className={styles.appendIcon} icon={appendIcon}/>}
                </div>
            </div>
        </div>
    );
});

export default Select;