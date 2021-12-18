import Switch from '@/components/formComponents/Switch';
import type {FC} from 'react';

const Settings: FC = () => {
    const toggleTheme = (state: boolean) => {
        document.documentElement.setAttribute('data-theme', state ? 'light' : 'dark');
    };

    return (
        <div>
            <Switch icon="sun" label="Toggle Dark Theme" name="theme" onToggle={toggleTheme}/>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci aliquid amet animi, atque
            beatae consectetur consequuntur cum distinctio ducimus eaque eius eos facilis fuga labore magni
            necessitatibus, nobis quas velit voluptates? Animi assumenda autem debitis, eius eos iusto modi
            necessitatibus nostrum officia officiis provident quidem recusandae reiciendis repudiandae tempore.
            Architecto asperiores aspernatur assumenda cumque dolor eligendi explicabo facilis harum iste laborum,
            libero maiores minus molestiae nam nemo nesciunt, nobis nostrum odio optio possimus praesentium quae quia
            quo, sequi ullam unde voluptas voluptates? Asperiores ea ex hic in nesciunt nobis odit officia unde!
            Adipisci laborum libero maiores nisi similique sint!
        </div>
    );
};

export default Settings;