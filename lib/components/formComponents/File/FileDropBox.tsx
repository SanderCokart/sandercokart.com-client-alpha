import axios from '@/functions/shared/axios';
import styles from './FileDropBox.module.scss';
import type {FileModel} from '@/types/ModelTypes';
import type {ChangeEvent, DragEvent} from 'react';
import {useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import {ApiPostFilesStoreRoute} from '@/constants/api-routes';
import setFormErrors from '@/functions/client/setFormErrors';

interface FileDropBoxProps {
    editMode?: boolean;
    multiple?: boolean;
    name: string;
}

const FileDropBox = (props: FileDropBoxProps) => {
    const { name, multiple } = props;
    const { setValue, getValues, setError, resetField, control: { _defaultValues } } = useFormContext();
    const toggleHighlight = (e: DragEvent<HTMLInputElement>) => {
        e.currentTarget.parentElement?.parentElement?.classList.toggle(styles.highlight);
    };

    useEffect(() => {
        resetField(name, { defaultValue: _defaultValues[name] ?? [] });
    }, []);

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);

        if (multiple) {
            const formData = new FormData();
            for (const file of files) {
                formData.set('file', file);
                const response = await axios.simplePost<FileModel[]>(ApiPostFilesStoreRoute, formData);
                switch (response.type) {
                    case 'form':
                        setFormErrors(setError, response.errors);
                        break;
                    case 'success': {
                        setValue(name,
                            [...getValues(name), response.data],
                            { shouldDirty: true, shouldValidate: true }
                        );
                    }
                }
            }
        } else {
            const formData = new FormData();
            formData.set('file', files[0]);
            const response = await axios.simplePost<FileModel>(ApiPostFilesStoreRoute, formData);
            switch (response.type) {
                case 'form':
                    setFormErrors(setError, response.errors);
                    break;
                case 'success':
                    setValue(name, [response.data], { shouldDirty: true, shouldValidate: true });
            }
        }

        e.target.value = '';
    };

    return (
        <div className={styles.dropboxContainer}>
            <label className={styles.label}>
                <span>CLICK HERE</span>
                <span>OR</span>
                <span>DRAG AND DROP</span>
                <input className={styles.dropbox} multiple={multiple} type="file"
                       onBlur={undefined}
                       onChange={onChange} onDragEnter={toggleHighlight} onDragLeave={toggleHighlight}
                       onDrop={toggleHighlight}/>
            </label>
        </div>
    );
};

export default FileDropBox;