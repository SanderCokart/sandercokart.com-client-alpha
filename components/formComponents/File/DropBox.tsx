import styles from '@/styles/components/formComponents/File/DropBox.module.scss';
import type {FileProps} from '@/types/FormControlTypes';
import type {ChangeEvent, FC} from 'react';
import {useRef} from 'react';
import {useFormContext} from 'react-hook-form';

const DropBox: FC<FileProps> = (props) => {
    const { name } = props;
    const { setValue } = useFormContext();
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

    const transformFileList = (fileList: FileList): File[] => {
        return Array.from(fileList);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files)
            setValue(name, transformFileList(e.target.files));
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