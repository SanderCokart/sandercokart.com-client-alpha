import FileItem from '@/components/formComponents/File/FileItem';
import styles from '@/styles/components/formComponents/File/FileContainer.module.scss';
import type {FileProps} from '@/types/FormControlTypes';
import type {FC} from 'react';
import {useFormContext, useWatch} from 'react-hook-form';

interface File {
    created_at: string;
    id: number;
    mime_type: string;
    original_name: string;
    private_url: string | null;
    relative_path: string;
    updated_at: string;
}

const FileCarousel: FC<FileProps> = (props) => {
    const { name } = props;
    const { setValue } = useFormContext();
    const files: File[] = useWatch({ name, defaultValue: [] });

    const onDelete = (fileToBeDeleted: File, indexOfFileToBeDeleted: number) => {
        // setValue(name, files.filter(file => file !== fileToBeDeleted));
    };

    return (
        <div className={styles.filesContainer}>
            {!!files.length && [...files]?.map((file, index) => {
                return <FileItem key={file.id} file={file} index={index} onDelete={onDelete}/>;
            })}
        </div>
    );
};

export default FileCarousel;