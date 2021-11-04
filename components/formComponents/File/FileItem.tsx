import styles from '@/styles/components/formComponents/File/FileItem.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {FC} from 'react';
import {useEffect, useState} from 'react';

const FileItem: FC<{ onDelete: (file: File) => void, file: File }> = (props) => {

    const onDelete = () => {
        props.onDelete(props.file);
    };

    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        setUrl(URL.createObjectURL(props.file));
    }, []);

    return (
        <div className={styles.fileItem}>
            <div className={styles.control}>
                <img alt="preview" className={styles.file} src={url}/>
                <div className={styles.actionsContainer}>
                    <button className={styles.action} type="button" onClick={onDelete}><FontAwesomeIcon
                        icon={['fas', 'times']}/></button>
                </div>
            </div>
        </div>
    );
};

export default FileItem;