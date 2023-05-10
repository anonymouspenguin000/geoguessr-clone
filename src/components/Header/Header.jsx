import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {useRef} from 'react';

import spbw from '../../utils/spbw';
import cls from './header.module.css';

function Header({ href, label }) {
    const clct = useRef(0);
    const dispatch = useDispatch();
    const clhd = () => {
        if (++clct.current === 10) dispatch({type: "EN_ACDEEKRSTU"});
    }

    return (
        <header className={cls.header}>
            <div className={spbw('container', cls.container)}>
                <p className={cls.logo}>GeoGuessr <span className="txt-min" onClick={clhd}>clone</span></p>
                <div className={cls.label}>
                    <Link to={href}>{label}</Link>
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
