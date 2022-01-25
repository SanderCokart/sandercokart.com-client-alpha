import Toolbar from '@/components/formComponents/MarkdownEditor/Toolbar';
import useMDXComponents from '@/components/MDXComponents';
import styles from '@/styles/components/formComponents/MarkdownEditor/MarkdownEditor.module.scss';
import type {MarkdownEditorProps} from '@/types/PropTypes';
// @ts-ignore
import MDXRuntime from '@mdx-js/runtime';
import type {Dispatch, FC, MouseEvent, MutableRefObject, SetStateAction} from 'react';
import {createContext, createElement, useContext, useRef, useState} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {useFormContext} from 'react-hook-form';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
// @ts-ignore
import remarkUnderline from 'remark-underline';

const EditorContext = createContext({});
export const useEditorContext = () => useContext(EditorContext) as {
    editorRef: MutableRefObject<HTMLTextAreaElement | null>,
    previewRef: MutableRefObject<HTMLTextAreaElement | null>,
    tableRows: number,
    tableColumns: number,
    fontSize: number,
    gridColumns: number,
    gridRows: number,
    setState: Dispatch<SetStateAction<{ tableRows: number, tableColumns: number, fontSize: number, gridColumns: number, gridRows: number }>>
};

const MarkdownEditor: FC<MarkdownEditorProps> = ({ name, textareaProps, ...props }) => {
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

    const syncTextAreaWithPreview = (e: MouseEvent<HTMLTextAreaElement>) => {
        if (previewRef.current && editorRef.current) {
            const elements = Array.from(document.querySelectorAll(':hover'));
            const hovering = elements.includes(editorRef.current);

            if (hovering) {
                //total height
                const textareaHeight = editorRef.current.scrollHeight;
                const previewHeight = previewRef.current.scrollHeight;

                //amount actually scrolled
                const textareaScrolled = editorRef.current.scrollTop;

                //inner height
                const textareaInnerHeight = editorRef.current.clientHeight;
                const previewInnerHeight = previewRef.current.clientHeight;

                //available scroll hight on both
                const textareaScrollArea = textareaHeight - textareaInnerHeight;
                const previewScrollArea = previewHeight - previewInnerHeight;

                //amount scrolled converted from textarea to preview
                const percentageScrolledOnTextarea = (100 / textareaScrollArea) * textareaScrolled;

                previewRef.current.scrollTop = (previewScrollArea / 100) * percentageScrolledOnTextarea;
            }
        }
    };


    return (
        <EditorContext.Provider value={{ editorRef, previewRef, ...state, setState }}>
            <div {...props} className={styles.container}>
                <Toolbar name={name}/>
                <div className={styles.editorContainer}>
                <textarea {...restOfRegister} ref={el => {
                    ref(el);
                    editorRef.current = el;
                }}
                          className={styles.editor}
                          name={name}
                          onScroll={syncTextAreaWithPreview}
                          {...textareaProps}/>
                    <Preview name={name}/>
                </div>
            </div>
        </EditorContext.Provider>
    );
};

export default MarkdownEditor;


const Preview: FC<{ name: string }> = ({ name, ...props }) => {
    const MDXComponents = useMDXComponents(true);
    const { Title } = MDXComponents;
    const { editorRef, previewRef } = useEditorContext();
    const { watch } = useFormContext();
    const [markdown, title, excerpt]: string[] = watch([name, 'title', 'excerpt']);

    const syncPreviewWithTextArea = () => {

        if (previewRef.current && editorRef.current) {
            const elements = Array.from(document.querySelectorAll(':hover'));
            const hovering = elements.includes(previewRef.current);

            if (hovering) {
                //total height
                const textareaHeight = editorRef.current.scrollHeight;
                const previewHeight = previewRef.current.scrollHeight;

                //amount actually scrolled
                const previewScrolled = previewRef.current.scrollTop;

                //inner height
                const textareaInnerHeight = editorRef.current.clientHeight;
                const previewInnerHeight = previewRef.current.clientHeight;

                //available scroll hight on both
                const textareaScrollArea = textareaHeight - textareaInnerHeight;
                const previewScrollArea = previewHeight - previewInnerHeight;

                //amount scrolled converted from preview to textarea
                const percentageScrolledOnPreview = (100 / previewScrollArea) * previewScrolled;
                const result = (textareaScrollArea / 100) * percentageScrolledOnPreview;

                editorRef.current.scrollTop = result;
            }
        }
    };

    try {
        return createElement(
            'div', {
                ...props,
                ref: previewRef,
                onScroll: syncPreviewWithTextArea,
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