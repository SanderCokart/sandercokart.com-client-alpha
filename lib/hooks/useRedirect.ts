import {useRouter} from 'next/router';

const useRedirect = (url: string, withQuery?: boolean) => {
    const router = useRouter();
    setTimeout(() => {
        router.replace({ pathname: url, query: withQuery ? router.query : null });
    }, 5000);
};

export default useRedirect;