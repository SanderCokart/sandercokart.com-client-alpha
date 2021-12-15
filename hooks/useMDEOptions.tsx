import MDX from '@mdx-js/runtime';
import {Options} from 'easymde';
import {FC, useMemo} from 'react';
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
    const { watch } = useFormContext();
    const [title, excerpt] = watch(['title', 'excerpt']);

    return useMemo(() => {
        return {
            // toolbar: [],
            previewRender: (markdownPlaintext, previewElement) => {
                try {
                    return renderToStaticMarkup(
                        <MDX components={components} scope={scope}>
                            {`<h1>${title}</h1>`}
                            {`<p>${excerpt}</p>`}
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
    }, [title, excerpt]);
};

export default UseMdeOptions;