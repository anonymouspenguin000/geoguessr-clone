import PropTypes from 'prop-types';

import spbw from '../../../utils/spbw';

function Checkbox({className, ...props}) {
    return (
        <input type="checkbox" className={spbw('checkbox', className)} {...props} />
    );
}

Checkbox.propTypes = {
    className: PropTypes.string
};
Checkbox.defaultProps = {
    className: ''
};

export default Checkbox;
