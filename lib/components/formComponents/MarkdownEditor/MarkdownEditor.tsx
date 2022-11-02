import type {RefObject} from 'react';
import {useRef, createContext, useContext, useState} from 'react';
import type {UseFormRegisterReturn} from 'react-hook-form';

import Editor from '@/components/formComponents/MarkdownEditor/Editor';
import type {EditorProps} from '@/components/formComponents/MarkdownEditor/Editor/Editor';
import MDXPreview from '@/components/formComponents/MarkdownEditor/MDXPreview';
import Toolbar from '@/components/formComponents/MarkdownEditor/Toolbar/Toolbar';

import styles from './MarkdownEditor.module.scss';

interface MarkdownEditorProps {
    name?: string;
    registerFormHook?: UseFormRegisterReturn;
    editorProps?: Partial<EditorProps>;
}

const EditorContext = createContext({});
export const useEditorContext = () => useContext(EditorContext) as {
    editorRef: RefObject<HTMLTextAreaElement | null>;
    setEditorRef: (element: HTMLTextAreaElement | null) => void;
    previewRef: RefObject<HTMLDivElement | null>;
    setPreviewRef: (element: HTMLDivElement | null) => void;
    nameAndId: string;
};

const MarkdownEditor = (props: MarkdownEditorProps) => {
    const editorRef = useRef<HTMLTextAreaElement | null>(null);
    const previewRef = useRef<HTMLDivElement | null>(null);
    const [_, setInitiated] = useState(false);

    const setEditorRef = (element: HTMLTextAreaElement) => {
        setInitiated(true);
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
                <Toolbar>
                    <div className={styles.editorArea}>
                        <Editor registerFormHook={props.registerFormHook} {...props.editorProps}/>
                        <MDXPreview/>
                    </div>
                </Toolbar>
            </div>
        </EditorContext.Provider>
    );
};

export default MarkdownEditor;