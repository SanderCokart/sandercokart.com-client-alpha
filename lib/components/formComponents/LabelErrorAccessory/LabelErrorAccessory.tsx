import type {HTMLAttributes} from 'react';
import {useFormState} from 'react-hook-form';

import styles from './LabelErrorAccessory.module.scss';

interface LabelErrorAccessoryProps extends HTMLAttributes<HTMLSpanElement> {
    name: string;
}

const LabelErrorAccessory = (props: LabelErrorAccessoryProps) => {
    const { name, ...restOfProps } = props;
    const { errors: { [name]: error } } = useFormState();

    if (error)
        return (
            <span className={styles.error} {...restOfProps}> {' - ' + error.message}</span>
        );
    return null;
};

export default LabelErrorAccessory;