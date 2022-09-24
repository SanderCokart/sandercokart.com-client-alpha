import {useRouter} from 'next/router';

const useRedirect = ({ url, withQuery, timeout }: { url: string, withQuery?: boolean, timeout?: number; }) => {
    const router = useRouter();
    setTimeout(() => {
        router.replace({ pathname: url, query: withQuery ? router.query : null });
    }, timeout);
};

export default useRedirect;