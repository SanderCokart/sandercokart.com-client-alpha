import type {IconLookup} from '@fortawesome/fontawesome-svg-core';
import {
    faImages,
    faTable,
    faFont,
    faPaintBrush,
    faBoxes,
    faTextHeight,
    faChain,
    faTableList,
    faBold,
    faItalic,
    faUnderline,
    faStrikethrough,
    faAlignLeft,
    faAlignRight,
    faAlignCenter,
    faUndo,
    faCode,
    faPlus,
    faMinus,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import type {ButtonHTMLAttributes, ReactNode, CSSProperties, MouseEventHandler, KeyboardEvent} from 'react';
import {useState} from 'react';

import {Button} from '@/components/Button';
import Flex from '@/components/Flex';
import Color from '@/components/formComponents/Color';
import Input from '@/components/formComponents/Input';
import type {SelectOption} from '@/components/formComponents/SearchSelect/SearchSelect';
import Select from '@/components/formComponents/Select';
import Grid from '@/components/Grid';

import useColorDebounce from '@/hooks/useColorDebounce';

import EditorToolbarContextProvider, {useEditorToolbar} from '@/providers/EditorToolbarContextProvider';

import styles from './NewToolbar.module.scss';

interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    icon?: IconLookup;
}

const ToolbarButton = ({ icon, children, ...restOfProps }: ToolbarButtonProps) => {
    return (
        <Button className={styles.toolbarButton} {...restOfProps}>
            {icon && <FontAwesomeIcon fixedWidth icon={icon}/>}
            {children}
        </Button>
    );
};

const Divider = () => <hr className={styles.divider}/>;

interface DropdownProps {
    children: ReactNode;
    icon: IconLookup;
    title?: string;
    align?: 'left' | 'right' | 'center';
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    maxWidth?: CSSProperties['maxWidth'];
}

const Dropdown = (props: DropdownProps) => {
    const { align = 'right', title, icon, children, onClick, maxWidth = '250px' } = props;

    const className = classnames([
        styles.toolbarDropdown,
        styles[align]
    ]);
    return (
        <div className={styles.dropdownContainer}>
            <Button className={styles.toolbarDropdownButton} title={title} onClick={onClick}>
                <FontAwesomeIcon fixedWidth icon={icon}/>
            </Button>
            <div className={className} style={{ maxWidth }}>
                {children}
            </div>
        </div>
    );
};

const ComponentItem = (props: { text: string, children: ReactNode }) => (
    <div className={styles.componentItemContainer}>
        <Button fullWidth className={styles.componentItemButton} title={props.text}
                onMouseEnter={(e) => e.currentTarget.focus()}>{props.text}</Button>
        <div className={styles.componentItem}>
            {props.children}
        </div>
    </div>
);

const InsertImage = () => {
    const { handleImageUpload, handleMarkdownImage } = useEditorToolbar();
    return (
        <Dropdown icon={faImages} title="Images">
            <Button fullWidth onClick={handleMarkdownImage}>
                External image
            </Button>
            <label className={styles.uploadLabel}
                   htmlFor="uploadCustomImage">Upload Image</label>
            <input className={styles.uploadInput} id="uploadCustomImage" type="file"
                   onChange={handleImageUpload}/>
        </Dropdown>
    );
};

const InsertTable = () => {
    const {
        tableColumns,
        tableRows,
        setTableRows,
        setTableColumns,
        handleTableInsertion,
        handleCSVImport,
        autoFocus
    } = useEditorToolbar();

    return (
        <Dropdown icon={faTable} title="Tables">
            <Grid alignment="normal" columns={2} gap={0}>
                <Input
                    centered label="Rows"
                    min={1}
                    type="number"
                    value={tableRows}
                    onChange={e => {
                        setTableRows(Number(e.target.value));
                    }}
                    onMouseEnter={autoFocus}/>
                <Input
                    centered label="Columns"
                    min={1}
                    type="number"
                    value={tableColumns}
                    onChange={e => {
                        setTableColumns(Number(e.target.value));
                    }}
                    onMouseEnter={autoFocus}/>
                <Button fullWidth onClick={handleTableInsertion}>Insert Table</Button>
                <label className={styles.uploadLabel}
                       htmlFor="uploadCSV">Upload CSV</label>
                <input className={styles.uploadInput} id="uploadCSV" type="file" onChange={handleCSVImport}/>
            </Grid>
        </Dropdown>
    );
};

const Headers = () => {
    const { insert } = useEditorToolbar();
    return (
        <>
            <ToolbarButton onClick={() => insert('# ')}>H1</ToolbarButton>
            <ToolbarButton onClick={() => insert('## ')}>H2</ToolbarButton>
            <ToolbarButton onClick={() => insert('### ')}>H3</ToolbarButton>
            <ToolbarButton onClick={() => insert('#### ')}>H4</ToolbarButton>
        </>
    );
};

const InsertLink = () => {
    const { handleLinkInsertion } = useEditorToolbar();
    return (
        <ToolbarButton icon={faChain} onClick={handleLinkInsertion}/>
    );
};

const TextColor = () => (
    <Dropdown align="center" icon={faFont} title="Text Color">
        <Flex>
            <Color/>
            <Button>Insert</Button>
        </Flex>
    </Dropdown>
);

const HighlightColor = () => {
    const { insertComponent } = useEditorToolbar();
    const { color, onChange } = useColorDebounce();

    return (
        <Dropdown align="center" icon={faPaintBrush} title="Highlight Color">
            <Flex>
                <Color value={color} onChange={onChange}/>
                <Button onClick={() => {
                    insertComponent({ componentName: 'Mark', color });
                }}>Insert</Button>
            </Flex>
        </Dropdown>
    );
};

function InsertGrid() {
    const { autoFocus, insertComponent } = useEditorToolbar();
    const [gap, setGap] = useState(0);
    const [columns, setColumns] = useState(2);
    const [alignment, setAlignment] = useState<CSSProperties['placeItems']>('center');

    return (
        <>
            <Flex>
                <Input centered label="Columns" min={1} type="number" value={columns}
                       onChange={e => setColumns(Number(e.target.value))} onMouseEnter={autoFocus}/>
                <Input centered label="Gap" min={0} type="number" value={gap}
                       onChange={e => setGap(Number(e.target.value))} onMouseEnter={autoFocus}/>
            </Flex>
            <Select value={alignment} onChange={e => setAlignment(e.target.value)}>
                {['center', 'flex-end', 'flex-start', 'normal'].map(item => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </Select>
            <Button fullWidth onClick={() => insertComponent({ componentName: 'Grid', columns, gap, alignment })}>
                Insert Grid
            </Button>
        </>
    );
}

const InsertComponent = () => {
    return (
        <Dropdown align="center" icon={faBoxes} title="Insert Component">
            <div className={styles.componentList}>
                <ComponentItem text="Grid">
                    <InsertGrid/>
                </ComponentItem>
            </div>
        </Dropdown>
    );
};

interface LanguageSelect extends SelectOption {
    path: string;
    extension: string;
}

const InsertCodeBlock = () => {
    const { insertComponent, autoFocus, insert } = useEditorToolbar();
    const [codeBlocks, setCodeBlocks] = useState<LanguageSelect[]>([]);
    const [pathInput, setPathInput] = useState('');

    const addFileName = (e) => {
        e.preventDefault();
        const extension = pathInput.substring(pathInput.lastIndexOf('.') + 1);
        console.log(extension);
        setCodeBlocks(prev => [...prev, {
            path: pathInput,
            extension
        }]);
        setPathInput('');
    };

    const removeFileName = (codeBlockToRemove) => {
        setCodeBlocks(prev => prev.filter(codeBlock => codeBlock !== codeBlockToRemove));
    };

    const clearFileNames = () => {
        setCodeBlocks([]);
    };

    const onKeyDownInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addFileName(e);
        e.currentTarget.focus();
    };

    const insertCodeBlocks = () => {
        if (codeBlocks.length > 1) {
            insertComponent({ componentName: 'CodeTabs' });

        } else {
            console.log(codeBlocks);
            const string = codeBlocks.map((codeBlock) => (
                `${'```'}${codeBlock?.extension} filename="${codeBlock.path}"\n\n${'```'}`
            ));
            insert(string.join('\n\n'));
        }
    };

    return (
        <Dropdown align="center" icon={faCode} maxWidth={500} title="Insert Codeblocks">
            <Flex>
                <Input placeholder="filename or path" value={pathInput}
                       onChange={(e) => setPathInput(e.target.value)}
                       onKeyDown={onKeyDownInput}
                       onMouseEnter={autoFocus}/>
                <Button onClick={addFileName}><FontAwesomeIcon fixedWidth icon={faPlus}/></Button>
                <Button onClick={clearFileNames}><FontAwesomeIcon icon={faTrash}/></Button>
            </Flex>
            <Button fullWidth
                    onClick={insertCodeBlocks}>{codeBlocks.length > 1 ? 'Insert Codeblocks' : 'Insert Codeblock'}</Button>
            <ul className={styles.fileNamesList}>
                {codeBlocks.map((fileName) => (
                    <li key={fileName.path} className={styles.fileNamesListItem}>
                        <span>{fileName.path}</span>
                        <Button className={styles.removeCodeBlockIcon}
                                onClick={() => removeFileName(fileName)}><FontAwesomeIcon icon={faMinus}/></Button>
                    </li>
                ))}
            </ul>
        </Dropdown>
    );
};

const Left = () => {
    const { wrap, insertComponent, insert } = useEditorToolbar();

    return (
        <div className={styles.left}>
            <ToolbarButton icon={faTableList} title="Table Of Contents" onClick={() => insert('## Table Of Contents')}/>
            <Divider/>
            <Headers/>
            <Divider/>
            <ToolbarButton icon={faBold} title="Bold" onClick={() => wrap('**')}/>
            <ToolbarButton icon={faItalic} title="Italic" onClick={() => wrap('*')}/>
            <ToolbarButton icon={faUnderline} title="Underline" onClick={() => wrap('__')}/>
            <ToolbarButton icon={faStrikethrough} title="Strikethrough" onClick={() => wrap('~~')}/>
            <Divider/>
            <TextColor/>
            <HighlightColor/>
            <Divider/>
            <InsertImage/>
            <InsertTable/>
            <InsertLink/>
            <InsertCodeBlock/>
            <InsertComponent/>
            <Divider/>
            <ToolbarButton icon={faAlignLeft} title="Align Left"
                           onClick={() => insertComponent({ componentName: 'Align', align: 'left' })}/>
            <ToolbarButton icon={faAlignCenter} title="Align Center"
                           onClick={() => insertComponent({ componentName: 'Align', align: 'center' })}/>
            <ToolbarButton icon={faAlignRight} title="Align Right"
                           onClick={() => insertComponent({ componentName: 'Align', align: 'right' })}/>
        </div>
    );
};

function FontSize() {
    const { autoFocus, setFontSize, fontSize } = useEditorToolbar();

    return (
        <Dropdown align="right" icon={faTextHeight}>
            <Input
                appendIcon={{
                    icon: faUndo,
                    onClick: () => setFontSize(20)
                }}
                label="Font size"
                max={72}
                min={16}
                step={4}
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                onMouseEnter={autoFocus}/>
        </Dropdown>
    );
}

function Right() {
    return (
        <div className={styles.right}>
            <FontSize/>
        </div>
    );
}

const NewToolbar = () => {
    return (
        <EditorToolbarContextProvider>
            <div className={styles.root}>
                <Left/>
                <Right/>
            </div>
        </EditorToolbarContextProvider>
    );
};

export default NewToolbar;