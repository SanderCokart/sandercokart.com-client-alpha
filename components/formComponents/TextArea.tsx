import styles from '@/styles/components/formComponents/TextArea.module.scss';
import type {TextAreaProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {ChangeEvent} from 'react';
import {forwardRef} from 'react';
import {useFormContext} from 'react-hook-form';


const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(props, ref) {
    const {
        name, prependIcon, appendIcon, label,
        id = name,
        ...rest
    } = props;

    const { register, formState: { errors: { [name]: error } } } = useFormContext();


    const textareaClassName = `${styles.textarea} ${prependIcon ? styles.prependIconPadding : ''} ${appendIcon ? styles.appendIconPadding : ''}`;

    const autoGrow = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    return (
        <div className={styles.formControl}>
            <div>
                {label && <label className={styles.labelStandalone} htmlFor={id}>{label}</label>}

                <div className={styles.formControlError}>
                    {error && <span>{error.message}</span>}
                </div>

                <div className={styles.iconContainer}>
                    {prependIcon &&
                    <FontAwesomeIcon className={styles.prependIcon} icon={prependIcon}/>}
                    <textarea {...rest} {...register(name)} className={textareaClassName} id={id} name={name}
                              onChange={autoGrow}/>
                    {appendIcon && <FontAwesomeIcon className={styles.appendIcon} icon={appendIcon}/>}
                    <div className={styles.line}/>
                </div>
            </div>
        </div>
    );
});

export default TextArea;