import {handler, useApi} from '@/providers/ApiProvider';
import styles from '@/styles/components/formComponents/File/DropBox.module.scss';
import type {FileProps} from '@/types/FormControlTypes';
import type {ChangeEvent, FC} from 'react';
import {useRef} from 'react';
import {useFormContext} from 'react-hook-form';

const DropBox: FC<FileProps> = (props) => {
    const { name } = props;
    const api = useApi();
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

        // for (const file of newFiles) {
        //     const formData = new FormData();
        //     formData.append('file', file);
        //
        //     const { data, status } = await (handler(api.post('/files', formData)));
        //
        //     const currentFiles = getValues(name);
        //     setValue(name, [...currentFiles, data]);
        // }
            const currentFiles = getValues(name);
        console.log(currentFiles);
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