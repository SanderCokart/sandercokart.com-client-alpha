import styles from './NewToolbar.module.scss';
import {Button} from '@/components/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {FontAwesomeIconType} from '@/types/CustomTypes';
import type {ButtonHTMLAttributes, ReactNode} from 'react';
import EditorToolbarContextProvider, {useEditorToolbar} from '@/providers/EditorToolbarContextProvider';
import Input from '@/components/formComponents/Input';
import Grid from '@/components/Grid';

interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: FontAwesomeIconType;
}

const ToolbarButton = ({ icon, ...restOfProps }: ToolbarButtonProps) => <Button
    className={styles.toolbarButton} {...restOfProps}><FontAwesomeIcon fixedWidth icon={icon}/></Button>;

const Divider = () => <hr className={styles.divider}/>;

interface DropdownProps {
    children: ReactNode;
    icon: FontAwesomeIconType;
}

const Dropdown = (props: DropdownProps) => (
    <div className={styles.dropdownContainer}>
        <Button className={styles.toolbarDropdownButton}><FontAwesomeIcon fixedWidth icon={props.icon}/></Button>
        <div className={styles.toolbarDropdown}>
            {props.children}
        </div>
    </div>
);

const InsertImage = () => {
    const { handleImageUpload, handleMarkdownImage } = useEditorToolbar();
    return (
        <Dropdown icon="images">
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
        <Dropdown icon="table">
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

export interface ToolbarProps {

}

const Left = () => {
    const { wrap, insertComponent } = useEditorToolbar();

    return (
        <div className={styles.left}>
            <ToolbarButton icon="bold" onClick={() => wrap('**')}/>
            <ToolbarButton icon="italic" onClick={() => wrap('*')}/>
            <ToolbarButton icon="underline" onClick={() => wrap('__')}/>
            <ToolbarButton icon="strikethrough" onClick={() => wrap('~~')}/>
            <Divider/>
            <InsertImage/>
            <InsertTable/>
            <Divider/>
            <ToolbarButton icon="align-left"
                           onClick={() => insertComponent({ componentName: 'Align', align: 'left' })}/>
            <ToolbarButton icon="align-center"
                           onClick={() => insertComponent({ componentName: 'Align', align: 'center' })}/>
            <ToolbarButton icon="align-right"
                           onClick={() => insertComponent({ componentName: 'Align', align: 'right' })}/>
        </div>
    );
};

function FontSize() {
    const { autoFocus, setFontSize, fontSize } = useEditorToolbar();

    return (
        <Dropdown icon="text-height">
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