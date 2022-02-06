import LabelErrorAccessory from '@/components/formComponents/LabelErrorAccessory';
import styles from '@/styles/components/formComponents/CheckboxGroup.module.scss';
import type {CheckboxGroupProps} from '@/types/PropTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {FC} from 'react';
import {Fragment} from 'react';


const CheckboxGroup: FC<CheckboxGroupProps> = (props) => {
    const {
        loading = false,
        containerProps = undefined,
        labelProps = undefined,
        nestedLabelProps = undefined,
        name = undefined,
        label = undefined,
        onChange = undefined,
        onBlur = undefined,
        registerFormHook,
        options,
        ...restOfProps
    } = props;

    const nameAndId = registerFormHook?.name || name || '';

    return (
        <div className={styles.control}>
            {label && <label className={styles.label} {...labelProps} htmlFor="">{label}</label>}
            {registerFormHook && <LabelErrorAccessory className={styles.error} name={nameAndId}/>}
            <div className={styles.optionsContainer}>
                {options.map((option) => {
                        const nestedNameAndId = `${nameAndId}-${option.value}`;
                        return (
                            <Fragment key={option.label}>
                                <label className={styles.nestedLabel} {...nestedLabelProps} htmlFor={nestedNameAndId}>
                                    {option.label}
                                    <input
                                        ref={(el) => {
                                            registerFormHook?.ref(el);
                                        }}
                                        className={styles.input}
                                        value={option.value}
                                        onBlur={(e) => {
                                            registerFormHook?.onBlur(e);
                                            onBlur && onBlur(e);
                                        }}
                                        onChange={(e) => {
                                            registerFormHook?.onChange(e);
                                            onChange && onChange(e);
                                        }}
                                        {...restOfProps}
                                        id={nestedNameAndId}
                                        name={nameAndId}
                                        type="checkbox"/>
                                    <div className={styles.checkbox}>
                                        <FontAwesomeIcon icon="check"/>
                                    </div>
                                </label>
                            </Fragment>
                        );
                    }
                )}
            </div>
        </div>
    );
};

export default CheckboxGroup;