import {faCopy, faClipboard} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {CSSProperties} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {atomOneDark} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import {toast} from 'react-toastify';

import {Button} from '@/components/Button';

import type {PropsWithChildren} from '@/types/CustomTypes';

import styles from './Code.module.scss';

interface CodeProps extends PropsWithChildren {
    classname: string;
}

const CustomStyle: CSSProperties = {
    padding: 16,
    paddingLeft: 32,
    fontSize: '.9rem'
};

const Code = ({ children, className = 'language-text' }: CodeProps) => {
    const language = className?.replace('language-', '');

    const copy = () => {
        toast.info('Copied to clipboard!', {
            icon: <FontAwesomeIcon icon={faClipboard} style={{ color: 'var(--info)' }}/>,
            autoClose: 1000,
            hideProgressBar: true,
            position: 'top-center',
            closeButton: false
        });

        navigator.clipboard?.writeText(children.trim());

    };

    return (
        <div className={styles.root}>
            <div className={styles.buttonContainer}>
                <Button className={styles.button} title="Copy to clipboard" onClick={copy}><FontAwesomeIcon
                    icon={faCopy}/></Button>
            </div>
            <SyntaxHighlighter
                customStyle={CustomStyle}
                language="JavaScript"
                showLineNumbers={true}
                style={atomOneDark}>
                {children.trim()}
            </SyntaxHighlighter>
        </div>
    );
};

export default Code;