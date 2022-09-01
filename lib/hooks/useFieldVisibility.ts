import {useState, MutableRefObject} from 'react';

const UseFieldVisibility = () => {
    const [showPasswordAsText, setShowPasswordAsText] = useState(false);

    const togglePasswordVisibility = (ref: MutableRefObject<HTMLInputElement | null>) => {
        if (ref.current) {
            ref.current.type = ref.current.type === 'password' ? 'text' : 'password';
            setShowPasswordAsText(showPasswordAsText => !showPasswordAsText);
        }
    };

    return { showPasswordAsText, togglePasswordVisibility };
};

export default UseFieldVisibility;