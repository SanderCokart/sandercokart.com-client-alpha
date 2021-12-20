import type {FC} from 'react';
import Switch from '../lib/components/formComponents/Switch';
import useAuth from '../lib/hooks/useAuth';

const Settings: FC = () => {
    const { logout } = useAuth();

    const toggleTheme = (state: boolean) => {
        document.documentElement.setAttribute('data-theme', state ? 'light' : 'dark');
    };

    return (
        <div>
            <Switch icon="sun" label="Toggle Dark Theme" name="theme" onToggle={toggleTheme}/>
            <button type="button" onClick={logout}>Logout</button>
        </div>
    );
};

export default Settings;