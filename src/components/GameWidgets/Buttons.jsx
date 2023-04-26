import PropTypes from "prop-types";

import spbw from "../../utils/spbw";
import quitImg from '../../assets/img/quit.png';
import flagImg from '../../assets/img/flag.png';
import zoomInImg from '../../assets/img/zoomIn.png';
import zoomOutImg from '../../assets/img/zoomOut.png';

import cls from './buttons.module.css';

function Buttons({ events }) {
    return (
        <div className="widget-group">
            <button className={spbw('btn-game', cls.btn)} onClick={events?.quit} title="Quit">
                <img src={quitImg} alt="X" className="img-inv" />
            </button>
            <button className={spbw('btn-game', cls.btn)} onClick={events?.goToStart} title="Go to the Start">
                <img src={flagImg} alt="Flag" className="img-inv" />
            </button>
            <button className={spbw('btn-game', cls.btn)} onClick={events?.zoomIn} title="Zoom In">
                <img src={zoomInImg} alt="+" className="img-inv" />
            </button>
            <button className={spbw('btn-game', cls.btn)} onClick={events?.zoomOut} title="Zoom Out">
                <img src={zoomOutImg} alt="-" className="img-inv" />
            </button>
        </div>
    );
}
Buttons.propTypes = {
    events: PropTypes.object
};
Buttons.defaultProps = {
    events: {}
};

export default Buttons;
