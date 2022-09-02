import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {ChangeEvent} from 'react';
import {useState, LabelHTMLAttributes, InputHTMLAttributes} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';

import {FontAwesomeIconType} from '@/types/CustomTypes';

import styles from './Switch.module.scss';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
    name?: string;
    label?: string;
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
    registerFormHook?: UseFormRegisterReturn;
    icon?: FontAwesomeIconType;

    onToggle?: (state: boolean) => void;

    ToggledOnIcon?: FontAwesomeIconType;
    ToggleOffIcon?: FontAwesomeIconType;
    ToggledOffIconSameAsOn?: boolean;

}

const Switch = (props: SwitchProps) => {
    const {
        labelProps = undefined,
        name = undefined,
        label = undefined,
        onChange = undefined,
        onBlur = undefined,
        className = undefined,

        icon = undefined,
        ToggleOffIcon = undefined,
        ToggledOnIcon = undefined,
        ToggledOffIconSameAsOn = true,
        onToggle,

        registerFormHook,
        ...restOfProps
    } = props;
    const [toggled, setToggled] = useState(false);

    const onToggleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setToggled(e.target.checked);
        onToggle?.(e.target.checked);
    };

    return (
        <label className={styles.label}>
            {label}
            <div className={styles.switch}>
                <input checked={toggled} className={styles.checkbox} type="checkbox" onChange={onToggleChange}/>
                <span className={styles.slider}>
                        {icon && <FontAwesomeIcon icon={icon}/>}
                    </span>
            </div>
        </label>
    );
};

export default Switch;