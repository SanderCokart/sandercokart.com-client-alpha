import styles from '@/styles/components/formComponents/File/FileRow.module.scss';
import type {FC} from 'react';

const FileRow: FC = () => {
    return (
        <div className={styles.fileGrid}>
            <img alt="preview" src="https://unsplash.it/500"/>
            <img alt="preview" src="https://unsplash.it/500"/>
            <img alt="preview" src="https://unsplash.it/500"/>
            <img alt="preview" src="https://unsplash.it/500"/>
            <img alt="preview" src="https://unsplash.it/500"/>
            <img alt="preview" src="https://unsplash.it/500"/>
            <img alt="preview" src="https://unsplash.it/500"/>
            <img alt="preview" src="https://unsplash.it/500"/>
            <img alt="preview" src="https://unsplash.it/500"/>
        </div>
    );
};

export default FileRow;