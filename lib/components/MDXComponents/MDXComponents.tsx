import Image from 'next/image';
import type {CSSProperties, ReactNode, ImgHTMLAttributes} from 'react';

import Flex from '@/components/Flex';
import Grid from '@/components/Grid';
import {Pre, Code, CodeTabs} from '@/components/MDXComponents/CodeTabs';

import type {PropsWithChildren} from '@/types/CustomTypes';

import styles from './MDXComponents.module.scss';

export const Title = (props: PropsWithChildren) => <h1 className={styles.title} {...props}/>;

export interface AlignProps {
    children: ReactNode;
    align?: CSSProperties['textAlign'];
}

const Align = (props: AlignProps) => {
    const { children, align = 'left' } = props;
    return (
        <div style={{ textAlign: align }}>
            {children}
        </div>
    );
};

const HtmlImage = (props: ImgHTMLAttributes<HTMLImageElement>) => {
    return (
        <img {...props} alt={props.alt} className={styles.img} title={props.alt}/>
    );
};

const NextImage = (props: ImgHTMLAttributes<HTMLImageElement>) => {
    const determineOptimization = () => {
        if (props.src === 'string') return props.src.includes('/files') || !props.src.includes(process.env.NEXT_PUBLIC_API_URL);
        return false;
    };

    if (props.src)
        return (
            <span className={styles.imageWrapper}>
            <Image layout="fill" objectFit="contain"
                   src={props.src}
                   unoptimized={determineOptimization()}/>
        </span>
        );

    return null;
};

const extractHrefId = ({ children }: PropsWithChildren) => {
    return String('heading-' + children).toLowerCase();
};

const Mark = ({ color, children }: PropsWithChildren<{ color: CSSProperties['color'] }>) => (
    <span style={{ backgroundColor: color, alignSelf:'flex-start' }}>{children}</span>
);

const Color = ({ color, children }: PropsWithChildren<{ color: CSSProperties['color'] }>) => (
    <span style={{ color,alignSelf:'flex-start' }}>{children}</span>
);

export const MDXComponents = {
    Grid,

    Flex,

    Align,

    Title,

    CodeTabs,

    Mark,

    Color,

    code: Code,

    pre: Pre,

    a: (props: PropsWithChildren) => <a className={styles.a} {...props}/>,

    h1: (props: PropsWithChildren) => <h1 className={styles.h1} id={extractHrefId(props)} {...props}/>,

    h2: (props: PropsWithChildren) => <h2 className={styles.h2} id={extractHrefId(props)} {...props}/>,

    h3: (props: PropsWithChildren) => <h3 className={styles.h3} id={extractHrefId(props)} {...props}/>,

    h4: (props: PropsWithChildren) => <h4 className={styles.h4} id={extractHrefId(props)} {...props}/>,

    img: NextImage,

    li: (props: PropsWithChildren) => <li className={styles.li} {...props}/>,

    ol: (props: PropsWithChildren) => <ol className={styles.ol} {...props}/>,

    p: (props: PropsWithChildren) => <p className={styles.p} {...props}/>,

    table: (props: PropsWithChildren) => <table className={styles.table} {...props}/>,

    ul: (props: PropsWithChildren) => <ul className={styles.ul} {...props}/>
};

export const EditorMDXComponents = { ...MDXComponents, img: HtmlImage };

