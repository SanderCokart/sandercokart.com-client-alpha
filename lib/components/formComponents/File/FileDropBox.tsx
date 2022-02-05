
import axios from '@/functions/shared/axios';
import styles from '@/styles/components/formComponents/NewFile/FileDropBox.module.scss';
import {FileModel} from '@/types/ModelTypes';
import {FileDropBoxProps} from '@/types/PropTypes';
import type {ChangeEvent, DragEvent, FC} from 'react';
import {useFormContext} from 'react-hook-form';

const FileDropBox: FC<FileDropBoxProps> = (props) => {
    const { name, multiple } = props;
    const { register, setValue, getValues, resetField } = useFormContext();
    const toggleHighlight = (e: DragEvent<HTMLInputElement>) => {
        e.currentTarget.parentElement?.parentElement?.classList.toggle(styles.highlight);
    };

    const { onChange: registerOnChange, ...restOfRegister } = register(name);

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const currentValues = getValues(name);
        const files = Array.from(e.target.files ?? []);

        if (multiple) {
            const formData = new FormData();
            return files.map(async (file) => {
                formData.set('file', file);
                const { data, error } = await axios.simplePost<FileModel[]>('/files', formData);
                if (!error) setValue(name, [...currentValues, data], { shouldDirty: true, shouldValidate: true });
            });
        } else {
            const formData = new FormData();
            formData.append('file', files[0]);
            const { data: file, error } = await axios.simplePost<FileModel>('/files', formData);
            if (!error) setValue(name, [file], { shouldDirty: true, shouldValidate: true });
        }

        e.target.value = '';
    };

    return (
        <div className={styles.dropboxContainer}>
            <label className={styles.label}>
                <span>CLICK HERE</span>
                <span>OR</span>
                <span>DRAG AND DROP</span>
                <input {...restOfRegister} className={styles.dropbox} multiple={multiple} type="file"
                       onBlur={undefined}
                       onChange={onChange} onDragEnter={toggleHighlight} onDragLeave={toggleHighlight}
                       onDrop={toggleHighlight}/>
            </label>
        </div>
    );
};

export default FileDropBox;