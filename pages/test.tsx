import type {FC} from 'react';
import axios from '@/functions/shared/axios';
import {useState} from 'react';

const Test = () => {
    const [state, setState] = useState(null);
    const [value, setValue] = useState('posts');
    const onClick = async () => {
        const {data} = await axios.simpleGet('/articles/' + value);
        setState(data);
    };
    return (
        <>
            <button onClick={onClick}>test articles</button>
            <select value={value} onChange={(e) => setValue(e.target.value)}>
                <option value="posts">posts</option>
                <option value="tips-&-tutorials">tips-&-tutorials</option>
                <option value="bla">bla</option>
            </select>
            {JSON.stringify(state)}
        </>
    );
};

export default Test;