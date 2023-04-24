import PropTypes from "prop-types";
import {useRef} from 'react';

import spbw from "../../utils/spbw";
import readableTime from "../../utils/readable/readable-time";

import compassImg from '../../assets/img/compass.png';
import timerImg from '../../assets/img/timer.png';

import cls from './utils.module.css';

function Utils({ className, utilData }) {
    const compassRef = useRef(null);
    const timerRef = useRef(null);
    utilData?.compass?.setRef?.(compassRef);
    utilData?.timer?.setRef?.(timerRef);

    return (
        <div className={spbw('widget-group', className)}>
            {utilData?.compass?.shown && <div className="widget-card">
                <img src={compassImg} alt="Compass" ref={compassRef} />
            </div>}
            {utilData?.timer?.shown && <div className={spbw('widget-card', cls.timer)}>
                <img src={timerImg} alt="Timer" className="img-inv"/>
                <span ref={timerRef}>{readableTime(0)}</span>
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
