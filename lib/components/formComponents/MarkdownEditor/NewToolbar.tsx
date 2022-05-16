import styles from './NewToolbar.module.scss';
import {useEditorContext} from '@/components/formComponents/MarkdownEditor/MarkdownEditor';

export interface ToolbarProps {

}

const NewToolbar = (props: ToolbarProps) => {
    const { editorRef } = useEditorContext();
    return (
        <div className={styles.root}>
            <div className={styles.left}></div>
            <div className={styles.right}></div>
        </div>
    );
};

export default NewToolbar;