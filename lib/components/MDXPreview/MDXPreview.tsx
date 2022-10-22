import {remarkCodeHike} from '@code-hike/mdx';
import {compile, run} from '@mdx-js/mdx';
import type {MDXContent} from 'mdx/types';
import {useEffect, useState} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {useFormContext} from 'react-hook-form';
import * as runtime from 'react/jsx-runtime';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import theme from 'shiki/themes/dark-plus.json';
import type {VFile} from 'vfile';

import {useEditorContext} from '@/components/formComponents/MarkdownEditor/NewMarkdownEditor';
import {EditorMDXComponents} from '@/components/MDXComponents/MDXComponents';

import syncScroll from '@/functions/client/syncScroll';

import styles from './MDXPreview.module.scss';

const MDXPreview = () => {
    const { watch } = useFormContext();
    const [markdown, title, excerpt] = watch(['markdown', 'title', 'excerpt']);

    const input = `<Title>${title}</Title>\n\n\n${excerpt}\n\n${markdown}\n`;

    return (
        <>
            <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[markdown, title, excerpt]}>
                <InnerPreview input={markdown}/>
            </ErrorBoundary>
        </>
    );
};

const InnerPreview = (props: { input: string }) => {
    const { setPreviewRef, previewRef, editorRef } = useEditorContext();

    const [Content, setContent] = useState<MDXContent | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        compile(props.input, {
            outputFormat: 'function-body',
            rehypePlugins: [
                rehypeSlug
            ],
            remarkPlugins: [
                remarkGfm,
                remarkToc,
                [remarkCodeHike, { autoImport: false, showCopyButton: true, lineNumbers: true, theme: theme }]
            ]
        }).then((c: VFile) => {
            return run(String(c), runtime);
        }).then((x) => {
            console.log(x);
            setContent(() => x.default);
            setError(null);
        }).catch((e) => {
            setError(e.message);
            console.error({ e });
        });
    }, [props.input]);
    return (
        <div ref={setPreviewRef} className={styles.previewContainer} onScroll={() => syncScroll(previewRef, editorRef)}>
            {error ? (
                <div className={styles.compileError}>
                    <h3>Compliation Error:</h3>
                    <pre>{error}</pre>
                </div>
            ) : null}
            <div className={styles.preview}>
                {Content ? <Content components={EditorMDXComponents}/> : null}
            </div>
        </div>
    );
};

const ErrorFallback = ({ error }) => {
    return (
        <div className="preview-error">
            <h3>Runtime Error:</h3>
            <pre>{String(error)}</pre>
        </div>
    );
};

export default MDXPreview;