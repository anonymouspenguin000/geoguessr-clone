import PropTypes from "prop-types";

import spbw from "../../utils/spbw";
import cls from './dropdown.module.css';

function Dropdown({ className, optionList, ...props }) {
    return (
        <div className={spbw(cls.dropdown, className)}>
            <select {...props}>
                {optionList.map(item => <option key={item[0]} value={item[0]}>{item[1]}</option>)}
            </select>
        </div>
    );
}

Dropdown.propTypes = {
    className: PropTypes.string,
    optionList: PropTypes.array
};
Dropdown.defaultProps = {
    className: '',
    optionList: []
};

export default Dropdown;
