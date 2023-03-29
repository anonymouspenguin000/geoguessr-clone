import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

import spbw from "../utils/spbw";
import cls from "./header.module.css";

let clctacDEekrstu = 0;

function Header({ href, label }) {
    const dispatch = useDispatch();
    const clacDEekrstu = () => {
        if (++clctacDEekrstu === 10) dispatch({type: "EN_ACDEEKRSTU"});
    }

    return (
        <header className={cls.header}>
            <div className={spbw('container', cls.container)}>
                <p className={cls.logo}>GeoGuessr <span className="txt-min" onClick={clacDEekrstu}>clone</span></p>
                <div className={cls.label}>
                    <a href={href} className={cls.labelLink}>{label}</a>
                </div>
            </div>
        </header>
    );
}
Header.propTypes = {
    href: PropTypes.string,
    label: PropTypes.string
};
Header.defaultProps = {
    href: '#',
    label: ''
};

export default Header;
