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
    faClose
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import type {ButtonHTMLAttributes, ReactNode, CSSProperties} from 'react';
import {useState, useEffect} from 'react';
import {useForm, FormProvider, useFieldArray} from 'react-hook-form';
import {CSSTransition} from 'react-transition-group';

import {Button} from '@/components/Button';
import Flex from '@/components/Flex';
import Color from '@/components/formComponents/Color';
import Input from '@/components/formComponents/Input';
import Select from '@/components/formComponents/Select';
import Grid from '@/components/Grid';

import {useClickOutside} from '@/hooks/useClickOutside';
import useColorDebounce from '@/hooks/useColorDebounce';

import EditorToolbarContextProvider, {useEditorToolbar} from '@/providers/EditorToolbarContextProvider';

import styles from './Toolbar.module.scss';

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
    maxWidth?: CSSProperties['maxWidth'];
}

const Dropdown = (props: DropdownProps) => {
    const [open, setOpen] = useState(false);
    const ref = useClickOutside(() => {
        setOpen(false);
    });

    const toggleOpen = () => {
        setOpen(open => !open);
    };

    const { align = 'right', title, icon, children, maxWidth = '250px' } = props;

    return (
        <div ref={ref} className={styles.dropdownContainer}>
            <Button className={classnames([styles.toolbarDropdownButton, (open) && styles.open])} title={title}
                    onClick={toggleOpen}>
                <FontAwesomeIcon fixedWidth icon={icon}/>
            </Button>
            <CSSTransition unmountOnExit classNames={{
                enter: styles.enter,
                enterActive: styles.enterActive,
                exit: styles.exit,
                exitActive: styles.exitActive
            }} in={open} timeout={250}>
                <div
                    className={
                        classnames([styles.toolbarDropdown, styles[align]])
                    }
                    style={{ maxWidth }}>
                    {children}
                </div>
            </CSSTransition>
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

interface CodeBlock {
    filename: string;
}

const InsertCodeBlock = () => {
    const { insertComponent, insert } = useEditorToolbar();
    const form = useForm<{ codeBlocks: CodeBlock[] }>({
        defaultValues: {
            codeBlocks: []
        }
    });
    const { register, control, getValues } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'codeBlocks'
    });

    useEffect(() => {
        append({ filename: 'index.js' });
    }, []);

    const getExtension = (codeBlock: { filename: string }) => {
        return codeBlock.filename.substring(codeBlock.filename.lastIndexOf('.') + 1);
    };

    const insertCodeBlocks = () => {
        const codeBlocks = getValues('codeBlocks');
        if (codeBlocks.length > 1) {
            insertComponent({ componentName: 'CodeTabs' });
            codeBlocks.forEach((codeBlock, index) => {
                const extension = getExtension(codeBlock);
                const string = `${'```'}${extension} filename="${codeBlock.filename}"\n\n${'```'}${(index < codeBlocks.length - 1) ? `\n\n` : ``}`;
                insert(string);
                remove(index);
            });
            return;
        } else {
            const codeBlock = codeBlocks[0];
            const extension = getExtension(codeBlock);
            const string = `${'```'}${extension} filename="${codeBlock.filename}"\n\n${'```'}`;
            insert(string, true);
        }
    };

    return (
        <Dropdown align="center" icon={faCode} maxWidth={500} title="Insert Codeblocks">
            <Button fullWidth onClick={() => append({ filename: '' })}>Append</Button>
            <FormProvider {...form}>
                {fields.map((field, index) => (
                    <Flex key={field.id}>
                        <Input autoFocus appendIcon={{ icon: faClose, onClick: () => remove(index) }}
                               registerFormHook={register(`codeBlocks.${index}.filename`)}/>
                    </Flex>
                ))}
            </FormProvider>
            <Button fullWidth onClick={insertCodeBlocks}>Insert Codeblocks</Button>
        </Dropdown>
    );
};

const Left = () => {
    const { wrap, insertComponent, insert } = useEditorToolbar();

    return (
        <div className={styles.leftToolbar}>
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
        <Dropdown align="right" icon={faTextHeight} title="Font Size">
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
        <div className={styles.rightToolbar}>
            <FontSize/>
        </div>
    );
}

const Toolbar = () => {
    return (
        <EditorToolbarContextProvider>
            <div className={styles.root}>
                <Left/>
                <Right/>
            </div>
        </EditorToolbarContextProvider>
    );
};

export default Toolbar;