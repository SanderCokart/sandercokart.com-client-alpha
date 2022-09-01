// @ts-ignore
import MDXRuntime from '@mdx-js/runtime';
import type {Dispatch, MutableRefObject, SetStateAction} from 'react';
import {
    createContext,
    createElement,
    useContext,
    useRef,
    useState,
    HTMLAttributes,
    TextareaHTMLAttributes
} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {useFormContext} from 'react-hook-form';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
// @ts-ignore
import remarkUnderline from 'remark-underline';

import NewToolbar from '@/components/formComponents/MarkdownEditor/NewToolbar';
import useMDXComponents from '@/components/MDXComponents';

import syncScroll from '@/functions/client/syncScroll';

import styles from './MarkdownEditor.module.scss';

const EditorContext = createContext({});
export const useEditorContext = () => useContext(EditorContext) as {
    editorRef: MutableRefObject<any>,
    previewRef: MutableRefObject<any>,
    tableRows: number,
    tableColumns: number,
    fontSize: number,
    gridColumns: number,
    setState: Dispatch<SetStateAction<{ tableRows: number, tableColumns: number, fontSize: number, gridColumns: number, gridRows: number }>>
};

interface MarkdownEditorProps extends HTMLAttributes<HTMLDivElement> {
    name: string;
    textareaProps?: TextareaHTMLAttributes<any>;
}

const MarkdownEditor = ({ name, textareaProps, ...restOfProps }: MarkdownEditorProps) => {
    const editorRef = useRef<HTMLTextAreaElement | null>(null);
    const previewRef = useRef<HTMLDivElement | null>(null);
    const { register } = useFormContext();

    const { ref, ...restOfRegister } = register(name);

    const [state, setState] = useState({
        tableRows: 1,
        tableColumns: 1,
        fontSize: 20,
        gridColumns: 1,
        gridRows: 1
    });


    return (
        <EditorContext.Provider value={{ editorRef, previewRef, ...state, setState }}>
            <div {...restOfProps} className={styles.container}>
                <NewToolbar/>
                <div className={styles.editorContainer}>
                <textarea
                    {...restOfRegister}
                    ref={el => {
                        ref(el);
                        editorRef.current = el;
                    }}
                    className={styles.editor}
                    name={name}
                    onScroll={() => syncScroll(editorRef, previewRef)}
                    {...textareaProps}/>
                    <Preview name={name}/>
                </div>
            </div>
        </EditorContext.Provider>
    );
};


interface PreviewProps {
    name: string;
}

const Preview = ({ name, ...props }: PreviewProps) => {
    const MDXComponents = useMDXComponents(true);
    const { Title } = MDXComponents;
    const { editorRef, previewRef } = useEditorContext();
    const { watch } = useFormContext();
    const [markdown, title, excerpt]: string[] = watch([name, 'title', 'excerpt']);


    try {
        return createElement(
            'div', {
                ...props,
                ref: previewRef,
                onScroll: () => syncScroll(previewRef, editorRef),
                className: styles.preview,
                dangerouslySetInnerHTML: {
                    __html: renderToStaticMarkup(
                        <>
                            <Title>{title}</Title>
                            <p>{excerpt}</p>
                            <MDXRuntime components={MDXComponents} rehypePlugins={[rehypeSlug]}
                                        remarkPlugins={[remarkToc, remarkUnderline]}
                                        scope={undefined}>
                                {markdown}
                            </MDXRuntime>
                        </>
                    )
                }
            }
        );
    } catch (e) {

        return (
            <div className={styles.error}>
                <MDXRuntime components={MDXComponents} rehypePlugins={[rehypeSlug]}
                            remarkPlugins={[remarkToc, remarkUnderline]}>
                    {renderToStaticMarkup(<>{markdown}</>)}
                </MDXRuntime>
            </div>
        );
    }
};

export default MarkdownEditor;