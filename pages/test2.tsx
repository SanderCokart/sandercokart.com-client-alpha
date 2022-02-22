import Button from '@/components/Button';
import styles from '@/styles/pages/test.module.scss';
import type {FC} from 'react';
import {useState} from 'react';
import {CSSTransition} from 'react-transition-group';

const Test2: FC = () => {
    const [activeMenu, setActiveMenu] = useState('main');
    return (
        <nav style={{position:'relative', width: '100%', height: '40px', backgroundColor:'red'}}>

        <div style={{width:'300px', backgroundColor: 'var(--bg-nav)', overflow: 'hidden', position: 'absolute', top: '100%', right: '0'}}>
            <CSSTransition unmountOnExit classNames={{
                enter: styles.dropdownMenuEnter,
                enterActive: styles.dropdownMenuEnterActive,
                exit: styles.dropdownMenuExit,
                exitActive: styles.dropdownMenuExitActive
            }} in={activeMenu === 'main'} timeout={500}>
                <ul style={{fontSize: '2rem'}}>
                    <li>This is an item - 1</li>
                    <li>This is an item - 2</li>
                    <li>This is an item - 3</li>
                </ul>
            </CSSTransition>
            <CSSTransition unmountOnExit classNames={{
                enter: styles.dropdownMenuEnterSecondary,
                enterActive: styles.dropdownMenuEnterActiveSecondary,
                exit: styles.dropdownMenuExitSecondary,
                exitActive: styles.dropdownMenuExitActiveSecondary
            }} in={activeMenu === 'secondary'} timeout={500}>
                <ul style={{fontSize: '2rem'}}>
                    <li>This is an item - 4</li>
                    <li>This is an item - 5</li>
                    <li>This is an item - 6</li>
                </ul>
            </CSSTransition>
            <Button disabled={activeMenu === 'main'} onClick={() => setActiveMenu('main')}>main</Button>
            <Button disabled={activeMenu === 'secondary'} onClick={() => setActiveMenu('secondary')}>secondary</Button>
        </div>
        </nav>

    );
};

export default Test2;