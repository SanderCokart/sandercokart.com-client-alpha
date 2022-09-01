import MDXRuntime from '@mdx-js/runtime';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {useFormContext} from 'react-hook-form';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
//@ts-ignore
//@ts-ignore
import remarkUnderline from 'remark-underline';

import {useEditorContext} from '@/components/formComponents/MarkdownEditor/NewMarkdownEditor';
import MDXComponents from '@/components/MDXComponents';
import {Title} from '@/components/MDXComponents/MDXComponents';

import syncScroll from '@/functions/client/syncScroll';

import styles from './Preview.module.scss';

export interface PreviewProps {

}

const Preview = (props: PreviewProps) => {
    const { watch } = useFormContext();
    const { setPreviewRef, previewRef, editorRef } = useEditorContext();
    const [markdown, title, excerpt] = watch(['markdown', 'title', 'excerpt']);

    try {
        return <div ref={setPreviewRef} className={styles.previewContainer}>{createElement(
            'div', {

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
        )}</div>;
    } catch (e) {

        return (
            <div className={styles.error}>
                <MDXRuntime components={MDXComponents} rehypePlugins={[rehypeSlug]}
                            remarkPlugins={[remarkToc]}>
                    {renderToStaticMarkup(<>{markdown}</>)}
                </MDXRuntime>
            </div>
        );
    }
};

export default Preview;