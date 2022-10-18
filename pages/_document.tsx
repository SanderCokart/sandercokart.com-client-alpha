import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
    return (
        <Html data-theme="dark">
            <Head>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css" rel="stylesheet"/>
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}