import {faBell} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import type {PropsWithChildren} from '@/types/CustomTypes';

const Test = ({ children }: PropsWithChildren) => {

    return (
        <>
            <FontAwesomeIcon icon={faBell}/>
        </>
    );
};

export default Test;