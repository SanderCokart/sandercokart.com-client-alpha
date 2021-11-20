import styles from '@/styles/components/Navigation.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import type {FC} from 'react';
import {useRef} from 'react';

const Navigation: FC = () => {
        const compassNav = useRef<null | HTMLButtonElement>(null);
        const blogNav = useRef<null | HTMLButtonElement>(null);

        const openNav = () => {
            compassNav.current?.classList.toggle(styles.focus);
        };

        const openBlogNav = () => {
            blogNav.current?.classList.toggle(styles.focus);
            compassNav.current?.classList.toggle(styles.removeFocus);
            Array.from(compassNav.current?.nextElementSibling?.children ?? [])
                .forEach(item => {
                    if (item !== blogNav.current && item !== blogNav.current?.nextElementSibling)
                        item.classList.toggle(styles.removeFocus);
                });
        };

        const navigate = () => {
            blogNav.current?.classList.remove(styles.focus);
            compassNav.current?.classList.remove(styles.removeFocus, styles.focus);
            Array.from(compassNav.current?.nextElementSibling?.children ?? [])
                .forEach(item => {
                    if (item !== blogNav.current && item !== blogNav.current?.nextElementSibling)
                        item.classList.remove(styles.removeFocus);
                });
        };

        return (
            <div className={styles.fixed}>
                <div className={styles.relative}>
                    <button ref={compassNav} className={styles.navItem} onClick={openNav}>
                        <FontAwesomeIcon icon="compass"/>
                    </button>

                    <div className={styles.navContainer}>
                        <Link href="/settings">
                            <a className={styles.navItem} data-name="settings" onClick={navigate}>
                                <FontAwesomeIcon icon="cog"/><span>Settings</span>
                            </a>
                        </Link>
                        <Link href="/portfolio">
                            <a className={styles.navItem} data-name="portfolio" onClick={navigate}>
                                <FontAwesomeIcon icon="portrait"/><span>Portfolio</span>
                            </a>
                        </Link>

                        <button ref={blogNav} className={styles.navItem} data-name="blog" onClick={openBlogNav}>
                            <FontAwesomeIcon icon="rss"/><span>Blog</span>
                        </button>
                        <div className={styles.blogContainer}>
                            <Link href="/blog/recent">
                                <a className={styles.navItem} data-name="recent" onClick={navigate}>
                                    <FontAwesomeIcon icon="history"/><span>Recent</span>
                                </a>
                            </Link>
                            <Link href="/blog/search">
                                <a className={styles.navItem} data-name="search" onClick={navigate}>
                                    <FontAwesomeIcon icon="search"/><span>Search</span>
                                </a>
                            </Link>
                            <Link href="/blog/post/create">
                                <a className={styles.navItem} data-name="create" onClick={navigate}>
                                    <FontAwesomeIcon icon="plus"/><span>Create</span>
                                </a>
                            </Link>
                        </div>

                        <Link href="/gallery">
                            <a className={styles.navItem} data-name="gallery" onClick={navigate}>
                                <FontAwesomeIcon icon="images"/><span>Gallery</span>
                            </a>
                        </Link>
                        <Link href="/contact">
                            <a className={styles.navItem} data-name="contact" onClick={navigate}>
                                <FontAwesomeIcon icon="envelope"/><span>Contact</span>
                            </a>
                        </Link>
                    </div>

                    <div className={styles.backdrop}/>

                </div>
            </div>
        );
    }
;

export default Navigation;