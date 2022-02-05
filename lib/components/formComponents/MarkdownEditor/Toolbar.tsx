import Button from '@/components/Button';
import Input from '@/components/formComponents/Input';
import {useEditorContext} from '@/components/formComponents/MarkdownEditor';
import axios from '@/functions/shared/axios';
import useImage from '@/hooks/useImage';
import styles from '@/styles/components/formComponents/MarkdownEditor/Toolbar.module.scss';
import type {FontAwesomeIconType as FontAwesomeIconType} from '@/types/CustomTypes';
import type {FileModel} from '@/types/ModelTypes';
import type {ToolbarProps} from '@/types/PropTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Papa from 'papaparse';
import type {ChangeEvent, FC, MouseEvent} from 'react';
import {useCallback, useEffect} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';


const Toolbar: FC<ToolbarProps> = ({ name }) => {
    const { setValue } = useFormContext();
    const toolbarForm = useForm();
    const { getValues } = toolbarForm;
    const { editorRef, tableRows, tableColumns, gridRows, gridColumns, fontSize, setState } = useEditorContext();
    const { getUrl } = useImage();

    const selectWordUnderCursor = useCallback(() => {
        if (editorRef.current) {
            const { value, selectionStart, selectionEnd } = editorRef.current;
            const check = [' ', '\n', '.', '!', '?', ':', ';', ','];

            editorRef.current.focus();

            let lowestBackward = 0, lowestForward = value.length, forArray = [], backArray = [];


            check.forEach(char => {
                const backward = value.lastIndexOf(char, selectionStart);
                const forward = value.indexOf(char, selectionEnd);

                forArray.push(char + ' ' + forward);
                backArray.push(char + ' ' + backward);

                if (backward !== -1 && (backward > lowestBackward)) {
                    lowestBackward = backward + 1;
                }

                if (forward !== -1 && (forward < lowestForward)) {
                    lowestForward = forward;
                }

            });

            editorRef.current.selectionStart = lowestBackward;
            editorRef.current.selectionEnd = lowestForward;
        }
    }, []);


    const wrapSelection = useCallback((wrapWith: string) => {
        if (editorRef.current) {
            const { value, selectionStart, selectionEnd } = editorRef.current;
            const hasLeadingSpace = value.charAt(selectionEnd - 1) === ' ';
            setValue(name, `${value.substring(0, selectionStart)}${wrapWith + value.substring(selectionStart, hasLeadingSpace ? selectionEnd - 1 : selectionEnd) + wrapWith}${hasLeadingSpace ? ' ' : ''}${value.substring(selectionEnd)}`);
        }
    }, []);

    const bold = useCallback(() => {
        if (editorRef.current) {
            if (editorRef.current.selectionStart === editorRef.current.selectionEnd) {
                selectWordUnderCursor();
            }
            wrapSelection('**');
            editorRef.current.focus();
        }
    }, []);

    const strikethrough = useCallback(() => {
        if (editorRef.current) {
            if (editorRef.current.selectionStart === editorRef.current.selectionEnd) {
                selectWordUnderCursor();
            }
            wrapSelection('~~');
            editorRef.current.focus();
        }
    }, []);

    const italic = useCallback(() => {
        if (editorRef.current) {
            if (editorRef.current.selectionStart === editorRef.current.selectionEnd) {
                selectWordUnderCursor();
            }
            wrapSelection('*');
            editorRef.current.focus();
        }
    }, []);

    const underline = useCallback(() => {
        if (editorRef.current) {
            if (editorRef.current.selectionStart === editorRef.current.selectionEnd) {
                selectWordUnderCursor();
            }
            wrapSelection('__');
            editorRef.current.focus();
        }
    }, []);

    const insertTable = useCallback(() => {
        if (editorRef.current) {
            const [rows, cols] = getValues(['tableRows', 'tableColumns']);

            let tableMd = '\n\n';
            for (let i = 0; i < cols; i++) {
                tableMd += '| head ';
            }
            tableMd += '|\n';
            for (let i = 0; i < cols; i++) {
                tableMd += '| :--: ';
            }
            tableMd += '|\n';

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    tableMd += '| data ';
                }
                tableMd += '|\n';
            }

            tableMd += '\n';

            selectWordUnderCursor();
            setValue(name, editorRef.current.value.substring(0, editorRef.current.selectionEnd) + tableMd + editorRef.current.value.substring(editorRef.current.selectionEnd));

            editorRef.current.focus();
        }
    }, []);

    const imageMd = useCallback(() => {
        if (editorRef.current) {
            const { value, selectionStart, selectionEnd } = editorRef.current;

            setValue(name, value.substring(0, editorRef.current.selectionStart) + '![alt](https://)' + value.substring(editorRef.current.selectionEnd));

            editorRef.current.selectionStart = selectionEnd + 15;
            editorRef.current.selectionEnd = selectionEnd + 15;
            editorRef.current.focus();
        }
    }, []);

    const onFontSizeChange = useCallback(() => {
        if (editorRef.current) {
            editorRef.current.style.fontSize = `${getValues('fontSize')}px`;
        }
    }, []);

    const onImageUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        const formData = new FormData();
        formData.set('file', files[0]);

        const { data } = await axios.simplePost<FileModel>('files', formData);

        if (editorRef.current) {
            const { value, selectionStart, selectionEnd } = editorRef.current;
            setValue(name, value.substring(0, selectionStart) + `![${data.original_name}](${getUrl(data)})\n` + value.substring(selectionEnd));

            selectWordUnderCursor();
            editorRef.current.selectionStart = editorRef.current.selectionEnd;
            editorRef.current.focus();
        }

        e.target.value = '';
    }, []);

    const insertTaskList = useCallback(() => {
        if (editorRef.current) {
            const { value, selectionStart, selectionEnd } = editorRef.current;

            const newValue = value.substring(0, selectionEnd) + '\n- [ ] task' + value.substring(selectionEnd);
            setValue(name, newValue);

            editorRef.current.selectionStart = selectionEnd + 7;
            editorRef.current.selectionEnd = selectionEnd + 11;
            editorRef.current.focus();
        }
    }, []);

    /*BUGGED*/
    const insertOrderedList = useCallback(() => {
        if (editorRef.current) {
            const { value, selectionStart, selectionEnd } = editorRef.current;

            const newValue = value.substring(0, selectionEnd) + '\n1. item' + value.substring(selectionEnd);
            setValue(name, newValue);

            editorRef.current.selectionStart = selectionEnd + 4;
            editorRef.current.selectionEnd = selectionEnd + 8;
            editorRef.current.focus();
        }
    }, []);

    const insertUnorderedList = useCallback(() => {
        if (editorRef.current) {
            editorRef.current.focus();
            const { value, selectionStart, selectionEnd } = editorRef.current;

            const newValue = value.substring(0, selectionEnd) + '\n- item' + value.substring(selectionEnd);
            setValue(name, newValue);

            editorRef.current.selectionStart = selectionEnd + 3;
            editorRef.current.selectionEnd = selectionEnd + 7;
        }
    }, []);

    const insertLink = useCallback(() => {
        if (editorRef.current) {
            selectWordUnderCursor();
            editorRef.current.focus();
            const { value, selectionStart, selectionEnd } = editorRef.current;

            const newValue = value.substring(0, selectionEnd) + '[link](https://)' + value.substring(selectionEnd);
            setValue(name, newValue);

            editorRef.current.selectionStart = selectionEnd + 15;
            editorRef.current.selectionEnd = selectionEnd + 15;
        }
    }, []);

    const insertComponent = (e: MouseEvent<HTMLButtonElement>) => {
        const { name: component } = e.currentTarget;
        if (editorRef.current) {
            selectWordUnderCursor();
            const { value, selectionStart, selectionEnd } = editorRef.current;
            const [gridRows, gridColumns] = getValues(['gridRows', 'gridColumns']);

            const newValue = value.substring(0, selectionEnd) + `\n\n<${component} columns="${gridColumns}" rows="${gridRows}">\n\n\n\n</${component}>\n\n` + value.substring(selectionEnd);
            setValue(name, newValue);

            editorRef.current.focus();
            editorRef.current.selectionStart = selectionEnd + 31;
            editorRef.current.selectionEnd = selectionEnd + 31;
        }
    };

    const importCSV = (e: ChangeEvent<HTMLInputElement>) => {
        // if (e.target.files)
        //     Papa.parse<string[]>(e.target.files[0], {
        //         complete: (results) => {
        //             if (editorRef.current) {
        //                 const { value, selectionStart, selectionEnd } = editorRef.current;
        //                 const headers = results.data[0];
        //                 const rows = results.data.slice(1);
        //
        //                 let tableMd = '\n\n';
        //                 for (let i = 0; i < headers.length; i++) {
        //                     tableMd += `| ${headers[i]} `;
        //                 }
        //                 tableMd += '|\n';
        //                 for (let i = 0; i < headers.length; i++) {
        //                     tableMd += '| :--: ';
        //                 }
        //                 tableMd += '|\n';
        //
        //                 for (let i = 0; i < rows.length; i++) {
        //                     for (let j = 0; j < headers.length; j++) {
        //                         tableMd += `| ${rows[i][j]} `;
        //                     }
        //                     tableMd += '|\n';
        //                 }
        //
        //                 tableMd += '\n';
        //
        //                 selectWordUnderCursor();
        //                 setValue(name, value.substring(0, selectionEnd) + tableMd + value.substring(selectionEnd));
        //
        //                 e.target.value = '';
        //                 editorRef.current.focus();
        //             }
        //         }
        //     });

        //import CSV and parse it without packages


    };

    const leftToolbarItems: { icon: FontAwesomeIconType, onClick: () => void, title: string }[] = [
        { icon: 'bold', onClick: bold, title: 'Bold' },
        { icon: 'strikethrough', onClick: strikethrough, title: 'Strikethrough' },
        { icon: 'italic', onClick: italic, title: 'Italic' },
        { icon: 'underline', onClick: underline, title: 'Underline' },
        { icon: 'tasks', onClick: insertTaskList, title: 'Task List' },
        { icon: 'list-ol', onClick: insertOrderedList, title: 'Ordered List' },
        { icon: 'list-ul', onClick: insertUnorderedList, title: 'Unordered List' },
        { icon: 'link', onClick: insertLink, title: 'Link' }
    ];

    const rightToolbarItems: { icon: FontAwesomeIconType, onClick: () => void }[] = [];

    const AutoFocus = (e: MouseEvent<HTMLInputElement>) => {
        e.currentTarget.focus({ preventScroll: true });
    };

    const AutoBlur = (e: MouseEvent<HTMLInputElement>) => {
        if (editorRef.current) {
            editorRef.current.focus({ preventScroll: true });
        }
    };

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.style.fontSize = '20px';
        }
    }, []);

    return (
        <FormProvider {...toolbarForm}>
            <div className={styles.toolbar}>
                <div className={styles.left}>
                    {leftToolbarItems.map((item, index) => (
                        <Button key={index}
                                className={styles.toolbarItem}
                                title={item.title}
                                type="button"
                                onClick={item.onClick}>
                            <FontAwesomeIcon icon={item.icon}/>
                        </Button>
                    ))}

                    <div className={styles.toolbarItem}>
                        <FontAwesomeIcon icon="table"/>
                        <div className={styles.toolbarItemTableDropdown}>
                            <Input defaultValue={1}
                                   label="Rows"
                                   min={1}
                                   name="tableRows"
                                   type="number"
                                   onMouseEnter={AutoFocus}
                                   onMouseLeave={AutoBlur}/>

                            <Input defaultValue={1}
                                   label="Columns"
                                   min={1}
                                   name="tableColumns"
                                   type="number"
                                   onMouseEnter={AutoFocus}
                                   onMouseLeave={AutoBlur}/>
                            <Button className={styles.dropdownInteractionButton} type="button"
                                    onClick={insertTable}>Insert
                            </Button>
                            <label className={styles.uploadCSVLabel}
                                   htmlFor="uploadCSV">Import CSV</label>
                            <input className={styles.uploadCSVInput} id="uploadCSV" type="file" onChange={importCSV}/>
                        </div>
                    </div>

                    <div className={styles.toolbarItem}>
                        <FontAwesomeIcon icon="images"/>
                        <div className={styles.toolbarItemImageDropdown}>
                            <Button className={styles.dropdownInteractionButton} type="button" onClick={imageMd}>
                                External image
                            </Button>
                            <label className={styles.uploadCustomImageLabel}
                                   htmlFor="uploadCustomImage">Upload Image</label>
                            <input className={styles.uploadCustomImageInput} id="uploadCustomImage" type="file"
                                   onChange={onImageUpload}/>
                        </div>
                    </div>

                    <div className={styles.toolbarItem}>
                        <FontAwesomeIcon icon={['fab', 'react']}/>
                        <div className={styles.toolbarComponentDropDown}>
                            <div className={styles.componentSelection}>
                                Grid
                                <div className={styles.componentSelectionItem}>
                                    <Input defaultValue={1}
                                           label="Rows"
                                           min={1}
                                           name="gridRows"
                                           type="number"
                                           onMouseEnter={AutoFocus}
                                           onMouseLeave={AutoBlur}/>
                                    <Input defaultValue={1}
                                           label="Columns"
                                           min={1}
                                           name="gridColumns"
                                           type="number"
                                           onMouseEnter={AutoFocus}
                                           onMouseLeave={AutoBlur}/>
                                    <Button name="Grid" type="button" onClick={insertComponent}>
                                        Insert
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={styles.right}>
                    {rightToolbarItems.map((item, index) => (
                        <Button key={index}
                                className={styles.toolbarItem}
                                type="button"
                                onClick={item.onClick}>
                            <FontAwesomeIcon icon={item.icon}/>
                        </Button>
                    ))}

                    <div className={styles.toolbarItem} data-name="fontSize">
                        <FontAwesomeIcon icon="text-height"/>
                        <div className={styles.toolbarItemFontSizeDropdown}>
                            <Input defaultValue={20}
                                   label="Font Size"
                                   name="fontSize"
                                   type="number"
                                   onInput={onFontSizeChange}
                                   onMouseEnter={AutoFocus}
                                   onMouseLeave={AutoBlur}/>
                        </div>
                    </div>

                </div>
            </div>
        </FormProvider>
    );
};

export default Toolbar;