import SyntaxHighlighter from 'react-syntax-highlighter';
import {atomOneDark} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import type {HTMLAttributes} from 'react';

interface CodeProps extends HTMLAttributes<HTMLUnknownElement> {
    children: string;
}

const Code = ({ children, className = 'language-text' }: CodeProps) => {
    const language = className?.replace('language-', '');
    return (
        <SyntaxHighlighter language={language} style={atomOneDark}>
            {children.trim()}
        </SyntaxHighlighter>
    );
};

export default Code;