import styles from './NewMarkdownEditor.module.scss';
import NewToolbar, {ToolbarProps} from '@/components/formComponents/MarkdownEditor/NewToolbar';
import Editor from '@/components/formComponents/MarkdownEditor/Editor';
import {useRef, createContext, useContext, Dispatch, SetStateAction, useState, RefObject} from 'react';
import Preview from '@/components/formComponents/MarkdownEditor/Preview';
import {PreviewProps} from '@/components/formComponents/MarkdownEditor/Preview/Preview';
import {EditorProps} from '@/components/formComponents/MarkdownEditor/Editor/Editor';
import {UseFormRegisterReturn} from 'react-hook-form';

interface MarkdownEditorProps {
    name?: string;
    registerFormHook?: UseFormRegisterReturn;
    editorProps?: Partial<EditorProps>;
    previewProps?: Partial<PreviewProps>;
    toolbarProps?: Partial<ToolbarProps>;
}

const EditorContext = createContext({});
export const useEditorContext = () => useContext(EditorContext) as {
    editorRef: RefObject<HTMLTextAreaElement>,
    previewRef: RefObject<HTMLTextAreaElement>,
    tableColumns: number,
    gridColumns: number,
    fontSize: number,
    setState: Dispatch<SetStateAction<{ tableRows: number, tableColumns: number, fontSize: number, gridColumns: number, gridRows: number }>>
};

const NewMarkdownEditor = (props: MarkdownEditorProps) => {
    const { toolbarProps, editorProps, previewProps } = props;
    const editorRef = useRef<HTMLTextAreaElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    const [state, setState] = useState({
        tableRows: 1,
        tableColumns: 1,
        gridColumns: 1,
        fontSize: 20
    });

    const nameAndId = props.registerFormHook?.name || props.name || '';

    return (
        <EditorContext.Provider value={{ editorRef, previewRef, ...state, setState }}>
            <div className={styles.root}>
                <NewToolbar {...toolbarProps}/>
                <div className={styles.editorArea}>
                    <Editor ref={editorRef} name={nameAndId} registerFormHook={props.registerFormHook} {...editorProps}/>
                    <Preview {...previewProps}/>
                </div>
            </div>
        </EditorContext.Provider>
    );
};

export default NewMarkdownEditor;