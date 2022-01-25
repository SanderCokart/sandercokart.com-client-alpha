import useImage from '@/hooks/useImage';
import styles from '@/styles/components/formComponents/File/FileItem.module.scss';
import type {FileProps} from '@/types/FormControlTypes';
import {Banner} from '@/types/ModelTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {FC} from 'react';
import useFile from '../../../hooks/useFile';


const FileItem: FC<{ file: File | Banner, index: number } & FileProps> = (props) => {
    const { getUrl } = useImage();
    const { file, deleteFile } = useFile(props.file, props.name, props.index);
    const url = getUrl(file);

    return (
        <div className={styles.fileItem}>
            <div className={styles.control}>
                {file?.url ?
                 <>
                     <img alt="preview" className={styles.file} src={url}/>
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