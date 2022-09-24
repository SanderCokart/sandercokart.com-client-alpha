import classnames from 'classnames';
import type {ChangeEvent} from 'react';
import {useState} from 'react';
import {useFormContext} from 'react-hook-form';

import setFormErrors from '@/functions/client/setFormErrors';
import axios from '@/functions/shared/axios';

import type {FileModel} from '@/types/ModelTypes';

import styles from './FileDropbox.module.scss';

interface FileDropboxProps {
    name: string;
    multiple?: boolean;
}

const LetGoMessage = () => (
    <div className={styles.messageContainer}>
        <span>Let go!</span>
    </div>
);

const DropHereMessage = () => (
    <div className={styles.messageContainer}>
        <span>Click here</span>
        <span>or</span>
        <span>drag and drop any file</span>
    </div>
);

const FileDropbox = (props: FileDropboxProps) => {
    const [highlighted, setHighlighted] = useState(false);
    const { setValue, setError, getValues } = useFormContext();

    const toggleHighlight = () => {
        setHighlighted(prev => !prev);
    };

    const inputClassNames = classnames([
        styles.input,
        (highlighted && styles.highlight)
    ]);

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        const uploadedFiles: FileModel[] = [];
        for (const file of files) {
            const formData = new FormData();
            formData.set('file', file);

            const response = await axios.simplePost<FileModel>('/files', formData);
            switch (response.type) {
                case 'success':
                    uploadedFiles.push(response.data);
                    break;
                case 'form':
                    setFormErrors(setError, response.errors);
                    break;
                default:
                    break;
            }
        }

        setValue(props.name, props.multiple ? [...getValues(props.name), ...uploadedFiles] : uploadedFiles);
        e.target.value = '';
    };

    return (
        <div className={styles.root}>
            {highlighted ? <LetGoMessage/> : <DropHereMessage/>}
            <input className={inputClassNames} multiple={props.multiple} type="file" onChange={onChange}
                   onDragEnter={toggleHighlight} onDragLeave={toggleHighlight} onDrop={toggleHighlight}/>
        </div>
    );
};

export default FileDropbox;