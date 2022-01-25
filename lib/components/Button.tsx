import styles from '@/styles/components/Button.module.scss';
import type {ButtonProps} from '@/types/PropTypes';
import type {FC} from 'react';

const Button: FC<ButtonProps> = (props) => {
    const {type =  'button'} = props;
    return <button className={styles.button} type={type} {...props} />;
};

export default Button;