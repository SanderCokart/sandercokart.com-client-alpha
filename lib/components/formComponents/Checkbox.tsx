import LabelErrorAccessory from '@/components/formComponents/LabelErrorAccessory';
import styles from '@/styles/components/formComponents/Checkbox.module.scss';
import type {CheckboxProps} from '@/types/PropTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {FC} from 'react';


const Checkbox: FC<CheckboxProps> = (props) => {
    const {
        loading = false,
        containerProps = undefined,
        labelProps = undefined,
        name = undefined,
        label = undefined,
        onBlur = undefined,
        onChange = undefined,
        registerFormHook,
        ...restOfProps
    } = props;

    const nameAndId = registerFormHook?.name || name || '';

    return (
        <div className={styles.control} {...containerProps}>
            <label className={styles.label} {...labelProps} htmlFor={nameAndId}>
                {label}
                <input
                    ref={(el) => {
                        registerFormHook?.ref(el);
                    }}
                    className={styles.input}
                    id={nameAndId}
                    name={nameAndId}
                    {...restOfProps}
                    type="checkbox"
                    onBlur={(e) => {
                        registerFormHook?.onBlur(e);
                        onBlur?.(e);
                    }}
                    onChange={(e) => {
                        registerFormHook?.onChange(e);
                        onChange?.(e);
                    }}/>
                <div className={styles.checkbox}>
                    <FontAwesomeIcon icon="check"/>
                </div>
            </label>
            <LabelErrorAccessory name={nameAndId}/>
        </div>
    );
};

export default Checkbox;