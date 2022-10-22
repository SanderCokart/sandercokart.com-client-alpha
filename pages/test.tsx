import {remarkCodeHike} from '@code-hike/mdx';
import {CH} from '@code-hike/mdx/components';
import {compile, run} from '@mdx-js/mdx';
import type {MDXContent} from 'mdx/types';
import {useState, useEffect} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import * as runtime from 'react/jsx-runtime';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import theme from 'shiki/themes/one-dark-pro.json';

import Textarea from '@/components/formComponents/Textarea';
import MDXComponents from '@/components/MDXComponents';

import '@code-hike/mdx/styles.css';

const Test = () => {
    const [Content, setContent] = useState<MDXContent | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [input, setInput] = useState('# title');


    return (
        <div>
            {error ? (
                <div className="compile-error">
                    <h3>Compliation Error:</h3>
                    <pre>{error}</pre>
                </div>
            ) : null}
            <Textarea value={input} onChange={(e) => setInput(e.target.value)}/>
            <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[input]}>
                {Content ? <Content components={{ ...MDXComponents(true), CH }}/> : null}
            </ErrorBoundary>
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

export default Test;
