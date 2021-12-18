import DropBox from '@/components/formComponents/File/DropBox';
import FileCarousel from '@/components/formComponents/File/FileCarousel';
import styles from '@/styles/components/formComponents/File/File.module.scss';
import type {FileProps} from '@/types/FormControlTypes';
import type {FC} from 'react';

export interface ApiFileType {
    id: number;
    created_at: string;
    original_name: string;
    relative_path?: string;
    url: string;
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

// $table->id();
// $table->nullableMorphs('fileable');
// $table->string('original_name');
// $table->string('mime_type');
// $table->boolean('is_private')->default(true);
// $table->string('relative_url');
// $table->timestampsTz();