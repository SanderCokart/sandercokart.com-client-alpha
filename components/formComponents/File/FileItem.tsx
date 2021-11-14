import type {File} from '@/components/formComponents/File/index';
import {handler, useApi} from '@/providers/ApiProvider';
import styles from '@/styles/components/formComponents/File/FileItem.module.scss';
import type {FileProps} from '@/types/FormControlTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {FC} from 'react';
import {useFormContext} from 'react-hook-form';


const FileItem: FC<{ file: File } & FileProps> = (props) => {
    const { setValue, getValues, formState: { isSubmitted } } = useFormContext();
    const api = useApi();

    const onDelete = async () => {
        const { data, status } = await (handler(api.delete(`/files/${props.file.id}`)));
        setValue(props.name, getValues(props.name).filter((file: File) => file.id !== props.file.id));
    };

    const url = `${process.env.NEXT_PUBLIC_API_URL}/files/${props.file.id}`;

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