import FileTextContainer from '@/components/formComponents/components/FileTextContainer';
import ImagePreview from '@/components/formComponents/components/ImagePreview';
import styles from '@/styles/components/formComponents/File.module.scss';
import {FileProps} from '@/types/FormControlTypes';
import {ErrorMessage, useFormikContext} from 'formik';
import type {ChangeEvent, DragEvent, FC} from 'react';
import {useRef, useState} from 'react';


const FileOld: FC<FileProps> = (props) => {
    const hoverContainer = useRef<HTMLDivElement>(null);
    const { name, multiple = false, ...rest } = props;
    const { setFieldValue, values } = useFormikContext<{ [name: string]: File[] }>();
    const [images, setImages] = useState<File[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const arr = Array.from(event.currentTarget.files);
        setFieldValue(name, arr);
    };

    const onDragEnter = (event: DragEvent<HTMLInputElement>) => {
        hoverContainer?.current?.classList.add(styles.highlight);
    };
    const onDragLeave = (event: DragEvent<HTMLInputElement>) => {
        hoverContainer?.current?.classList.remove(styles.highlight);
    };

    const onDrop = (event: DragEvent<HTMLInputElement>) => {
        hoverContainer?.current?.classList.remove(styles.highlight);
    };

    return (
        <div className={styles.formControl}>
            <div className={styles.inputContainer}>
                <input multiple={multiple} type="file"
                       onDragEnter={onDragEnter} onDragLeave={onDragLeave} {...rest}
                       onChange={handleChange} onDrop={onDrop}/>
                <div ref={hoverContainer} className={styles.hoverContainer}>

                    {!values?.[name]?.length && <FileTextContainer/>}
                    <ImagePreview images={values[name]}/>

                </div>
            </div>

            <div className={styles.formControlError}>
                <ErrorMessage component="span" name={name}/>
            </div>
        </div>
    );
};

export default FileOld;

