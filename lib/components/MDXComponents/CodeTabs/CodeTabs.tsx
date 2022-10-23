import {faCopy} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import hljs from 'highlight.js';
import {createContext, useContext, useState, useEffect, useRef} from 'react';

import {Button} from '@/components/Button';

import styles from './CodeTabs.module.scss';

const CodeTabsContext = createContext({});

interface ContextProps {
    activeTab: string | null;
    tabNames: string[];
    addTabName: (tabName: string) => void;
}

const useCodeTabs = () => {
    return useContext(CodeTabsContext) as ContextProps;
};

export const CodeTabs = (props) => {
    const [tabNames, setTabNames] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<null | string>(null);

    const addTabName = (tabName: string) => {
        setTabNames(prev => ([...prev, tabName]));
    };

    useEffect(() => {
        setActiveTab(tabNames[0]);
    }, [tabNames]);

    return (
        <CodeTabsContext.Provider value={{
            activeTab,
            tabNames,
            addTabName
        }}>
            <div className={styles.container}>
                <div className={styles.codeTabsContainer}>

                    <div className={styles.codeTabs}>
                        {tabNames.map((tabName) => (
                            <button
                                key={tabName}
                                className={classnames([
                                    styles.codeTab,
                                    (tabName === activeTab) && styles.active
                                ])}
                                type="button"
                                onClick={() => setActiveTab(tabName)}>
                                {tabName}
                            </button>
                        ))}
                    </div>
                </div>
                {props.children}
            </div>
        </CodeTabsContext.Provider>
    );
};

export const Pre = (props) => {
    const { tabNames, activeTab, addTabName } = useCodeTabs();
    const preRef = useRef<HTMLPreElement>(null);
    const className = classnames([props.className, styles.pre, (!!props.inline && styles.inline)]);

    useEffect(() => {
        addTabName?.(props.filename);
    }, []);

    function copy() {
        if (navigator.clipboard === undefined) {
            const textArea = document.createElement('textarea');
            textArea.textContent = preRef.current?.textContent ?? '';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        } else navigator.clipboard?.writeText(props.children);
    }

    if (tabNames === undefined && activeTab === undefined) {
        return (
            <div className={styles.container}>
                <div className={styles.codeTabsContainer}>

                    {props.filename && (
                        <div className={styles.codeTabs}>
                            <button
                                className={classnames([
                                    styles.codeTab,
                                    styles.active
                                ])}
                                type="button">
                                {props.filename}
                            </button>
                        </div>
                    )}
                    <pre ref={preRef} {...props} className={className}>
                        <Button className={styles.copy} onClick={copy}><FontAwesomeIcon icon={faCopy}/></Button>
                        {props.children}
                    </pre>
                </div>
            </div>
        );
    }

    if (activeTab !== props.filename) return null;

    return <pre {...props} className={className}/>;
};

export const Code = (props) => {
    useEffect(() => {
        hljs.configure({ cssSelector: 'code', ignoreUnescapedHTML: true });
        hljs.highlightAll();
    });
    return <code {...props} className={classnames([props.className, styles.code])}/>;
};