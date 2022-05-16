import styles from './Editor.module.scss';
import {forwardRef, FocusEventHandler, ChangeEventHandler} from 'react';
import {useEditorContext} from '@/components/formComponents/MarkdownEditor/NewMarkdownEditor';
import {UseFormRegisterReturn} from 'react-hook-form';

export interface EditorProps {
    registerFormHook?: UseFormRegisterReturn;
    name: string;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    onBlur?: FocusEventHandler<HTMLTextAreaElement>;
}

const Editor = forwardRef<HTMLTextAreaElement, EditorProps>(function Editor(props, editorRef) {
    const { registerFormHook, onChange, onBlur, ...restOfProps } = props;
    const {} = useEditorContext();

    return (
        <div className={styles.root}>
            <textarea
                ref={el => {
                    // @ts-ignore
                    editorRef.current = el;
                    registerFormHook?.ref(el);
                }}
                className={styles.textarea}
                onBlur={event => {
                    onBlur?.(event);
                    registerFormHook?.onBlur(event);
                }}
                onChange={event => {
                    onChange?.(event);
                    registerFormHook?.onChange(event);
                }} {...restOfProps}/>
        </div>
    );
});

export default Editor;