import spbw from "../utils/spbw";

import cls from './footer.module.css';
import origlogo from '../assets/img/original.svg';

function Footer() {
    return (
        <footer className={cls.footer}>
            <div className={cls.part_top}>
                <div className={spbw('container', cls.container)}>
                    <div className={cls.section}>
                        <h3 className={spbw(cls.section_part, cls.section_header)}>
                            Disclaimer
                        </h3>
                        <p className={spbw(cls.section_part, cls.section_text)}>
                            I'm not a pirate. I didn't hack any sources. I don't cooperate with pirates or somebody else
                            who's bad... I just took an idea for my own and others' education/experience making web-apps
                            and working with APIs. I don't monetize this project. I encourage you to use the original.
                            Thank you for your attention.
                        </p>
                        <div className={spbw(cls.section_part, cls.section_image)}>
                            <a href="https://geoguessr.com/" target="_blank" rel="noreferrer">
                                <img src={origlogo} alt="GeoGuessr" className="footer-section__image" />
                            </a>
                        </div>
                    </div>
                    <div className={cls.section}>
                        <h3 className={spbw(cls.section_part, cls.section_header)}>
                            Contact
                        </h3>
                        <div className={spbw(cls.section_part, cls.section_list, cls.section_text)}>
                            <ul className={cls.list}>
                                <li className={cls.list_item}>
                                    E-mail:{' '}
                                    <a
                                        href="mailto:anopeng000@gmail.com"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        anopeng000@gmail.com
                                    </a>
                                </li>
                                <li className={cls.list_item}>
                                    Telegram:{' '}
                                    <a href="https://t.me/vl_pnk" target="_blank" rel="noreferrer">@vl_pnk</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className={cls.section}>
                        <h3 className={cls.section_header}>
                            Built with...
                        </h3>
                        <div className={spbw(cls.section_part, cls.section_list, cls.section_text)}>
                            <ul className={cls.list}>
                                <li className={cls.list_item}>NPM</li>
                                <li className={cls.list_item}>JavaScript</li>
                                <li className={cls.list_item}>ReactJS</li>
                                <li className={cls.list_item}>Google Maps API</li>
                                <li className={cls.list_item}>Street View API</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cls.part_bottom}>
                <div className={spbw('container', cls.container)}>
                    <p className={cls.copy}>
                        &copy; NaN undefined
                    </p>
                    <p className={cls.github}>
                        My GitHub:{' '}
                        <a
                            href="https://github.com/anonymouspenguin000"
                            target="_blank"
                            rel="noreferrer"
                        >
                            AnonymousPenguin000
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
