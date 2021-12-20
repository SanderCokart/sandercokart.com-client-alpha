import type {GetServerSidePropsContext} from 'next';
import axios from '../shared/axios';

export const requirePageAuth = async ({ req, res }: GetServerSidePropsContext) => {
    try {
        const { data: user, status } = await axios.get(`http://192.168.2.160:80/user`, {
            headers: {
                accept: 'application/json',
                referer: 'http://192.168.2.160:3000/',
                cookie: req.headers.cookie
            }
        });
        if (status === 200) {
            return user;
        }
    } catch (error) {
        console.error(error);
        return null;
    }


    // const csrf = await fetch(`http://192.168.2.160:80/sanctum/csrf-cookie`);
    // res.setHeader('set-cookie', csrf.headers.raw()['set-cookie']);

    return null;
};