import languages from '@/data/languages';
import {useState} from 'react';

import Input from '@/components/formComponents/Input';
import SearchSelect from '@/components/formComponents/SearchSelect';

const Test = () => {
    const [selectedLanguage, setSelectedLanguage] = useState({ language: 'Typescript', extension: 'ts' });
    const [search, setSearch] = useState('');
    const onChange = (value) => {
        setSelectedLanguage(value);
    };
    return (
        <>
            <Input value={search} onChange={(e) => setSearch(e.target.value)}/>
            <SearchSelect defaultValue={selectedLanguage} displayValue="language"
                          options={languages} onChange={onChange}/>
        </>
    );
};

export default Test;