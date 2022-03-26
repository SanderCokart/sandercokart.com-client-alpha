import RecentArticles from '@/components/pages/home/RecentArticles';
import styles from '@/styles/pages/home/Home.module.scss';
import {GetStaticProps} from 'next';
import axios from '@/functions/shared/axios';
import {SWRConfig} from 'swr';

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
            <SWRConfig value={{ fallback: { ...props.fallbacks.posts } }}>
                <RecentArticles title="posts" url="/articles/posts/recent"/>
            </SWRConfig>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const { data: postsData } =
        await axios.simpleGet(process.env.NEXT_PUBLIC_API_URL + '/articles/posts/recent');
    const { data: tipsAndTutorialsData } =
        await axios.simpleGet(process.env.NEXT_PUBLIC_API_URL + '/articles/tips-&-tutorials/recent');
    const { data: CoursesData } =
        await axios.simpleGet(process.env.NEXT_PUBLIC_API_URL + '/articles/courses');

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
