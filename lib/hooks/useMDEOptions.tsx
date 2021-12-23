import MDX from '@mdx-js/runtime';
import {Options} from 'easymde';
import {FC, useMemo, useState} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {useFormContext} from 'react-hook-form';

const components: { [key: string]: FC } = {
    h1: ({ children, ...props }) => (
        <h2 {...props}>{children}</h2>
    )
};

const scope = {
    some: 'value'
};

const UseMdeOptions = () => {
    const { getValues } = useFormContext();
    const [showLineNumbers, setShowLineNumbers] = useState(false);
    // const [state, setState] = useState({
    //     title: '',
    //     excerpt: ''
    // });
    // const [title, excerpt] = watch(['title', 'excerpt']);


    return useMemo(() => {
        return {
            lineNumbers: showLineNumbers,
            toolbar: ['undo', 'redo', '|', 'heading-1',
                {
                    name: 'headers',
                    title: 'Headers',
                    className: 'fa fa-header',
                    children: [
                        'heading-1',
                        'heading-2',
                        'heading-3'
                    ]
                },
                'heading-smaller',
                'heading-bigger',
                'side-by-side',
                {
                    name: 'lineNumbers',
                    action: editor => {
                        setShowLineNumbers(prev => !prev);
                    },
                    className: 'fa fa-sort',
                    title: 'Line Numbers'
                }],
            previewRender: (markdownPlaintext, previewElement) => {
                try {
                    return renderToStaticMarkup(
                        <MDX components={components} scope={scope}>
                            {/*{`<h1>${title}</h1>`}*/}
                            {/*{`<p>${excerpt}</p>`}*/}
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
    }, [showLineNumbers]);
};

export default UseMdeOptions;