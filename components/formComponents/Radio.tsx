import styles from '@/styles/components/formComponents/Radio.module.scss';
import type {RadioProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {forwardRef, Fragment} from 'react';


const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(props, ref) {
    const {
        name, label,
        id = name,
        error,
        options,
        ...rest
    } = props;
    return (
        <div className={styles.formControl}>
            <div>
                {label && <label className={styles.labelStandalone} htmlFor={id}>{label}</label>}
                <div className={styles.formControlError}>
                    {error && <span>{error.message}</span>}
                </div>
                <div className={styles.optionsContainer}>
                    {options.map((option) => {
                        return (
                            <Fragment key={option.label}>
                                <label className={styles.labelWrapper} htmlFor={`${name} ${option.value}`}>
                                    {option.label}
                                    <input {...rest}
                                           ref={ref}
                                           id={`${id} ${option.value}`}
                                           name={name}
                                           type="radio"
                                           value={option.value}/>
                                    <div className={styles.checkmark}>
                                        <FontAwesomeIcon icon={['fas', 'check']}/>
                                    </div>
                                </label>
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

export default Radio;