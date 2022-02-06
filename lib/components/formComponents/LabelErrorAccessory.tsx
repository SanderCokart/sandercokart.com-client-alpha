import styles from '@/styles/components/formComponents/LabelErrorAccessory.module.scss';
import type {LabelErrorAccessoryProps} from '@/types/PropTypes';
import type {FC} from 'react';
import {useFormState} from 'react-hook-form';


const LabelErrorAccessory: FC<LabelErrorAccessoryProps> = (props) => {
    const { name, ...restOfProps } = props;
    const { errors: { [name]: error } } = useFormState();

    if (error)
        return (
            <span className={styles.error} {...restOfProps}> - {error.message}</span>
        );
    return null;
};

export default LabelErrorAccessory;