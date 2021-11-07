import styles from '@/styles/components/formComponents/CustomInput.module.scss';
import {IconName, IconPrefix} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {FC} from 'react';

interface CustomInput {
    prependIcon?: [IconPrefix, IconName],
    appendIcon?: [IconPrefix, IconName],
    type?: 'text' | 'number' | 'date' | 'datetime-local' | 'week' | 'time',
}

const CustomInput: FC<CustomInput> = (props) => {
    const { prependIcon, appendIcon, type = 'text', ...rest } = props;

    const customClassName = `${styles.select} ${prependIcon ? styles.prependIconPadding : '' && appendIcon ? styles.appendIconPadding : ''}`;

    return (
        <div className={styles.iconContainer}>
            {prependIcon && <FontAwesomeIcon className={styles.prependIcon} icon={prependIcon}/>}
            <input className={customClassName} type={type} {...rest}/>
            {appendIcon && <FontAwesomeIcon className={styles.appendIcon} icon={appendIcon}/>}
            <div className={styles.line}/>
        </div>
    );
};

export default CustomInput;