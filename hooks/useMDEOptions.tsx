import MDX from '@mdx-js/runtime';
import {Options} from 'easymde';
import {FC, useEffect, useMemo} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {useFormContext} from 'react-hook-form';

const components: { [key: string]: FC } = {
    h1: ({ children, ...props }) => (
        <h1 id="editor-title-text" {...props}>
            {children}
        </h1>
    ),
    ex: ({ children, ...props }) => (
        <p id="editor-excerpt-text">{children}</p>
    )
};

const scope = {
    some: 'value'
};

const UseMdeOptions = () => {
    const { setValue } = useFormContext();

    useEffect(() => {
        const titleEl = document.getElementById('editor-title-text');
        const excerptEl = document.getElementById('editor-excerpt-text');

        if (titleEl)
            titleEl?.addEventListener('change', (e) => {
                const target = e.target as HTMLHeadingElement | HTMLParagraphElement;
                setValue('title', target.innerText);
            });

    }, []);

    return useMemo(() => {
        return {
            toolbar: ['preview', 'side-by-side'],
            sideBySideFullscreen: true,
            previewRender: (markdownPlaintext, previewElement) => {
                try {
                    return renderToStaticMarkup(
                        <MDX components={components} scope={scope}>
                            {markdownPlaintext}
                        </MDX>
                    );
                } catch (err: any) {
                    console.error(err);

                    return renderToStaticMarkup(
                        <div>
                            <h1>{err.name}</h1>
                            <p>{err.message}</p>
                        </div>
                    );
                }
            }

        } as Options;
    }, []);
};

export default UseMdeOptions;