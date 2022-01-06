import {PluginComponent} from 'react-markdown-editor-lite';
import {KeyboardEventListener} from 'react-markdown-editor-lite/cjs/share/var';

export default class Underline extends PluginComponent {
    static pluginName = 'font-underline';

    private readonly handleKeyboard: KeyboardEventListener;

    constructor(props: any) {
        super(props);

        this.handleKeyboard = {
            key: 'u',
            keyCode: 85,
            withKey: ['ctrlKey'],
            callback: () => this.editor.insertMarkdown('underline')
        };
    }

    componentDidMount() {
        if (this.editorConfig.shortcuts) {
            this.editor.onKeyboard(this.handleKeyboard);
        }
    }

    componentWillUnmount() {
        this.editor.offKeyboard(this.handleKeyboard);
    }

    render() {

        return (
            <span
                className="button button-type-underline"
                title="underline"
                onClick={() => {
                    const { start, end, text } = this.editor.getSelection();
                    this.editor.insertText(`__${text}__`, true, { start: end, end: end });
                }}
            >
                <i className="rmel-iconfont rmel-icon-underline"/>
      </span>
        );
    }
}