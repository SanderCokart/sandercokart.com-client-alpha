import FileDropBox from '@/components/formComponents/File/FileDropBox';
import FilePreviewCarousel from '@/components/formComponents/File/FilePreviewCarousel';
import styles from './File.module.scss';
import type {FileModel} from '@/types/ModelTypes';
import ObjectPath from 'object-path';
import {useFormContext, useFormState} from 'react-hook-form';

interface FileProps {
    editMode?: boolean;
    multiple?: boolean;
    name: string;
}

const File = (props: FileProps) => {
    const { name, multiple = false, editMode = false } = props;
    const { watch } = useFormContext();
    const { dirtyFields } = useFormState();

    const isDirty = ObjectPath.has(dirtyFields, name);

    const files: FileModel[] = watch(name, []);

    return (
        <div className={styles.file}>
            {!!files?.length && <FilePreviewCarousel editMode={editMode} multiple={multiple} name={name}/>}
            {(multiple || !isDirty) && <FileDropBox editMode={editMode} multiple={multiple} name={name}/>}
        </div>
    );
};

export default File;