import FileRow from '@/components/formComponents/File/FileRow';
import DropBox from '@/components/hookFormComponents/File/DropBox';
import styles from '@/styles/components/formComponents/File/File.module.scss';
import type {FileProps} from '@/types/FormControlTypes';
import type {FC} from 'react';

const Index: FC<FileProps> = (props) => {
    return (
        <div className={styles.formControl}>
            <FileRow/>
            <DropBox {...props}/>
        </div>
    );
};

export default Index;