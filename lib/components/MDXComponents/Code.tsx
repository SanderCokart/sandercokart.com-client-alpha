import Highlighter, {defaultProps} from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import type {FC} from 'react';

const Code: FC<HTMLUnknownElement> = ({ children, className }) => {
    const language = className.replace(/language-/, '');
    return (
        <Highlighter {...defaultProps} code={children?.trim()} language={language} theme={theme}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className}
                     style={{ ...style, overflow: 'auto', padding: 16 }}>

                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}

                    <button value={children?.trim()}>copy</button>
        </pre>
            )}
        </Highlighter>
    );
};

export default Code;