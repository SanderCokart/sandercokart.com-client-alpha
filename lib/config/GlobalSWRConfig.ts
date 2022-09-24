import type {SWRConfiguration} from 'swr';

import axios from '@/functions/shared/axios';

export default {
    fetcher: (url: string) => axios.get(url).then(response => response.data),
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    onError: (err: any) => {
        //generic toast() errors
    }
} as SWRConfiguration;
