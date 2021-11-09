import styles from '@/styles/components/formComponents/TextArea.module.scss';
import type {TextAreaProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {ChangeEvent} from 'react';
import {forwardRef} from 'react';


const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(props, ref) {
    const {
        name, prependIcon, appendIcon, label,
        id = name,
        error,
        ...rest
    } = props;
    const textareaClassName = `${styles.textarea} ${prependIcon ? styles.prependIconPadding : '' && appendIcon ? styles.appendIconPadding : ''}`;


    const autoGrow = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    return (
        <div className={styles.formControl}>
            <div>
                {label && <label className={styles.labelStandalone} htmlFor={id}>{label}</label>}

                {error &&
                <div className={styles.formControlError}>
                    <span>{error.message}</span>
                </div>
                }

                <div className={styles.iconContainer}>
                    {prependIcon &&
                    <FontAwesomeIcon className={styles.prependIcon} icon={prependIcon}/>}
                    <textarea {...rest} ref={ref} className={textareaClassName} id={id} name={name}
                              onChange={autoGrow}/>
                    {appendIcon && <FontAwesomeIcon className={styles.appendIcon} icon={appendIcon}/>}
                    <div className={styles.line}/>
                </div>
            </div>
        </div>
    );
});

export default TextArea;