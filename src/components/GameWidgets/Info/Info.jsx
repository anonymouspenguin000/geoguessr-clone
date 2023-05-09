import PropTypes from "prop-types";

import regionImg from '../../../assets/img/region.png';
import gameValues from '../../../config/game.json';

function Info({ infoData }) {
    return (
        <div className="widget-group">
            <div className="widget-card">
                <img src={regionImg} alt="Region" className="img-inv" />
                <span>{gameValues.regionNames[infoData?.region || '']}</span>
            </div>
        </div>
    );
}
Info.propTypes = {
    infoData: PropTypes.object
};
Info.defaultProps = {
    infoData: {}
};

export default Info;
