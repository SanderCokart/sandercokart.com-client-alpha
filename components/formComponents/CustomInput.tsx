import styles from '@/styles/components/formComponents/CustomInput.module.scss';
import {IconName, IconPrefix} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ChangeEvent, FC} from 'react';

const CustomInput: FC<{ prependIcon?: [IconPrefix, IconName], appendIcon?: [IconPrefix, IconName], type?: 'text' | 'number' | 'date' | 'datetime-local' | 'week' | 'time', as?: 'select' | 'input' | 'textarea'; options?: Array<{ key: string, value: string }> }> = (props) => {
    const { prependIcon, appendIcon, type = 'text', as = 'input', options = [], ...rest } = props;

    const padding = () => {
        let className = '';

        if (prependIcon) {
            className = styles.prependIconPadding;
        }

        if (appendIcon) {
            className += ` ${styles.appendIconPadding}`;
        }

        return className;
    };

    const autoGrow = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    if (as === 'select')
        return (
            <div className={styles.iconContainer}>
                {prependIcon && <FontAwesomeIcon className={styles.prependIcon} icon={prependIcon}/>}
                <select className={padding()} {...rest}>
                    {
                        options.map((option) =>
                            <option key={option.value} value={option.value}>{option.key}</option>
                        )
                    }
                </select>
                {appendIcon && <FontAwesomeIcon className={styles.appendIcon} icon={appendIcon}/>}
                <div className={styles.line}/>
            </div>
        );

    if (as === 'textarea')
        return (
            <div className={styles.iconContainer}>
                {prependIcon && <FontAwesomeIcon className={styles.prependIcon} icon={prependIcon}/>}
                <textarea className={padding()} onChange={autoGrow} {...rest}/>
                {appendIcon && <FontAwesomeIcon className={styles.appendIcon} icon={appendIcon}/>}
                <div className={styles.line}/>
            </div>
        );

    return (
        <div className={styles.iconContainer}>
            {prependIcon && <FontAwesomeIcon className={styles.prependIcon} icon={prependIcon}/>}
            <input className={padding()} type={type} {...rest}/>
            {appendIcon && <FontAwesomeIcon className={styles.appendIcon} icon={appendIcon}/>}
            <div className={styles.line}/>
        </div>
    );
};

export default CustomInput;