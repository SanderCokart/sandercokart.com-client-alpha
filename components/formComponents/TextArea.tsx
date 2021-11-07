import styles from '@/styles/components/formComponents/TextArea.module.scss';
import {TextAreaProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ErrorMessage, Field, FieldProps} from 'formik';
import type {FC} from 'react';
import {ChangeEvent} from 'react';

const TextArea: FC<TextAreaProps> = (props) => {

    const { appendIcon, prependIcon, name, label, ...rest } = props;


    const textAreaClassName = () => {
        let className = styles.textarea;

        if (prependIcon) {
            className += ` ${styles.prependIconPadding}`;
        }

        if (appendIcon) {
            className += ` ${styles.appendIconPadding}`;
        }

        return className;
    };

    const autoGrow = (e: ChangeEvent<HTMLTextAreaElement>) => {
        console.log('hi');
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    return (
        <div className={styles.formControl}>
            <div>
                {label && <label className={styles.labelStandalone} htmlFor={name}>{label}</label>}
                <div className={styles.formControlError}>
                    <ErrorMessage component="span" name={name}/>
                </div>
                <Field name={name} {...rest} >
                    {(fieldProps: FieldProps) => {
                        const { field } = fieldProps;
                        const { onChange, ...rest } = field;
                        return (
                            <div className={styles.iconContainer}>
                                {prependIcon && <FontAwesomeIcon className={styles.prependIcon} icon={prependIcon}/>}
                                <textarea  {...rest} className={textAreaClassName()} onChange={e => {
                                    onChange(e);
                                    autoGrow(e);
                                }}/>
                                {appendIcon && <FontAwesomeIcon className={styles.appendIcon} icon={appendIcon}/>}
                                <div className={styles.line}/>
                            </div>
                        );
                    }}
                </Field>
            </div>
        </div>
    );
};

export default TextArea;