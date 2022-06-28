import styles from './NewToolbar.module.scss';
import {Button} from '@/components/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {FontAwesomeIconType} from '@/types/CustomTypes';
import type {ButtonHTMLAttributes, ReactNode, CSSProperties} from 'react';
import {useState} from 'react';
import EditorToolbarContextProvider, {useEditorToolbar} from '@/providers/EditorToolbarContextProvider';
import Input from '@/components/formComponents/Input';
import Grid from '@/components/Grid';
import Color from '@/components/formComponents/Color';
import Flex from '@/components/Flex';
import useColorDebounce from '@/hooks/useColorDebounce';
import Select from '@/components/formComponents/Select';
import classnames from 'classnames';

interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    icon?: FontAwesomeIconType;
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
    icon: FontAwesomeIconType;
    title?: string;
    align?: 'left' | 'right' | 'center';
}

const Dropdown = (props: DropdownProps) => {
    const { align = 'right' } = props;

    const className = classnames([
        styles.toolbarDropdown,
        styles[align]
    ]);
    return (
        <div className={styles.dropdownContainer}>
            <Button className={styles.toolbarDropdownButton} title={props.title}><FontAwesomeIcon fixedWidth
                                                                                                  icon={props.icon}/></Button>
            <div className={className}>
                {props.children}
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
        <Dropdown icon="images" title="Images">
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
        <Dropdown icon="table" title="Tables">
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
        <ToolbarButton icon="chain" onClick={handleLinkInsertion}/>
    );
};

const TextColor = () => (
    <Dropdown align="center" icon="font" title="Text Color">
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
        <Dropdown align="center" icon="paint-brush" title="Highlight Color">
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
        <Dropdown align="center" icon="boxes" title="Insert Component">
            <div className={styles.componentList}>
                <ComponentItem text="Grid">
                    <InsertGrid/>
                </ComponentItem>
            </div>
        </Dropdown>
    );
};

const Left = () => {
    const { wrap, insertComponent, insert } = useEditorToolbar();

    return (
        <div className={styles.left}>
            <ToolbarButton icon="table-list" title="Table Of Contents" onClick={() => insert('## Table Of Contents')}/>
            <Divider/>
            <Headers/>
            <Divider/>
            <ToolbarButton icon="bold" title="Bold" onClick={() => wrap('**')}/>
            <ToolbarButton icon="italic" title="Italic" onClick={() => wrap('*')}/>
            <ToolbarButton icon="underline" title="Underline" onClick={() => wrap('__')}/>
            <ToolbarButton icon="strikethrough" title="Strikethrough" onClick={() => wrap('~~')}/>
            <Divider/>
            <TextColor/>
            <HighlightColor/>
            <Divider/>
            <InsertImage/>
            <InsertTable/>
            <InsertLink/>
            <InsertComponent/>
            <Divider/>
            <ToolbarButton icon="align-left" title="Align Left"
                           onClick={() => insertComponent({ componentName: 'Align', align: 'left' })}/>
            <ToolbarButton icon="align-center" title="Align Center"
                           onClick={() => insertComponent({ componentName: 'Align', align: 'center' })}/>
            <ToolbarButton icon="align-right" title="Align Right"
                           onClick={() => insertComponent({ componentName: 'Align', align: 'right' })}/>
        </div>
    );
};

function FontSize() {
    const { autoFocus, setFontSize, fontSize } = useEditorToolbar();

    return (
        <Dropdown align="right" icon="text-height">
            <Input
                appendIcon={{
                    icon: 'undo',
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

export interface ToolbarProps {

}

const NewToolbar = (props: ToolbarProps) => {
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