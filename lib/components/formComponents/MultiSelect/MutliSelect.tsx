import styles from './MultiSelect.module.scss';
import {Multiselect} from 'multiselect-react-dropdown';
import {CSSProperties, InputHTMLAttributes, useRef, useEffect} from 'react';
import {IMultiselectProps} from 'multiselect-react-dropdown/dist/multiselect/interface';
import {UseFormSetValue} from 'react-hook-form/dist/types/form';

const style: { [key: string]: CSSProperties } = {

    multiselectContainer: { // To change css for multiselect (Width,height,etc..)
        textTransform: 'capitalize'
    },
    searchBox: { // To change search box element look
        minHeight: '50px',
        border: 'none',
        marginBottom: '1px'
    },
    inputField: { // To change input field position or margin
        padding: '8px',
        fontSize: '1rem',
        backgroundColor: 'var(--bg)',
        color: 'var(--bg-contrast-text)'
    },
    chips: { // To change css chips(Selected options)
        backgroundColor: 'var(--acc-inactive)',
        borderRadius: '8px'
    },
    optionContainer: { // To change css for option container
        //animate opacity
        border: 'none',
        borderRadius: 0,
        backgroundColor: 'var(--bg-nav)'
    },
    option: { // To change css for dropdown options
        backgroundColor: 'var(--bg-nav)',
    },
    groupHeading: { // To chanage group heading style

    }
};

interface MultiSelectProps extends InputHTMLAttributes<HTMLInputElement> {
    setValue?: UseFormSetValue<any>;
}

export default function MultiSelect(props: MultiSelectProps & IMultiselectProps) {
    const {
        name = '',
        onChange = undefined,
        onBlur = undefined,
        setValue,
        ...restOfProps
    } = props;
    const ref = useRef<null | Multiselect>(null);

    useEffect(() => {
        if (setValue && ref.current) setValue(name, ref.current?.getSelectedItems());
    }, [])

    const handleChange = () => {
        if (!!setValue && !name) throw new Error('MultiSelect: name is required when using setValue');
        setValue?.(name, ref.current?.getSelectedItems());
    };

    return <div className={styles.multiSelectContainer}>
        <Multiselect onRemove={handleChange} onSelect={handleChange} {...restOfProps}
                     ref={ref}
                     className={styles.multiSelect}
                     style={style}/>
        <div className={styles.whiteLine}/>
        <div className={styles.line}/>
    </div>;
}