import {useRef, createContext, useContext, RefObject} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';

import Editor from '@/components/formComponents/MarkdownEditor/Editor';
import {EditorProps} from '@/components/formComponents/MarkdownEditor/Editor/Editor';
import NewToolbar, {ToolbarProps} from '@/components/formComponents/MarkdownEditor/NewToolbar';
import Preview from '@/components/formComponents/MarkdownEditor/Preview';
import {PreviewProps} from '@/components/formComponents/MarkdownEditor/Preview/Preview';


import styles from './NewMarkdownEditor.module.scss';

interface MarkdownEditorProps {
    name?: string;
    registerFormHook?: UseFormRegisterReturn;
    editorProps?: Partial<EditorProps>;
    previewProps?: Partial<PreviewProps>;
    toolbarProps?: Partial<ToolbarProps>;
}

const EditorContext = createContext({});
export const useEditorContext = () => useContext(EditorContext) as {
    editorRef: RefObject<HTMLTextAreaElement | null>;
    setEditorRef: (element: HTMLTextAreaElement | null) => void;
    previewRef: RefObject<HTMLDivElement | null>;
    setPreviewRef: (element: HTMLDivElement | null) => void;
    nameAndId: string;
};

const NewMarkdownEditor = (props: MarkdownEditorProps) => {
    const editorRef = useRef<HTMLTextAreaElement | null>(null);
    const previewRef = useRef<HTMLDivElement | null>(null);

    const setEditorRef = (element: HTMLTextAreaElement) => {
        editorRef.current = element;
    };

    const setPreviewRef = (element: HTMLDivElement) => {
        previewRef.current = element;
    };

    const nameAndId = props.registerFormHook?.name || props.name || '';

    return (
        <EditorContext.Provider
            value={{ editorRef, setEditorRef, previewRef, setPreviewRef, nameAndId }}>
            <div className={styles.root}>
                <NewToolbar {...props.toolbarProps}/>
                <div className={styles.editorArea}>
                    <Editor registerFormHook={props.registerFormHook} {...props.editorProps}/>
                    <Preview {...props.previewProps}/>
                </div>
            </div>
        </EditorContext.Provider>
    );
};

export default NewMarkdownEditor;