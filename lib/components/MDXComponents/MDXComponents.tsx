import type {ImageProps as NextImageProps} from 'next/image';
import NextImage from 'next/image';
import {CSSProperties, ReactNode} from 'react';

import Flex from '@/components/Flex';
import Grid from '@/components/Grid';
import Code from '@/components/MDXComponents/Code';

import {withChildren} from '@/types/CustomTypes';

import styles from './MDXComponents.module.scss';


export const Title = (props: withChildren) => <h1 className={styles.title} {...props}/>;

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

interface ImageProps extends NextImageProps {
    src: string;
}

const MDXComponents = (isEditor: boolean) => {
    return {
        Grid,

        Flex,

        Align,

        Title,

        a: (props: withChildren) => <a className={styles.a} {...props}/>,

        code: Code,

        h1: (props: withChildren) => <h1 className={styles.h1} {...props}/>,

        h2: (props: withChildren) => <h2 className={styles.h2} {...props}/>,

        h3: (props: withChildren) => <h3 className={styles.h3} {...props}/>,

        h4: (props: withChildren) => <h4 className={styles.h4} {...props}/>,

        img: (props: ImageProps) => isEditor ?
                                    <img {...props} alt={props.alt} className={styles.img} title={props.alt}/>
                                             :
                                    <NextImage layout="fill" objectFit="contain"
                                               src={props.src}
                                               unoptimized={props.src.includes('/files') || !props.src.includes(process.env.NEXT_PUBLIC_API_URL)}/>,

        li: (props: withChildren) => <li className={styles.li} {...props}/>,

        ol: (props: withChildren) => <ol className={styles.ol} {...props}/>,

        p: (props: withChildren) => <p className={styles.p} {...props}/>,

        table: (props: withChildren) => <table className={styles.table} {...props}/>,

        ul: (props: withChildren) => <ul className={styles.ul} {...props}/>
    };
};

export default MDXComponents;
