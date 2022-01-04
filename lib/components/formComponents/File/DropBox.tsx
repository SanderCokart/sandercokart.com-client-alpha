import styles from '@/styles/components/formComponents/File/DropBox.module.scss';
import type {FileProps} from '@/types/FormControlTypes';
import type {ChangeEvent, FC} from 'react';
import {useRef} from 'react';
import {useFormContext} from 'react-hook-form';

const DropBox: FC<FileProps> = (props) => {
    const { name } = props;
    const { setValue, getValues } = useFormContext();
    const inputElement = useRef<HTMLInputElement | null>(null);

    const onDrop = () => {
        inputElement?.current?.classList.remove(styles.highlight);
    };
    const onDragEnter = () => {
        inputElement?.current?.classList.add(styles.highlight);
    };
    const onDragLeave = () => {
        inputElement?.current?.classList.remove(styles.highlight);
    };

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files ?? []);
        const currentFiles = getValues(name);

        setValue(name, [...currentFiles, ...newFiles]);
    };

    return (
        <div className={styles.dropboxContainer}>
            <input {...props} className={styles.dropbox} type="file"
                   onChange={onChange} onDragEnter={onDragEnter}
                   onDragLeave={onDragLeave} onDrop={onDrop}/>
        </div>
    );
};

export default DropBox;