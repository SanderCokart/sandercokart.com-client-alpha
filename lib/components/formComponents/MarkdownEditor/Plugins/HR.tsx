import {PluginComponent} from 'react-markdown-editor-lite';

export default class HR extends PluginComponent {
    static pluginName = 'horizontal-line';

    constructor(props: any) {
        super(props);
    }

    render() {

        return (
            <span
                className="button"
                title="horizontal line"
                onClick={() => {
                    this.editor.insertText('***')
                }}
            >
                ---
      </span>
        );
    }
}