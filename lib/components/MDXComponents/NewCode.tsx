import type {FC} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {atomOneDark} from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const NewCode: FC<HTMLUnknownElement & { children: string }> = ({ children, className }) => {
    const language = className.replace('language-', '');
    return (
        <SyntaxHighlighter language={language} style={atomOneDark}>
            {children.trim()}
        </SyntaxHighlighter>
    );
};

export default NewCode;