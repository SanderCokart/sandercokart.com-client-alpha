import type {GetStaticProps} from 'next';

import RecentArticles from '@/components/pages/home/RecentArticles';

import {ApiGetArticlesRecentRoute} from '@/constants/api-routes';

import axios from '@/functions/shared/axios';

import styles from '@/styles/pages/Home.module.scss';


interface HomeProps {
    fallbacks: {
        posts: any;
        courses: any;
        tipsAndTutorials: any;
    };
}

const HomePage = (props: HomeProps) => {
    return (
        <div className={styles.home}>
            {/*<RecentArticles fallback={{ ...props.fallbacks.posts }}*/}
            {/*                url={ApiGetArticlesRecentRoute('posts')}/>*/}
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const { data: postsData } =
        await axios.simpleGet(process.env.NEXT_PUBLIC_API_URL + ApiGetArticlesRecentRoute('posts'));
    const { data: tipsAndTutorialsData } =
        await axios.simpleGet(process.env.NEXT_PUBLIC_API_URL + ApiGetArticlesRecentRoute('tips-&-tutorials'));
    const { data: CoursesData } =
        await axios.simpleGet(process.env.NEXT_PUBLIC_API_URL + ApiGetArticlesRecentRoute('courses'));

    return {
        props: {
            fallbacks: {
                posts: {
                    '/articles/posts/recent': postsData
                }
            }
        }
    };
};

export default HomePage;
