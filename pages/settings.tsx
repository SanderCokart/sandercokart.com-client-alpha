import Switch from '../lib/components/formComponents/Switch';
import type {FC} from 'react';

const Settings: FC = () => {
    const toggleTheme = (state: boolean) => {
        document.documentElement.setAttribute('data-theme', state ? 'light' : 'dark');
    };

    return (
        <div>
            <Switch icon="sun" label="Toggle Dark Theme" name="theme" onToggle={toggleTheme}/>
        </div>
    );
};

export default Settings;