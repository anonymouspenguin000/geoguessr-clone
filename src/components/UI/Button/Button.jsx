import PropTypes from 'prop-types';

import spbw from '../../../utils/spbw';
import cls from './button.module.css';

function Button({ className, children, ...props}) {
    return (
        <button className={spbw(cls.button, className)} {...props}>{children}</button>
    );
}

Button.propTypes = {
    className: PropTypes.string
};
Button.defaultProps = {
    className: ''
};

export default Button;
