import styles from '@/styles/components/formComponents/File/FileItem.module.scss';
import type {FileProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {FC} from 'react';
import useFile from '../../../hooks/useFile';
import {ApiFileType} from './index';


const FileItem: FC<{ file: File & ApiFileType, index: number } & FileProps> = (props) => {
    const { file, deleteFile } = useFile(props.file, props.name, props.index);

    return (
        <div className={styles.fileItem}>
            <div className={styles.control}>
                {file?.url ?
                 <>
                     <img alt="preview" className={styles.file} src={file.url}/>
                     <div className={styles.actionsContainer}>
                         <button className={styles.action} type="button" onClick={deleteFile}><FontAwesomeIcon
                             icon={['fas', 'times']}/></button>
                     </div>
                 </>
                           :
                 <div className={styles.loading}><FontAwesomeIcon icon={['fas', 'spinner']}/></div>
                }
            </div>
        </div>
    );
};

export default FileItem;