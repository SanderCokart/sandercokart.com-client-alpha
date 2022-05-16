import type {ReactNode, CSSProperties, ButtonHTMLAttributes} from 'react';
import {Button} from '@/components/Button';
import styles from './FAB.module.scss';

interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    top?: CSSProperties['top'];
    bottom?: CSSProperties['bottom'];
    left?: CSSProperties['right'];
    right?: CSSProperties['left'];
    size?: number;
    icon: ReactNode;
}

const FAB = (props: FABProps) => {
    const {
        right = 'auto',
        bottom = 'auto',
        left = 'auto',
        top = 'auto',
        size = 24,
        ...restOfProps
    } = props;

    return (
        <div className={styles.root}>
            <Button
                {...restOfProps}
                circle
                className={styles.button}
                style={{
                    top: top,
                    bottom: bottom,
                    left: left,
                    right: right,
                    height: size,
                    width: size,
                    fontSize: (size / 2)
                }}>
                {props.icon}
            </Button>
        </div>
    );
};

export default FAB;