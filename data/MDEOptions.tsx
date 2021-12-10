import MDX from '@mdx-js/runtime';
import type {Options} from 'easymde';
import {FC} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

const components: { [key: string]: FC } = {
    h1: ({ children, ...props }) => (
        <h1 style={{ color: 'tomato' }} {...props}>
            {children}
        </h1>
    )
};

// Provide variables that might be referenced by JSX
const scope = {
    some: 'value'
};

export default {
    toolbar: ['side-by-side'],
    sideBySideFullscreen: true,
    previewRender: (markdownPlaintext, previewElement) => {
        try {
            return renderToStaticMarkup(
                <MDX components scope={scope}>
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

