import styles from '@/styles/components/formComponents/File/FileContainer.module.scss';
import type {FileProps} from '@/types/FormControlTypes';
import type {FC} from 'react';
import {useWatch} from 'react-hook-form';
import FileItem from './FileItem';
import type {ApiFileType} from './index';


const FileCarousel: FC<FileProps> = (props) => {
    const { name } = props;
    const files: File[] & Partial<ApiFileType[]> = useWatch({ name, defaultValue: [] });


    return (
        <div className={styles.filesContainer}>
            {!!files.length && [...files]?.map((file, index) => {
                return <FileItem {...props} key={index} file={file} index={index}/>;
            })}
        </div>
    );
};

export default FileCarousel;