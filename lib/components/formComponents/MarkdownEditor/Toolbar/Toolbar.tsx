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
    faClose,
    faPlus,
    faArrowRightArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import type {ButtonHTMLAttributes, ReactNode, CSSProperties, KeyboardEvent, ChangeEventHandler} from 'react';
import {useState, useEffect, useRef} from 'react';
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

import type {PropsWithChildren} from '@/types/CustomTypes';

import styles from 'lib/components/formComponents/MarkdownEditor/Toolbar/Toolbar.module.scss';

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
            <CSSTransition unmountOnExit
                           classNames={{
                               enter: styles.enter,
                               enterActive: styles.enterActive,
                               exit: styles.exit,
                               exitActive: styles.exitActive
                           }}
                           in={open}
                           timeout={150}>
                <div
                    className={
                        classnames([styles.toolbarDropdown, styles[align]])
                    }
                    style={{ maxWidth }}
                    onMouseLeave={() => setOpen(false)}>
                    {children}
                </div>
            </CSSTransition>
        </div>
    );
};

const ComponentItem = (props: { text: string, children: ReactNode }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.componentItemContainer}>
            <Button fullWidth
                    className={classnames([
                        styles.componentItemButton,
                        (open) && styles.open
                    ])}
                    title={props.text}
                    onMouseEnter={() => setOpen(true)}>{props.text}</Button>
            <CSSTransition unmountOnExit
                           classNames={{
                               enter: styles.enter,
                               enterActive: styles.enterActive,
                               exit: styles.exit,
                               exitActive: styles.exitActive
                           }}
                           in={open}
                           timeout={150}>
                <div className={styles.componentItem}>
                    {props.children}
                </div>
            </CSSTransition>
        </div>
    );
};

const InsertImage = () => {
    const { handleImageUpload, handleMarkdownImage } = useEditorToolbar();
    return (
        <Dropdown icon={faImages} title="Images">
            <Button fullWidth onClick={handleMarkdownImage}>
                External image
            </Button>
            <label className={styles.uploadLabel} htmlFor="uploadCustomImage">
                Upload Image
                <input className={styles.uploadInput}
                       id="uploadCustomImage"
                       type="file" onChange={handleImageUpload}/>
            </label>
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
                       htmlFor="uploadCSV">
                    Upload CSV
                    <input className={styles.uploadInput} id="uploadCSV" type="file" onChange={handleCSVImport}/>
                </label>
            </Grid>
        </Dropdown>
    );
};

const Headers = () => {
    const { advancedInsert } = useEditorToolbar();

    const insert = (toInsert: string) => {
        advancedInsert({ type: 'string', toInsert });
    };

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

const TextColor = () => {
    const { advancedInsert } = useEditorToolbar();
    const { color, onChange } = useColorDebounce();

    const onClick = () => {
        advancedInsert({ type: 'component', toInsert: 'Color', wrap: true, color });
    };

    return (
        <Dropdown align="center" icon={faFont} title="Text Color">
            <Flex>
                <Color value={color} onChange={onChange}/>
                <Button onClick={onClick}>
                    Insert
                </Button>
            </Flex>
        </Dropdown>
    );
};

const HighlightColor = () => {
    const { advancedInsert } = useEditorToolbar();
    const { color, onChange } = useColorDebounce();

    const onClick = () => {
        advancedInsert({ type: 'component', toInsert: 'Mark', wrap: true, color });
    };

    return (
        <Dropdown align="center" icon={faPaintBrush} title="Highlight Color">
            <Flex>
                <Color value={color} onChange={onChange}/>
                <Button onClick={onClick}>Insert</Button>
            </Flex>
        </Dropdown>
    );
};

const InsertGrid = () => {
    const { autoFocus, advancedInsert } = useEditorToolbar();
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
            <Button fullWidth
                    onClick={() => advancedInsert({
                        type: 'component',
                        additionalSpace: true,
                        toInsert: 'Grid',
                        wrap: true,
                        columns,
                        gap,
                        alignment
                    })}>
                Insert Grid
            </Button>
        </>
    );
};

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
    const { advancedInsert } = useEditorToolbar();
    const buttonRef = useRef<null | HTMLButtonElement>(null);

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
            advancedInsert({ type: 'component', toInsert: 'CodeTabs', wrap: true, additionalSpace: true });
            codeBlocks.forEach((codeBlock, index) => {
                const extension = getExtension(codeBlock);
                const toInsert = `${'```'}${extension} filename="${codeBlock.filename}"\n\n${'```'}${(index < codeBlocks.length - 1) ? `\n\n` : ``}`;
                advancedInsert({ type: 'string', toInsert });
                remove(index);
            });
            return;
        } else {
            const codeBlock = codeBlocks[0];
            const extension = getExtension(codeBlock);
            const toInsert = `${'```'}${extension} filename="${codeBlock.filename}"\n\n${'```'}`;
            advancedInsert({ type: 'string', toInsert });
        }
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement> | undefined, index: number) => {
        if (e?.key === 'Enter') {
            e.preventDefault();
            buttonRef.current?.focus();
        }
        if (e?.key === 'Backspace' && e.currentTarget.value.length === 0) {
            e.preventDefault();
            //focus previous input
            e.currentTarget.parentElement?.parentElement?.parentElement?.previousElementSibling?.querySelector('input')?.focus();
            remove(index);
        }
    };

    const setRef = (el: HTMLButtonElement | null) => {
        buttonRef.current = el;
    };

    return (
        <Dropdown align="center" icon={faCode} maxWidth={500} title="Insert Codeblocks">
            <FormProvider {...form}>
                {fields.map((field, index) => (
                    <Flex key={field.id}>
                        <Input appendIcon={{ icon: faClose, onClick: () => remove(index) }}
                               registerFormHook={register(`codeBlocks.${index}.filename`)}
                               onBlur={(e) => e.preventDefault()}
                               onKeyDown={(e) => onKeyDown(e, index)}/>
                    </Flex>
                ))}
            </FormProvider>
            <Button fullWidth setRef={setRef} onClick={() => append({ filename: '' })}><FontAwesomeIcon icon={faPlus}/></Button>
            <Button fullWidth
                    onClick={insertCodeBlocks}>
                Insert {(fields.length > 1) ? 'Codeblocks' : 'Codeblock'}
            </Button>
        </Dropdown>
    );
};

const Left = () => {
    const { advancedInsert } = useEditorToolbar();

    return (
        <div className={styles.leftToolbar}>
            <ToolbarButton icon={faTableList} title="Table Of Contents"
                           onClick={() => advancedInsert({ type: 'string', toInsert: '## Table Of Contents' })}/>
            <Divider/>
            <Headers/>
            <Divider/>
            <ToolbarButton icon={faBold} title="Bold"
                           onClick={() => advancedInsert({ type: 'string', toInsert: '**', wrap: true })}/>
            <ToolbarButton icon={faItalic} title="Italic"
                           onClick={() => advancedInsert({ type: 'string', toInsert: '*', wrap: true })}/>
            <ToolbarButton icon={faUnderline} title="Underline"
                           onClick={() => advancedInsert({ type: 'html', toInsert: 'u', wrap: true })}/>
            <ToolbarButton icon={faStrikethrough} title="Strikethrough"
                           onClick={() => advancedInsert({ type: 'string', toInsert: '~~', wrap: true })}/>
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
                           onClick={() => advancedInsert({
                               type: 'component',
                               toInsert: 'Align',
                               wrap: true,
                               align: 'left'
                           })}/>
            <ToolbarButton icon={faAlignCenter} title="Align Center"
                           onClick={() => advancedInsert({
                               type: 'component',
                               toInsert: 'Align',
                               wrap: true,
                               align: 'center'
                           })}/>
            <ToolbarButton icon={faAlignRight} title="Align Right"
                           onClick={() => advancedInsert({
                               type: 'component',
                               toInsert: 'Align',
                               wrap: true,
                               align: 'right'
                           })}/>
        </div>
    );
};

interface EditorNumberParameterProps {
    value: number;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onUndo: () => void;
    label: string;
    max: number;
    min: number;
    step: number;
    icon: IconLookup;
}

const EditorNumberParameter = (props: EditorNumberParameterProps) => {
    const { value, onUndo, onChange, label, max, min, step, icon } = props;
    const { autoFocus } = useEditorToolbar();

    return (
        <Dropdown align="right" icon={icon} title={label}>
            <Input appendIcon={{ icon: faUndo, onClick: onUndo }}
                   label={label}
                   max={max}
                   min={min}
                   step={step}
                   type="number"
                   value={value}
                   onChange={onChange}
                   onMouseEnter={autoFocus}/>
        </Dropdown>
    );
};

function Right() {
    const { fontSize, setFontSize, tabSize, setTabSize } = useEditorToolbar();

    return (
        <div className={styles.rightToolbar}>
            <EditorNumberParameter icon={faTextHeight}
                                   label="Font Size"
                                   max={72}
                                   min={16}
                                   step={4}
                                   value={fontSize}
                                   onChange={(e) => setFontSize(Number(e.target.value))}
                                   onUndo={() => setFontSize(20)}
            />
            <EditorNumberParameter icon={faArrowRightArrowLeft}
                                   label="Tab Size"
                                   max={16}
                                   min={3}
                                   step={1}
                                   value={tabSize}
                                   onChange={(e) => setTabSize(Number(e.target.value))}
                                   onUndo={() => setTabSize(3)}/>
        </div>
    );
}

const Toolbar = ({ children }: PropsWithChildren) => {
    return (
        <EditorToolbarContextProvider>
            <div className={styles.root}>
                <Left/>
                <Right/>
            </div>
            {children}
        </EditorToolbarContextProvider>
    );
};

export default Toolbar;