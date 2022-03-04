import Radio from '@/components/formComponents/Radio';
import {useTheme} from '@/providers/ThemeProvider';
import {ChangeEvent} from 'react';
import styles from './ThemeControl.module.scss';

const ThemeControl = () => {
    const { theme, setTheme } = useTheme();

    const onThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTheme(e.target.value);
    };

    return (
        <div className={styles.themeControl}>
            <Radio
                name="theme"
                options={[
                    { label: 'Light', value: 'light' },
                    { label: 'Dark', value: 'dark' },
                    { label: 'Device', value: 'device' }]}
                optionsContainerProps={{ className: styles.themeRadioControl }}
                selectedValue={theme}
                onChange={onThemeChange}/>
        </div>
    );
};

export default ThemeControl;