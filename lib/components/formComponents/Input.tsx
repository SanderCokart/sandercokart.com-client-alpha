import styles from '@/styles/components/formComponents/Input.module.scss';
import type {InputProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {FC} from 'react';
import {useEffect, useRef} from 'react';
import {useFormContext} from 'react-hook-form';

const Input: FC<InputProps> = (props) => {
    const {
        name, prependIcon, appendIcon, label,
        id = name,
        type = 'text',
        ...rest
    } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);

    const { register, formState: { errors: { [name]: error } } } = useFormContext();

    const inputClassName = `${styles.input} ${prependIcon ? styles.prependIconPadding : ''} ${appendIcon ? styles.appendIconPadding : ''}`;

    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLInputElement;

        const max = Number(target.max);
        const min = Number(target.min);
        const value = Number(target.value);


        if (target.type === 'number') {
            if ((e.deltaY < 0) && (!!max ? value < max : true)) {
                inputRef.current?.stepUp(1);
            } else if ((e.deltaY > 0) && (!!min ? value > min : true)) {
                inputRef.current?.stepDown(1);
            }
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener('wheel', handleWheel);
        }
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    const { ref, ...restOfRegister } = register(name);


    return (
        <div className={styles.formControl}>

            <div className={styles.labelAndError}>
                {label && <label className={styles.labelStandalone} htmlFor={id}>{label}</label>}
                <div className={styles.formControlError}>
                    {error && <span>{error.message}</span>}
                </div>
            </div>

            <div className={styles.iconContainer}>
                {prependIcon &&
                    <FontAwesomeIcon className={styles.prependIcon} icon={prependIcon}/>}
                <input ref={el => {
                    ref(el);
                    inputRef.current = el;
                }}  {...restOfRegister} {...rest} className={inputClassName} id={id}
                       name={name}
                       type={type}/>
                {appendIcon && <FontAwesomeIcon className={styles.appendIcon} icon={appendIcon}/>}
                <div className={styles.line}/>
            </div>
        </div>
    );
};

export default Input;