import styles from '@/styles/components/formComponents/Checkbox.module.scss';
import type {CheckBoxProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {forwardRef} from 'react';


const Checkbox = forwardRef<HTMLInputElement, CheckBoxProps>(function Checkbox(props, ref) {
    const {
        name, label,
        id = name,
        error,
        ...rest
    } = props;

    return (
        <div className={styles.formControl}>
            <label className={styles.labelWrapper} htmlFor={props.name}>{props.label}
                <input {...rest} ref={ref} id={id} name={name} type="checkbox"/>
                <div className={styles.checkmark}>
                    <FontAwesomeIcon icon={['fas', 'check']}/>
                </div>
            </label>
            <div className={styles.formControlError}>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    );
});

export default Checkbox;