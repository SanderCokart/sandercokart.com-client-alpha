import styles from './Editor.module.scss';
import {FocusEventHandler, ChangeEventHandler} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';
import syncScroll from '@/functions/client/syncScroll';
import {useEditorContext} from '@/components/formComponents/MarkdownEditor/NewMarkdownEditor';

export interface EditorProps {
    registerFormHook?: UseFormRegisterReturn;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    onBlur?: FocusEventHandler<HTMLTextAreaElement>;
}

const Editor = (props: EditorProps) => {
    const { registerFormHook, onChange, onBlur } = props;
    const { previewRef, setEditorRef, editorRef, nameAndId: name } = useEditorContext();

    return (
        <div className={styles.root}>
            <textarea
                ref={el => {
                    setEditorRef(el);
                    registerFormHook?.ref(el);
                }}
                className={styles.textarea}
                name={name}
                onBlur={event => {
                    onBlur?.(event);
                    registerFormHook?.onBlur(event);
                }}
                onChange={event => {
                    onChange?.(event);
                    registerFormHook?.onChange(event);
                }} onScroll={() => syncScroll(editorRef, previewRef)}/>
        </div>
    );
};

export default Editor;