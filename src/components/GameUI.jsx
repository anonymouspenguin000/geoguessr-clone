import PropTypes from "prop-types";

import Utils from './GameWidgets/Utils';
import Info from './GameWidgets/Info';
import Buttons from "./GameWidgets/Buttons";
import Minimap from "./GameWidgets/Minimap";

import readableTime from "../utils/readable/readable-time";

const utils = {
    compass: {
        shown: true,
        angle: 0,
        ref: null,
        setRef(r) {
            this.ref = r;
        }
    },
    timer: {
        shown: true,
        time: 0,
        ref: null,
        setRef(r) {
            this.ref = r;
        }
    }
};

// <Temp>
setInterval(() => utils.timer.ref?.current && (utils.timer.ref.current.innerHTML = readableTime(++utils.timer.time)), 1000);
setInterval(() => utils.compass.ref?.current && (utils.compass.ref.current.style.transform = `rotate(${utils.compass.angle += 5}deg)`), 20);
// </Temp>

function GameUI({ className }) {
    return (
        <div className={className}>
            <div className="widget-row">
                <Utils
                    className={!Object.values(utils || {}).some(el => el?.shown) ? 'invisible' : ''}
                    utilData={utils}
                />
                <Info infoData={{region: 'wrl'}} />
            </div>
            <div className="widget-row widget-row-bottom">
                <Buttons />
                <Minimap />
            </div>
        </div>
    );
}
GameUI.propTypes = {
    className: PropTypes.string
};
GameUI.defaultProps = {
    className: ''
};

export default GameUI;
