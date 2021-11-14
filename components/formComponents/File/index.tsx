import DropBox from '@/components/formComponents/File/DropBox';
import FileCarousel from '@/components/formComponents/File/FileCarousel';
import styles from '@/styles/components/formComponents/File/File.module.scss';
import type {FileProps} from '@/types/FormControlTypes';
import type {FC} from 'react';

export interface File {
    created_at: string;
    id: number;
    mime_type: string;
    original_name: string;
    private_url: string | null;
    relative_path: string;
    updated_at: string;
}

const Index: FC<FileProps> = (props) => {
    return (
        <div className={styles.formControl}>
            <FileCarousel {...props}/>
            <DropBox {...props}/>
        </div>
    );
};

export default Index;