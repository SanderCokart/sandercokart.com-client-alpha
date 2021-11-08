import styles from '@/styles/components/formComponents/FileNew.module.scss';
import {FileProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import fileSize from 'filesize';
import {useFormikContext} from 'formik';
import type {ChangeEvent, FC, MouseEvent} from 'react';
import {useEffect, useRef, useState} from 'react';

interface FormikContext {
    values: { [name: string]: File[] };

    [key: string]: any;
}

const File: FC<FileProps> = (props) => {
    const { name } = props;
    const { values, setFieldValue } = useFormikContext<FormikContext>();
    const inputRef = useRef<HTMLInputElement>(null);
    const viewRef = useRef<HTMLDivElement>(null);
    const imagePreviewRef = useRef<HTMLImageElement>(null);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        const arr = [...event.currentTarget.files];
        setFieldValue(name, arr);
    };

    const onDrop = () => {
        viewRef?.current?.classList.remove(styles.highlight);
    };
    const onDragEnter = () => {
        viewRef?.current?.classList.add(styles.highlight);
    };
    const onDragLeave = () => {
        viewRef?.current?.classList.remove(styles.highlight);
    };

    useEffect(() => {

    }, []);

    const [maximized, setMaximized] = useState<string | null>(null);

    const maximize = (e: MouseEvent<HTMLImageElement>) => {
        setMaximized(e.currentTarget.src);
    };

    const minimize = () => {
        setMaximized(null);
    };

    return (
        <div ref={viewRef} className={styles.view}>
            {values[name]?.length ? (
                <FileTable maximize={maximize} name={name}/>
            ) : (
                <div className={styles.dropbox}>
                    <div className={styles.text}>dropbox</div>
                    <input ref={inputRef} multiple className={styles.input} name={name} type="file" value={values[name]}
                           onChange={onChange}
                           onDragEnter={onDragEnter} onDragLeave={onDragLeave}
                           onDrop={onDrop}/>
                </div>
            )}
            {maximized && (
                <div className={styles.previewContainer} onClick={minimize}>
                    <div className={styles.preview}>
                        <img ref={imagePreviewRef} alt="preview" className={styles.previewImage}
                             src={maximized}/>
                    </div>
                </div>
            )}
        </div>
    );
};

interface FileEntryProps {
    file: File,
    name: string,
    maximize: (e: MouseEvent<HTMLImageElement>) => void
}

const FileEntry: FC<FileEntryProps> = ({ file, maximize, name }) => {
    const [imageUrl, setImageUrl] = useState<string>('');

    console.log(true);

    useEffect(() => {
        setImageUrl(URL.createObjectURL(file));
        return () => {
            URL.revokeObjectURL(imageUrl);
        };
    }, []);

    return (
        <>
            <td className={styles.filePreview}>
                {imageUrl === '' && <FontAwesomeIcon className={styles.spinner} icon={['fas', 'spinner']}/>}
                <img alt="preview" className={styles.image} src={imageUrl}
                     onClick={e => maximize(e)}/>
            </td>
            <td className={styles.fileName}>{file.name}</td>
            <td className={styles.fileSize}>{fileSize(file.size)}</td>
            <td className={styles.fileActions}>
                <FileActions file={file} name={name}/>
            </td>
        </>
    );
};

const FileActions: FC<{ file: File, name: string }> = ({ file, name }) => {
    const { setFieldValue, values } = useFormikContext<FormikContext>();
    const onDelete = () => {
        setFieldValue(name, values[name]?.filter((item: File) => file !== item));
    };
    return (
        <>
            <button className={styles.deleteButton} type="button" onClick={onDelete}>
                <FontAwesomeIcon icon={['fas', 'trash']}/>
            </button>
        </>
    );
};


const ColGroup: FC = () => (
    <colgroup className={styles.colGroup}>
        <col/>
        <col/>
        <col/>
        <col/>
    </colgroup>
);

const TableHead: FC = () => (
    <thead>
    <tr>
        <th className={styles.filePreview}>Preview</th>
        <th className={styles.fileName}>Name</th>
        <th className={styles.fileSize}>Size</th>
        <th className={styles.fileActions}>Actions</th>
    </tr>
    </thead>
);

const FileTable: FC<{ name: string, maximize: (e: MouseEvent<HTMLImageElement>) => void }> = (props) => {
    const { name, maximize } = props;
    const { values } = useFormikContext<{ [key: string]: any; values: { [name: string]: File[] } }>();

    return (
        <>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <ColGroup/>
                    <TableHead/>
                    <tbody>
                    {values[name]?.map((file: File, index: number) => {
                        return (
                            <tr key={index}>
                                <FileEntry file={file} maximize={maximize} name={name}/>
                            </tr>
                        );
                    })
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default File;