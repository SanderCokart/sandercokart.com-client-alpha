import type {FC} from 'react';
import Link from 'next/link';

export const Recent: FC = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-evenly', fontSize: '24px'}}>
            blog/recent
            <Link href="/login">
                <a>login</a>
            </Link>
            <Link href="/account">
                <a>Account</a>
            </Link>
        </div>
    );
};

export default Recent;
