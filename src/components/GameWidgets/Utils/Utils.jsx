import PropTypes from "prop-types";

import spbw from "../../../utils/spbw";

import compassImg from '../../../assets/img/compass.png';
import timerImg from '../../../assets/img/timer.png';

import cls from './utils.module.css';

function Utils({ className, utilData }) {
    return (
        <div className={spbw('widget-group', className)}>
            {utilData?.compass?.shown && <div className="widget-card">
                <img src={compassImg} alt="Compass" ref={utilData.compass.ref} />
            </div>}
            {utilData?.timer?.shown && <div className={spbw('widget-card', cls.timer)}>
                <img src={timerImg} alt="Timer" className="img-inv"/>
                <span ref={utilData.timer.ref}>00:00:00</span>
            </div>}
        </div>
    );
}
Utils.propTypes = {
    className: PropTypes.string,
    utilData: PropTypes.object
};
Utils.defaultProps = {
    className: '',
    utilData: {}
};

export default Utils;
