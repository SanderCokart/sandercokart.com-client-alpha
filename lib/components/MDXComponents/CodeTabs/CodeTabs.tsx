import classnames from 'classnames';
import type {ReactElement} from 'react';
import {createContext, useState, useContext, useEffect} from 'react';

import styles from './CodeTabs.module.scss';

const CodeTabsContext = createContext({});

interface ContextProps {
    tabNames: string[];
    activeTab: null | string;
    addNameToTabsList: (tabName: string) => void;
}

const useCodeTabs = () => {
    return useContext(CodeTabsContext) as ContextProps;
};

interface CodeTabsProps {
    children: ReactElement<CodeTabProps> | Array<ReactElement<CodeTabProps>>;
}

export const CodeTabs = (props: CodeTabsProps) => {
    const [tabNames, setTabNames] = useState<ContextProps['tabNames']>([]);
    const [activeTab, setActiveTab] = useState<ContextProps['activeTab']>(null);

    const addNameToTabsList = (tabName: string) => {
        if (tabNames.includes(tabName)) throw Error('Tab name already taken');
        setTabNames(prev => [...prev, tabName]);
    };

    const value = {
        tabNames,
        activeTab,
        addNameToTabsList
    };

    useEffect(() => {
        setActiveTab(tabNames[0]);
    }, [tabNames]);

    return (
        <CodeTabsContext.Provider value={value}>
            <div className={styles.container}>
                <div className={styles.codeTabsContainer}>

                    <div className={styles.codeTabs}>
                        {tabNames.map((tabName) => (
                            <button key={tabName}
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

                    {props.children}

                </div>
            </div>
        </CodeTabsContext.Provider>
    );
};

interface CodeTabProps {
    children: string;
    name: string;
}

export const CodeTab = (props: CodeTabProps) => {
    const { addNameToTabsList, activeTab } = useCodeTabs();

    useEffect(() => {
        addNameToTabsList(props.name);
    }, []);

    if (activeTab === props.name)
        return props.children;
};