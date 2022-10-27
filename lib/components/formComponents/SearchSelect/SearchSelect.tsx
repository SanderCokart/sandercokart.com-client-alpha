import {faClose} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {KeyboardEvent} from 'react';
import {useState} from 'react';

import Input from '@/components/formComponents/Input';
import type {InputProps} from '@/components/formComponents/Input/Input';

import {useClickOutside} from '@/hooks/useClickOutside';

import styles from './SearchSelect.module.scss';

export interface SelectOption {
    [key: string]: any;
}

export interface SearchSelectProps {
    options: SelectOption[];
    displayValue: string;
    onChange?: (value: SelectOption) => void;
    defaultValue?: SelectOption;
    inputProps?: InputProps;
}

const SearchSelect = (props: SearchSelectProps) => {
    const {
        options = [{ label: 'none', value: '' }],
        displayValue = 'label',
        defaultValue = null,
        inputProps = undefined
    } = props;

    const clickOutsideRef = useClickOutside(() => setShowOptions(false));
    const [selectedValue, setSelectedValue] = useState<null | SelectOption>(defaultValue);
    const [search, setSearch] = useState('');
    const [showOptions, setShowOptions] = useState(false);

    const filteredOptions = options.filter(option => option[displayValue].toLowerCase().includes(search.toLowerCase()));

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSelectedValue(filteredOptions[0]);
            setSearch('');
            props.onChange?.(filteredOptions[0]);
        }
    };

    const onOptionClick = (option: SelectOption) => {
        setSelectedValue(option);
        setShowOptions(false);
        setSearch('');
        props.onChange?.(option);
    };

    const handleRemove = () => {
        setSelectedValue(null);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const onInputFocus = () => {
        setShowOptions(true);
    };

    return (
        <div ref={clickOutsideRef} className={styles.root}>
            {!!selectedValue ? (
                <>
                    <div className={styles.valueContainer}>
                        <span className={styles.value} onClick={handleRemove}>
                            {selectedValue?.[displayValue]}
                            <FontAwesomeIcon fixedWidth className={styles.valueRemoveIcon} icon={faClose}/>
                        </span>
                    </div>
                </>
            ) : (
                 <>
                     <Input name="search"
                            value={search}
                            onChange={handleSearchChange}
                            onFocus={onInputFocus}
                            onKeyDown={onEnter}
                            {...inputProps}
                     />
                     {showOptions && (
                         <ul className={styles.list}>
                             {filteredOptions.map((option) => (
                                 <li key={option[displayValue]}
                                     className={styles.listItem}
                                     onClick={() => onOptionClick(option)}>
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