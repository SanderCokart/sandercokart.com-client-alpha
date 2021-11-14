import FileItem from '@/components/formComponents/File/FileItem';
import type {File} from '@/components/formComponents/File/index';
import styles from '@/styles/components/formComponents/File/FileContainer.module.scss';
import type {FileProps} from '@/types/FormControlTypes';
import type {FC} from 'react';
import {useWatch} from 'react-hook-form';


const FileCarousel: FC<FileProps> = (props) => {
    const { name } = props;
    const files: File[] = useWatch({ name, defaultValue: [] });


    return (
        <div className={styles.filesContainer}>
            {!!files.length && [...files]?.map(file => {
                return <FileItem {...props} key={file.id} file={file}/>;
            })}
        </div>
    );
};

export default FileCarousel;