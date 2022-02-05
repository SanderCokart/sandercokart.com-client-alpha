import {FC, HTMLAttributes} from 'react';
import {useFormState} from 'react-hook-form';
import styles from '@/styles/components/formComponents/LabelErrorAccessory.module.scss';


interface LabelErrorAccessoryProps {
    name: string;
}

const LabelErrorAccessory: FC<LabelErrorAccessoryProps & HTMLAttributes<HTMLSpanElement>> = (props) => {
    const { name, ...restOfProps } = props;
    const { errors: { [name]: error } } = useFormState();

    if (error)
        return (
            <span className={styles.error} {...restOfProps}> - {error.message}</span>
        );
    return null;
};

export default LabelErrorAccessory;