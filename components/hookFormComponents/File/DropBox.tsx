import styles from '@/styles/components/formComponents/File/DropBox.module.scss';
import {FileProps} from '@/types/FormControlTypes';
import {ChangeEvent, FC, useRef} from 'react';
import {useFormContext} from 'react-hook-form';

const DropBox: FC<FileProps> = (props) => {
    const { name } = props;
    const { register } = useFormContext();
    const inputElement = useRef<HTMLInputElement | null>(null);
    const { ref, ...rest } = register(name);

    const onDrop = () => {
        inputElement?.current?.classList.remove(styles.highlight);
    };
    const onDragEnter = () => {
        inputElement?.current?.classList.add(styles.highlight);
    };
    const onDragLeave = () => {
        inputElement?.current?.classList.remove(styles.highlight);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {

    };

    return (
        <input {...props} {...rest} ref={(inputRef) => {
            ref(inputRef);
            inputElement.current = inputRef;
        }} className={styles.dropbox} type="file"
               onChange={onChange} onDragEnter={onDragEnter}
               onDragLeave={onDragLeave} onDrop={onDrop}/>
    );
};

export default DropBox;