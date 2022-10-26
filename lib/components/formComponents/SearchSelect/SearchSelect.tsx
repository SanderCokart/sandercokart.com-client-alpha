import {faClose} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import type {KeyboardEvent} from 'react';
import {useState} from 'react';

import Input from '@/components/formComponents/Input';
import type {InputProps} from '@/components/formComponents/Input/Input';

import {useClickOutside} from '@/hooks/useClickOutside';

import styles from './SearchSelect.module.scss';

export interface SearchSelectProps extends InputProps {
    options: Array<{ [key: string]: string }>;
    displayValue: string;
}

const SearchSelect = (props: SearchSelectProps) => {
    const {
        options = [{ label: 'none', value: '' }],
        displayValue = 'label',
        className,
        ...restOfProps
    } = props;

    const clickOutsideRef = useClickOutside(() => setShowOptions(false));
    const [search, setSearch] = useState('');
    const [value, setValue] = useState<any>(props.value);
    const [showOptions, setShowOptions] = useState(false);

    const filteredOptions = options.filter(option => option[displayValue].toLowerCase().includes(search.toLowerCase()));

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setValue(filteredOptions[0]);
            setSearch('');
        }
    };

    return (
        <div ref={clickOutsideRef} className={classnames([styles.root, className])}>
            {!!value ? (
                <>
                    <div className={styles.valueContainer}>
                        <span className={styles.value} onClick={() => {
                            setValue(null);
                        }}>
                            {value[displayValue]}
                            <FontAwesomeIcon fixedWidth className={styles.valueRemoveIcon} icon={faClose}/>
                        </span>
                    </div>
                </>
            ) : (
                 <>
                     <Input name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onFocus={() => setShowOptions(true)}
                            onKeyDown={onEnter}
                            {...restOfProps}
                     />
                     {showOptions && (
                         <ul className={styles.list}>
                             {filteredOptions.map((option) => (
                                 <li key={option[displayValue]}
                                     className={styles.listItem}
                                     onClick={() => {
                                         setValue(option);
                                         setShowOptions(false);
                                         setSearch('');
                                     }}>
                                     {option[displayValue]}
                                 </li>
                             ))}
                         </ul>
                     )}
                 </>
             )}

        </div>
    );
};

export default SearchSelect;