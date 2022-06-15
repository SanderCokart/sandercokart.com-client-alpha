import axios from '@/functions/shared/axios';
import useImage from '@/hooks/useFile';
import styles from './FilePreviewCarousel.module.scss';
import type {FileModel} from '@/types/ModelTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ObjectPath from 'object-path';
import {useFormContext} from 'react-hook-form';

interface FilePreviewCarouselProps {
    editMode?: boolean;
    multiple?: boolean;
    name: string;
}

const FilePreviewCarousel = (props: FilePreviewCarouselProps) => {
    const { name, editMode } = props;
    const { formState: { dirtyFields }, resetField, watch, setValue } = useFormContext();
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
            setValue(name, files.filter(f => f.id !== file.id));
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
            {files.map((file) => {
                const { url } = getUrl(file);
                return (
                    <div key={file.id} className={styles.carouselItem}>
                        {(editMode && isDirty || !editMode) && (
                            <button className={styles.deleteButton} type="button" onClick={() => onDelete(file)}>
                                <FontAwesomeIcon icon="trash"/>
                            </button>
                        )}
                        <img alt="alt" src={url}/>
                    </div>
                );
            })}
        </div>
    );
};

export default FilePreviewCarousel;