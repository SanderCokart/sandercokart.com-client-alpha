import styles from '@/styles/components/formComponents/TextArea.module.scss';
import type {TextAreaProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {ChangeEvent, FC} from 'react';
import {useRef, useState} from 'react';
import {useFormContext} from 'react-hook-form';


const TextArea: FC<TextAreaProps> = (props) => {
    const {
        name, prependIcon, appendIcon, label,
        id = name,
        ...rest
    } = props;

    const { register, formState: { errors: { [name]: error } } } = useFormContext();
    const textAreaElement = useRef<null | HTMLTextAreaElement>(null);
    const formControlElement = useRef<null | HTMLDivElement>(null);
    const [unfolded, setUnfolded] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);

    const textareaClassName = `${styles.textarea} ${prependIcon ? styles.prependIconPadding : ''} ${appendIcon ? styles.appendIconPadding : ''}`;

    const autoGrow = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (!unfolded) {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
        }
    };

    const toggleUnfold = () => {
        textAreaElement.current?.classList.toggle(styles.unfold);
        if (!unfolded && textAreaElement.current?.style.height) textAreaElement.current.style.height = '';
        else if (textAreaElement.current?.style.height) textAreaElement.current.style.height = '160px';
        setUnfolded(prev => !prev);

    };
    const toggleFullscreen = () => {
        formControlElement.current?.classList.toggle(styles.fullscreen);
        setFullscreen(prev => !prev);
    };

    const { ref, onChange, ...restOfRef } = register(name);

    return (
        <div ref={formControlElement} className={styles.formControl}>
            <div>
                {label && <label className={styles.labelStandalone} htmlFor={id}>{label}</label>}

                <div className={styles.formControlError}>
                    {error && <span>{error.message}</span>}
                </div>

                <div className={styles.iconContainer}>
                    {prependIcon && <FontAwesomeIcon className={styles.prependIcon} icon={prependIcon}/>}

                    <button className={styles.unfoldButton} type="button" onClick={toggleUnfold}>
                        <FontAwesomeIcon icon={unfolded ? 'window-minimize' : 'window-maximize'}/>
                    </button>
                    <button className={styles.fullscreenButton} type="button" onClick={toggleFullscreen}>
                        <FontAwesomeIcon icon={fullscreen ? 'compress' : 'expand'}/>
                    </button>

                    <textarea {...rest} {...restOfRef}
                              ref={(el) => {
                                  ref(el);
                                  textAreaElement.current = el;
                              }}
                              className={textareaClassName}
                              id={id}
                              name={name}
                              onChange={(e) => {
                                  autoGrow(e);
                                  onChange(e);
                              }}
                    />

                    {appendIcon && <FontAwesomeIcon className={styles.appendIcon} icon={appendIcon}/>}

                    <div className={styles.line}/>
                </div>
            </div>
        </div>
    );
};

export default TextArea;