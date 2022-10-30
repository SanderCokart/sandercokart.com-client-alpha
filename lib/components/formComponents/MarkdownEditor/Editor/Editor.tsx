import type {FocusEventHandler, ChangeEventHandler, KeyboardEvent} from 'react';
import type {UseFormRegisterReturn} from 'react-hook-form';

import {useEditorContext} from '@/components/formComponents/MarkdownEditor';

import syncScroll from '@/functions/client/syncScroll';

import {useEditorToolbar} from '@/providers/EditorToolbarContextProvider';

import styles from './Editor.module.scss';

export interface EditorProps {
    registerFormHook?: UseFormRegisterReturn;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    onBlur?: FocusEventHandler<HTMLTextAreaElement>;
}

const Editor = (props: EditorProps) => {
    const { registerFormHook, onChange, onBlur } = props;
    const { previewRef, setEditorRef, editorRef, nameAndId } = useEditorContext();
    const { insert, tabSize } = useEditorToolbar();

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            let tab = '';
            for (let i = 0; i < tabSize; i++) {
                tab += ' ';
            }
            insert(tab);
        }

        /*TODO DELETE LINE*/
        // if (e.key === 'k' && e.altKey && e.shiftKey) {
        //
        // }
    };

    return (
        <div className={styles.root}>
            <textarea
                ref={el => {
                    setEditorRef(el);
                    registerFormHook?.ref(el);
                }}
                className={styles.textarea}
                id={nameAndId}
                name={nameAndId}
                onBlur={event => {
                    onBlur?.(event);
                    registerFormHook?.onBlur(event);
                }}
                onChange={event => {
                    onChange?.(event);
                    registerFormHook?.onChange(event);
                }}
                onKeyDown={onKeyDown} onScroll={() => syncScroll(editorRef, previewRef)}/>
        </div>
    );
};

export default Editor;