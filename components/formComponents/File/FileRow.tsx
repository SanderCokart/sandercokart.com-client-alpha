import FileItem from '@/components/formComponents/File/FileItem';
import styles from '@/styles/components/formComponents/File/FileRow.module.scss';
import type {FileProps} from '@/types/FormControlTypes';
import type {FC} from 'react';
import {useFormContext, useWatch} from 'react-hook-form';

const FileRow: FC<FileProps> = (props) => {
    const { name } = props;
    const { setValue } = useFormContext();
    const files: File[] = useWatch({ name, defaultValue: [] });

    const onDelete = (fileToBeDeleted: File) => {
        setValue(name, files.filter(file => file !== fileToBeDeleted));
    };

    return (
        <div className={styles.filesContainer}>
            {!!files.length && [...files]?.map((file,index) => {
                return <FileItem key={index} file={file} onDelete={onDelete}/>;
            })}
        </div>
    );
};

export default FileRow;