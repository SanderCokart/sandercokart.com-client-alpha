import {useApi} from '@/providers/ApiProvider';
import type {User} from '@/types/ModelTypes';
import useSWR from 'swr';

const UseUsers = () => {
    const api = useApi();
    const fetcher = (url: string) => api.get(url).then(res => res.data);
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/users`, fetcher, {
        refreshInterval: 0,
        revalidateOnFocus: false
    });

    return {
        users: data?.users as User[],
        isLoading: !error && !data,
        isError: error
    };
};

export default UseUsers;