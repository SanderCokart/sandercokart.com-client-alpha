import File from '@/components/formComponents/File';
import MDXComponents from '@/components/MDXComponents';
import axios from '@/functions/shared/axios';
import editorStyles from '@/styles/components/Editor.module.scss';
import {MarkdownEditorProps} from '@/types/PropTypes';
// @ts-ignore
import MDX from '@mdx-js/runtime';
import dynamic from 'next/dynamic';
import type {FC} from 'react';
import {useFormContext} from 'react-hook-form';
import {Plugins} from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkToc from 'remark-toc';
// @ts-ignore
import remarkUnderline from 'remark-underline';


const MDXEditor = dynamic(
    () => {
        return new Promise((resolve) => {
            Promise.all([
                import('react-markdown-editor-lite'),
                import ('./Plugins/Underline'),
                import ('./Plugins/HR')
            ]).then((res) => {
                res[0].default.use(res[1].default);
                res[0].default.use(res[2].default);
                res[0].default.use(Plugins.TabInsert, { tabMapValue: 3 });
                res[0].default.unuse(Plugins.FontUnderline);
                res[0].default.unuse(Plugins.Clear);
                res[0].default.unuse(Plugins.Logger);
                res[0].default.unuse(Plugins.Clear);
                resolve(res[0].default);
            });
        });
    },
    {
        ssr: false
    }
);

const MarkdownEditor: FC<MarkdownEditorProps> = ({ name, ...props }) => {
    const { setValue, watch } = useFormContext();

    const onChange = (value: { text: string, html: string }) => {
        setValue(name, value.text);
    };

    const onImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await axios.simplePost('/files', formData);


        return new Promise(resolve => {
            resolve(`${process.env.NEXT_PUBLIC_API_URL}/files/${data.id}`);
        });
    };

    const renderFunction = (html: string) => {
        const [title, excerpt] = watch(['title', 'excerpt', 'markdown']);
        const header = `<Title>${title}</Title>\n\n${excerpt}\n\n`;
        try {
            return (
                <MDX components={MDXComponents}
                     rehypePlugins={[rehypeSlug]}
                     remarkPlugins={[remarkParse, remarkGfm, remarkBreaks, remarkToc, remarkUnderline]}>
                    {header + html}
                </MDX>
            );
        } catch (error) {
            return (
                <div>
                    <h1>{error.name}</h1>
                    <p>{error.message}</p>
                </div>
            );
        }
    };

    return <MDXEditor
        className={editorStyles.editor}
        htmlClass={editorStyles.html}
        markdownClass={editorStyles.markdown}
        renderHTML={renderFunction}
        value={watch('markdown')}
        onChange={onChange}
        onImageUpload={onImageUpload}
    />;
};

export default MarkdownEditor;