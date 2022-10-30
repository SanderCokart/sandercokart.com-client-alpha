import Papa from 'papaparse';
import type {ReactNode, SetStateAction, Dispatch, CSSProperties, MouseEvent, ChangeEvent} from 'react';
import {createContext, useContext, useState, useCallback} from 'react';
import {useFormContext} from 'react-hook-form';

import {useEditorContext} from '@/components/formComponents/MarkdownEditor';
import type {GridProps} from '@/components/Grid/Grid';

import {ApiPostFilesStoreRoute} from '@/constants/api-routes';

import convertObjectToPropsString from '@/functions/client/ConvertObjectToPropsString';
import axios from '@/functions/shared/axios';

import useFile from '@/hooks/useFile';

import type {FileModel} from '@/types/ModelTypes';

export const EditorToolbarContext = createContext({});

interface AdvancedWrapOptionBase {
    wrap?: boolean;
    additionalSpace?: boolean;
}

interface AdvancedWrapStringOption extends AdvancedWrapOptionBase {
    type: 'string';
}

interface AdvancedWrapComponentOption extends AdvancedWrapOptionBase {
    type: 'component';

    [key: string]: any;
}

interface AdvancedWrapHtmlOption extends AdvancedWrapOptionBase {
    type: 'html';
    style: CSSProperties;
}

type AdvancedWrapOptions = AdvancedWrapStringOption | AdvancedWrapHtmlOption | AdvancedWrapComponentOption;

export interface EditorToolbarContextType {
    autoBlur: (e: MouseEvent<HTMLInputElement>) => void;
    autoFocus: (e: MouseEvent<HTMLInputElement>) => void,

    handleCSVImport: () => void;
    handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
    handleMarkdownImage: () => void;
    handleTableInsertion: () => void;
    insertComponent: (params: InsertableComponents) => void;
    wrapWithHTMLTag: (tagName: keyof HTMLElementTagNameMap) => void;
    wrap: (wrapWith: string) => void;
    insert: (toInsert: string, wraps?: boolean) => void;
    advancedInsert: (toInsert: string, options: AdvancedWrapOptions) => void;

    handleLinkInsertion: () => void;

    fontSize: number;
    setFontSize: (fontSize: number) => void;

    tabSize: number;
    setTabSize

    tableColumns: number;
    setTableColumns: Dispatch<SetStateAction<number>>;
    tableRows: number;
    setTableRows: (rows: number) => void;
}

type  InsertableComponents = Grid | Align | Mark | Color | CodeTabs;

interface Mark {
    componentName: 'Mark';
    color: string;
}

interface Color {
    componentName: 'Color';
    color: string;
}

interface Grid extends Omit<GridProps, 'children'> {
    componentName: 'Grid';
}

interface Align {
    componentName: 'Align';
    align?: CSSProperties['textAlign'];
}

interface CodeTabs {
    componentName: 'CodeTabs';
}

const componentsWithChildren = ['Grid', 'Align', 'Mark', 'Color', 'CodeTabs'];

export const useEditorToolbar = () => useContext(EditorToolbarContext) as EditorToolbarContextType;

const EditorToolbarContextProvider = (props: { children: ReactNode }) => {
    const { editorRef: { current: editor }, nameAndId: name } = useEditorContext();
    const { setValue } = useFormContext();
    const { getUrl } = useFile();

    const [tableRows, setTableRows] = useState(1);
    const [tableColumns, setTableColumns] = useState(1);
    const [gridColumns, setGridColumns] = useState(1);
    const [fontSize, setFontSize] = useState(20);
    const [tabSize, setTabSize] = useState(3);

    const autoFocus = (e: MouseEvent<HTMLInputElement>) => {
        e.currentTarget.focus({ preventScroll: true });
    };

    const autoBlur = () => {
        if (editor) editor.focus({ preventScroll: true });
    };

    const nothingSelected = () => {
        if (editor) return editor.selectionStart === editor.selectionEnd;
    };

    const hasLeadingSpace = () => {
        return editor?.value.charAt(editor.selectionEnd - 1) === ' ';
    };

    const selectWordUnderCursor = useCallback(() => {
        if (editor) {
            const { value, selectionStart, selectionEnd } = editor;
            const terminators = [' ', '\n', '.', '!', '?', ':', ';', ','];

            editor.focus();

            let lowestBackward = 0, lowestForward = value.length;
            terminators.forEach(char => {
                const backward = value.lastIndexOf(char, selectionStart);
                const forward = value.indexOf(char, selectionEnd);

                if (backward !== -1 && (backward > lowestBackward)) lowestBackward = backward + 1;
                if (forward !== -1 && (forward < lowestForward)) lowestForward = forward;
            });

            editor.selectionStart = lowestBackward;
            editor.selectionEnd = lowestForward;
        }
    }, [editor]);

    /*TODO make a better insert for components, html and strings*/
    const advancedInsert = useCallback((toInsert: string, options: AdvancedWrapOptions) => {
        const {
            wrap = false,
            additionalSpace = false,
            type = 'component',
            ...restOfProps
        } = options;

        if (editor) {
            const { value, selectionStart, selectionEnd } = editor;
            if (wrap && nothingSelected()) selectWordUnderCursor();
            const pre = value.substring(0, selectionStart);
            const post = hasLeadingSpace() ? ' ' : '' + value.substring(selectionEnd);
            const propsString = convertObjectToPropsString(restOfProps);

            const generateOutput = (closing = false) => {
                if (['html', 'component'].includes(type)) {
                    return closing ? `</${toInsert}>` : `<${toInsert} ${propsString}>`;
                } else
                    return toInsert;
            };

            const center = wrap ?
                           (generateOutput()
                               + (value.substring(selectionStart, (hasLeadingSpace() ? selectionEnd - 1 : selectionEnd)))
                               + generateOutput(true))
                                :
                           (toInsert);

            setValue(name, pre + center + post);

            let index = selectionStart + toInsert.length;
            if (type === 'html')
                index += 2;
            if (type === 'component') {
                index += 2;
                if (propsString)
                    index += propsString.length + 1;
            }
            editor.selectionStart = index;
            editor.selectionEnd = index;

            // if (nothingSelected()) selectWordUnderCursor();
            // const { value, selectionStart, selectionEnd } = editor;
            //
            // const pre = value.substring(0, selectionStart);
            // const center = wrapWith + value.substring(selectionStart, hasLeadingSpace() ? selectionEnd - 1 : selectionEnd) + wrapWith;
            // const post = hasLeadingSpace() ? ' ' : '' + value.substring(selectionEnd);
            //
            // setValue(name, pre + center + post);
            //
            // if (nothingSelected()) {
            //     const index = selectionStart + wrapWith.length;
            //     editor.selectionStart = index;
            //     editor.selectionEnd = index;
            // }
        }
    }, [editor]);

    const wrap = useCallback((wrapWith: string) => {
        if (editor) {
            if (nothingSelected()) selectWordUnderCursor();
            const { value, selectionStart, selectionEnd } = editor;

            const pre = value.substring(0, selectionStart);
            const center = wrapWith + value.substring(selectionStart, hasLeadingSpace() ? selectionEnd - 1 : selectionEnd) + wrapWith;
            const post = hasLeadingSpace() ? ' ' : '' + value.substring(selectionEnd);

            setValue(name, pre + center + post);

            if (nothingSelected()) {
                const index = selectionStart + wrapWith.length;
                editor.selectionStart = index;
                editor.selectionEnd = index;
            }
        }
    }, [editor]);

    const insert = useCallback((toInsert: string, wraps?: boolean) => {
        if (editor) {
            const { value, selectionStart, selectionEnd } = editor;
            const pre = value.substring(0, selectionStart);
            const post = value.substring(selectionEnd);

            setValue(name, pre + toInsert + post);

            if (!wraps) {
                editor.selectionStart = selectionStart + toInsert.length;
                editor.selectionEnd = selectionEnd + toInsert.length;
            } else {
                const index = toInsert.lastIndexOf('\n');
                editor.selectionStart = index;
                editor.selectionEnd = index;
            }
            editor.focus();
        }
    }, [editor]);

    const handleMarkdownImage = useCallback(() => {
        if (editor) {
            const url = prompt('Enter the image URL or leave empty:');
            const { value, selectionStart, selectionEnd } = editor;

            setValue(name, `${value.substring(0, selectionStart)}![alt](${url ? url : 'https://'})${value.substring(selectionStart)}`);

            editor.selectionStart = selectionEnd + 15;
            editor.selectionEnd = selectionEnd + 15;
            editor.focus();
        }
    }, [editor]);

    const handleImageUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        if (editor) {
            const files = Array.from(e.target.files ?? []);
            const formData = new FormData();
            formData.set('file', files[0]);

            const response = await axios.simplePost<FileModel>(ApiPostFilesStoreRoute, formData);
            switch (response.type) {
                case 'success': {
                    const { value, selectionStart, selectionEnd } = editor;
                    setValue(name, value.substring(0, selectionStart) + `![${files[0].name}](${getUrl(response.data).url})\n` + value.substring(selectionEnd));
                    editor.selectionStart = editor.selectionEnd;
                    editor.focus();
                }
            }
            e.target.value = '';
        }

    }, [editor]);

    const handleTableInsertion = useCallback(() => {
        if (editor) {
            let tableMd = '\n\n';
            for (let i = 0; i < tableColumns; i++) {
                tableMd += '| head ';
            }
            tableMd += '|\n';
            for (let i = 0; i < tableColumns; i++) {
                tableMd += '| :--: ';
            }
            tableMd += '|\n';

            for (let i = 0; i < tableRows; i++) {
                for (let j = 0; j < tableColumns; j++) {
                    tableMd += '| data ';
                }
                tableMd += '|\n';
            }

            tableMd += '\n';

            const pre = editor.value.substring(0, editor.selectionEnd);
            const post = editor.value.substring(editor.selectionEnd);
            setValue(name, pre + tableMd + post);
            editor.focus();
        }
    }, [editor, tableColumns, tableRows]);

    const handleCSVImport = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files)
            Papa.parse<string[]>(e.target.files[0], {
                complete: (results) => {
                    if (editor) {
                        const { value, selectionEnd } = editor;
                        const headers = results.data[0];
                        const rows = results.data.slice(1);

                        let tableMd = '\n\n';
                        for (let i = 0; i < headers.length; i++) {
                            tableMd += `| ${headers[i]} `;
                        }
                        tableMd += '|\n';
                        for (let i = 0; i < headers.length; i++) {
                            tableMd += '| :--: ';
                        }
                        tableMd += '|\n';

                        for (let i = 0; i < rows.length; i++) {
                            for (let j = 0; j < headers.length; j++) {
                                tableMd += `| ${rows[i][j]} `;
                            }
                            tableMd += '|\n';
                        }

                        tableMd += '\n';

                        selectWordUnderCursor();
                        setValue(name, value.substring(0, selectionEnd) + tableMd + value.substring(selectionEnd));

                        e.target.value = '';
                        editor.focus();
                    }
                }
            });
    };

    const insertComponent = useCallback((params: InsertableComponents) => {
        const { componentName, ...props } = params;
        const propsString = convertObjectToPropsString(props);
        const shouldHaveChildren = componentsWithChildren.includes(componentName);

        if (editor) {

            if (shouldHaveChildren) {

                if (nothingSelected()) selectWordUnderCursor();

                const { value, selectionStart, selectionEnd } = editor;
                const pre = value.substring(0, selectionStart);
                const post = value.substring(selectionEnd);
                const selection = value.substring(selectionStart, selectionEnd);
                const calculatedLength = selectionEnd + componentName.length + propsString.length + 3 + 2;

                const newValue = pre + `<${componentName} ${propsString}>${selection}\n\n\n\n</${componentName}>` + post;
                setValue(name, newValue);

                editor.selectionStart = calculatedLength;
                editor.selectionEnd = calculatedLength;
                editor.focus();
            } else {
                const { value, selectionStart, selectionEnd } = editor;
                const pre = value.substring(0, selectionStart);
                const post = value.substring(selectionEnd);
                const calculatedLength = selectionEnd + componentName.length + propsString.length + 3;

                const newValue = pre + `<${componentName} ${propsString}/>` + post;
                setValue(name, newValue);

                editor.selectionStart = calculatedLength;
                editor.selectionEnd = calculatedLength;
                editor.focus();
            }
        }
    }, [editor]);

    const changeFontSize = useCallback((fontSize: number) => {
        if (editor) {
            setFontSize(Number(fontSize));
            editor.style.fontSize = `${fontSize}px`;
        }
    }, [editor]);

    const changeTabSize = useCallback((tabSize: number) => {
        if (editor) {
            setTabSize(tabSize);
        }
    }, [editor]);

    const handleLinkInsertion = useCallback(() => {
        if (editor) {
            const url = prompt('Enter the link URL or leave empty:') ?? '';
            const { value, selectionStart, selectionEnd } = editor;

            const pre = value.substring(0, selectionStart);
            const post = value.substring(selectionEnd);

            const newValue = pre + `[${url}](${url})` + post;

            setValue(name, newValue);

            editor.selectionStart = selectionEnd + 1;
            editor.selectionEnd = selectionEnd + 1 + url.length;
            editor.focus();
        }
    }, [editor]);

    const wrapWithHTMLTag = useCallback((tagName: keyof HTMLElementTagNameMap) => {
        if (editor) {
            if (nothingSelected()) selectWordUnderCursor();
            const { value, selectionStart, selectionEnd } = editor;

            const pre = value.substring(0, selectionStart);
            const center = `<${tagName}>` + value.substring(selectionStart, hasLeadingSpace() ? selectionEnd - 1 : selectionEnd) + `</${tagName}>`;
            const post = hasLeadingSpace() ? ' ' : '' + value.substring(selectionEnd);

            setValue(name, pre + center + post);

            if (nothingSelected()) {
                const index = selectionStart + `<${tagName}>`.length;
                editor.selectionStart = index;
                editor.selectionEnd = index;
            }
        }
    }, [editor]);

    return (
        <EditorToolbarContext.Provider value={{
            autoBlur,
            autoFocus,
            fontSize,
            gridColumns,
            handleCSVImport,
            handleImageUpload,
            handleLinkInsertion,
            handleMarkdownImage,
            handleTableInsertion,
            insert,
            insertComponent,
            setFontSize: changeFontSize,
            setGridColumns,
            setTabSize: changeTabSize,
            setTableColumns,
            setTableRows,
            tabSize,
            tableColumns,
            tableRows,
            wrap,
            wrapWithHTMLTag,
            advancedInsert
        }}>
            {props.children}
        </EditorToolbarContext.Provider>
    );
};

export default EditorToolbarContextProvider;