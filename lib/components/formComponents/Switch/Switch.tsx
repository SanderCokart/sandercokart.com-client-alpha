import classnames from 'classnames';
import {useState, LabelHTMLAttributes, InputHTMLAttributes, ReactNode} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';

import styles from './Switch.module.scss';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
    name?: string;
    label?: string;
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
    registerFormHook?: UseFormRegisterReturn;

    onToggle?: (state: boolean) => void;
}

interface SameIconSwitchProps extends SwitchProps {
    icons?: {
        type: 'same';
        icon: ReactNode;
    };
}

interface DifferentIconSwitchProps extends SwitchProps {
    icons?: {
        type: 'different';
        on: ReactNode;
        off: ReactNode;
    };
}

const Switch = (props: Omit<(SameIconSwitchProps | DifferentIconSwitchProps), 'type' | 'onChange'>) => {
    const {
        labelProps = undefined,
        name = undefined,
        label = undefined,
        onBlur = undefined,
        className = undefined,

        icons = undefined,
        onToggle,

        registerFormHook,
        ...restOfProps
    } = props;
    const [toggled, setToggled] = useState(false);


    const nameAndId = registerFormHook?.name || name || '';

    const classNames = classnames([
        styles.checkbox,
        className
    ]);

    return (
        <label className={styles.label}>
            {label}
            <div className={styles.switch}>
                <input ref={registerFormHook?.ref}
                       checked={!registerFormHook ? undefined : toggled}
                       className={classNames}
                       onBlur={(e) => {
                           registerFormHook?.onBlur(e);
                           onBlur?.(e);
                       }}
                       onChange={(e) => {
                           setToggled(e.target.checked);
                           onToggle?.(e.target.checked);

                           registerFormHook?.onChange(e);
                       }}
                       {...restOfProps}
                       id={nameAndId}
                       name={nameAndId}
                       type="checkbox"
                />
                <span className={styles.slider}>

                    {icons?.type === 'same' && icons.icon}
                    {icons?.type === 'different' && (toggled ? icons.on : icons.off)}

                </span>
            </div>
        </label>
    );
};

export default Switch;