import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {HTMLAttributes} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {atomOneDark} from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import {Button} from '@/components/Button';

import styles from './Code.module.scss';


interface CodeProps extends HTMLAttributes<HTMLUnknownElement> {
    children: string;
}

const Code = ({ children, className = 'language-text' }: CodeProps) => {
    const language = className?.replace('language-', '');
    return (
        <div className={styles.root}>
            <div className={styles.buttonContainer}>
                <Button circle className={styles.button}><FontAwesomeIcon icon="copy"/></Button>
            </div>
            <SyntaxHighlighter customStyle={{ padding: '16px' }} language={language} style={atomOneDark}>
                {children.trim()}
            </SyntaxHighlighter>
        </div>
    );
};

export default Code;