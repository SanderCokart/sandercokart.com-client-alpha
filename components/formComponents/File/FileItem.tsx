import styles from '@/styles/components/formComponents/File/FileItem.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {FC} from 'react';

interface PublicFile {
    created_at: string;
    id: number;
    mime_type: string;
    original_name: string;
    relative_path: string;
    updated_at: string;
    public_url: string;
    private_url: null;
}

interface PrivateFile {
    created_at: string;
    id: number;
    mime_type: string;
    original_name: string;
    relative_path: string;
    updated_at: string;
    private_url: string;
    public_url: null;
}

const FileItem: FC<{ onDelete: (file: File, index: number) => void, file: PublicFile | PrivateFile, index: number }> = (props) => {
    const onDelete = () => {
        // props.onDelete(props.file, props.file.id);
    };

    const url = props.file.private_url ? `${process.env.NEXT_PUBLIC_API_URL}${props.file.private_url}` : props.file.public_url ?? '';

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