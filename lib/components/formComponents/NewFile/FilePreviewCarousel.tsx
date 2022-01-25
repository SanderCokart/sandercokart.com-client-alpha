import axios from '@/functions/shared/axios';
import useImage from '@/hooks/useImage';
import styles from '@/styles/components/formComponents/NewFile/FilePreviewCarousel.module.scss';
import {FileModel} from '@/types/ModelTypes';
import {FilePreviewCarouselProps} from '@/types/PropTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ObjectPath from 'object-path';
import type {FC} from 'react';
import {useFormContext} from 'react-hook-form';

const FilePreviewCarousel: FC<FilePreviewCarouselProps> = (props) => {
    const { name, multiple, editMode } = props;
    const { formState: { dirtyFields }, resetField, watch } = useFormContext();
    const { getUrl } = useImage();

    const files: FileModel[] = watch(name, []);

    const isDirty = ObjectPath.has(dirtyFields, name);

    const onReset = async () => {
        for (const file of files) {
            await axios.simpleDelete(`/files/${file.id}`);
        }
        resetField(name);
    };

    const onDelete = async (file: FileModel) => {
        if (editMode) {
            await onReset();
        } else {
            await axios.simpleDelete(`/files/${file.id}`);
        }
    };

    return (
        <div className={styles.carouselContainer}>
            {isDirty && (
                <button className={styles.resetButton} type="button" onClick={onReset}>
                    <FontAwesomeIcon icon="undo"/>
                </button>
            )}
            {files.map((file) => (
                <div key={file.id} className={styles.carouselItem}>
                    {(editMode && isDirty || !editMode) && (
                        <button className={styles.deleteButton} type="button" onClick={() => onDelete(file)}>
                            <FontAwesomeIcon icon="trash"/>
                        </button>
                    )}
                    <img alt="alt" src={getUrl(file)}/>
                </div>
            ))}
        </div>
    );
};

export default FilePreviewCarousel;