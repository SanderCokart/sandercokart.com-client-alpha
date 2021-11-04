import DropBox from '@/components/formComponents/File/DropBox';
import FileRow from '@/components/formComponents/File/FileRow';
import styles from '@/styles/components/formComponents/File/File.module.scss';
import type {FileProps} from '@/types/FormControlTypes';
import type {FC} from 'react';

const Index: FC<FileProps> = (props) => {
    return (
        <div className={styles.formControl}>
            <FileRow {...props}/>
            <DropBox {...props}/>
        </div>
    );
};

export default Index;