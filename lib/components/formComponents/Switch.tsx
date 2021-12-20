import styles from '@/styles/components/formComponents/Switch.module.scss';
import type {SwitchProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {ChangeEvent, FC} from 'react';
import {useState} from 'react';

const Switch: FC<SwitchProps> = ({ name, label, icon, onToggle }) => {
    const [state, setState] = useState(false);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState(e.target.checked);
        onToggle(e.target.checked);
    };

    return (
        <label className={styles.label}>
            {label}
            <div className={styles.switch}>
                <input checked={state} className={styles.checkbox} type="checkbox" onChange={onChange}/>
                <span className={styles.slider}>
                        {icon && <FontAwesomeIcon icon={icon}/>}
                    </span>
            </div>
        </label>
    );
};

export default Switch;