import {useEffect, useState} from 'react';

type BasicOptions = 'down' | 'up';

type MoreOptions = 'between';

type Sizes = { xs: string, sm: string, md: string, lg: string, xl: string, [key: string]: string };

interface BasicMediaQuery {
    from: keyof Sizes;
    option: BasicOptions;
}

interface AdvancedMediaQuery {
    from: keyof Sizes;
    option: MoreOptions;
    to: keyof Sizes;
}

const sizes: Sizes = {
    xs: '0px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1536px'
};

function useMediaQuery(options: BasicMediaQuery | AdvancedMediaQuery = { from: 'xs', option: 'up' }) {
    const [matches, setMatches] = useState(false);

    const getQuery = () => {
        switch (options.option) {
            case 'down':
                return `all and (max-width: ${sizes[options.from]})`;
            case 'between':
                return `all and (min-width: ${sizes[options.from]}) and (max-width: ${options.to})`;
            default:
                return `all and (min-width: ${sizes[options.from]})`;
        }
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia(getQuery());

        const handler = () => setMatches(mediaQuery.matches);
        mediaQuery.addEventListener('change', handler);

        return () => {
            mediaQuery.removeEventListener('change', handler);
        };
    }, [matches]);


    return matches;
}

export default useMediaQuery;