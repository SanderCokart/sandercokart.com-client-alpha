import MDX from '@mdx-js/runtime';
import {Options} from 'easymde';
import {FC, useEffect, useMemo} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {useFormContext} from 'react-hook-form';

const components: { [key: string]: FC } = {
    ti: ({ children, ...props }) => (
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
        const listener = (e: KeyboardEvent) => {
            const titleEl = document.getElementById('editor-title-text');
            const excerptEl = document.getElementById('editor-excerpt-text');

            if (titleEl) setValue('title', titleEl.innerText);
            if (excerptEl) setValue('excerpt', excerptEl.innerText);
        };
        document.addEventListener('keyup', listener);
        return () => {
            document.removeEventListener('keyup', listener);
        };

    });

    return useMemo(() => {
        return {
            // toolbar: [],
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