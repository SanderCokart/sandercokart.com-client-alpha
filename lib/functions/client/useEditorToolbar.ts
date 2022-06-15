// import {useCallback, ChangeEvent, useState, MouseEvent, useEffect} from 'react';
// import {useFormContext} from 'react-hook-form';
// import axios from '@/functions/shared/axios';
// import {FileModel} from '@/types/ModelTypes';
// import {ApiPostFilesStoreRoute} from '@/constants/api-routes';
// import useFile from '@/hooks/useFile';
// import {useEditorContext} from '@/components/formComponents/MarkdownEditor/NewMarkdownEditor';
//
// const UseEditorToolbar = () => {
//     const { editorRef: { current: editor }, nameAndId: name } = useEditorContext();
//     const { setValue } = useFormContext();
//     const { getUrl } = useFile();
//
//     const [tableRows, setTableRows] = useState(1);
//     const [tableColumns, setTableColumns] = useState(1);
//     const [gridColumns, setGridColumns] = useState(1);
//     const [fontSize, setFontSize] = useState(20);
//
//     useEffect(() => {
//         console.log({tableRows, tableColumns, gridColumns, fontSize});
//     }, [tableRows, tableColumns, gridColumns, fontSize]);
//
//     const autoFocus = (e: MouseEvent<HTMLInputElement>) => {
//         e.currentTarget.focus({ preventScroll: true });
//     };
//
//     const autoBlur = (e: MouseEvent<HTMLInputElement>) => {
//         if (editor) {
//             editor.focus({ preventScroll: true });
//         }
//     };
//
//     const nothingSelected = () => {
//         if (editor) return editor.selectionStart === editor.selectionEnd;
//     };
//
//     const hasLeadingSpace = () => {
//         return editor?.value.charAt(editor.selectionEnd - 1) === ' ';
//     };
//
//     const selectWordUnderCursor = useCallback(() => {
//         if (editor) {
//             const { value, selectionStart, selectionEnd } = editor;
//             const terminators = [' ', '\n', '.', '!', '?', ':', ';', ','];
//
//             editor.focus();
//
//             let lowestBackward = 0, lowestForward = value.length, forArray = [], backArray = [];
//             terminators.forEach(char => {
//                 const backward = value.lastIndexOf(char, selectionStart);
//                 const forward = value.indexOf(char, selectionEnd);
//
//                 forArray.push(char + ' ' + forward);
//                 backArray.push(char + ' ' + backward);
//
//                 if (backward !== -1 && (backward > lowestBackward)) lowestBackward = backward + 1;
//                 if (forward !== -1 && (forward < lowestForward)) lowestForward = forward;
//             });
//
//             editor.selectionStart = lowestBackward;
//             editor.selectionEnd = lowestForward;
//         }
//     }, [editor]);
//
//     const wrap = useCallback((wrapWith: string) => {
//         if (editor) {
//             if (nothingSelected()) selectWordUnderCursor();
//             const { value, selectionStart, selectionEnd } = editor;
//
//             const pre = value.substring(0, selectionStart);
//             const center = wrapWith + value.substring(selectionStart, hasLeadingSpace() ? selectionEnd - 1 : selectionEnd) + wrapWith;
//             const post = hasLeadingSpace() ? ' ' : '' + value.substring(selectionEnd);
//
//             setValue(name, pre + center + post);
//         }
//     }, [editor]);
//
//     const handleMarkdownImage = useCallback(() => {
//         if (editor) {
//             const url = prompt('Enter the image URL or leave empty:');
//             const { value, selectionStart, selectionEnd } = editor;
//
//             setValue(name, `${value.substring(0, selectionStart)}![alt](${url ? url : 'https://'})${value.substring(selectionStart)}`);
//
//             editor.selectionStart = selectionEnd + 15;
//             editor.selectionEnd = selectionEnd + 15;
//             editor.focus();
//         }
//     }, [editor]);
//
//     const handleImageUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
//         if (editor) {
//             const files = Array.from(e.target.files ?? []);
//             const formData = new FormData();
//             formData.set('file', files[0]);
//
//             const response = await axios.simplePost<FileModel>(ApiPostFilesStoreRoute, formData);
//             switch (response.type) {
//                 case 'success': {
//                     const { value, selectionStart, selectionEnd } = editor;
//                     console.log(response.data);
//                     setValue(name, value.substring(0, selectionStart) + `![${files[0].name}](${getUrl(response.data).url})\n` + value.substring(selectionEnd));
//                     editor.selectionStart = editor.selectionEnd;
//                     editor.focus();
//                 }
//             }
//             e.target.value = '';
//         }
//
//
//     }, [editor]);
//
//
//     const handleTableInsertion = useCallback(() => {
//         if (editor) {
//             let tableMd = '\n\n';
//             for (let i = 0; i < tableColumns; i++) {
//                 tableMd += '| head ';
//             }
//             tableMd += '|\n';
//             for (let i = 0; i < tableColumns; i++) {
//                 tableMd += '| :--: ';
//             }
//             tableMd += '|\n';
//
//             for (let i = 0; i < tableRows; i++) {
//                 for (let j = 0; j < tableColumns; j++) {
//                     tableMd += '| data ';
//                 }
//                 tableMd += '|\n';
//             }
//
//             tableMd += '\n';
//
//             selectWordUnderCursor();
//             const pre = editor.value.substring(0, editor.selectionEnd);
//             const post = editor.value.substring(editor.selectionEnd);
//             setValue(name, pre + tableMd + post);
//             editor.focus();
//         }
//     }, [editor, tableColumns, tableRows]);
//
//     return {
//         wrap,
//         handleMarkdownImage,
//         handleImageUpload,
//         handleTableInsertion,
//         tableRows,
//         setTableRows,
//         tableColumns,
//         setTableColumns,
//         gridColumns,
//         setGridColumns,
//         fontSize,
//         setFontSize,
//         autoFocus,
//         autoBlur
//     };
// };
//
// export default UseEditorToolbar;