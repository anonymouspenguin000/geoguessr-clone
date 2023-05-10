import PropTypes from 'prop-types';

import regionImg from '../../../assets/img/region.png';
import gameConfig from '../../../config/game.json';

function Info({ info }) {
    return (
        <div className="widget-group">
            <div className="widget-card">
                <img src={regionImg} alt="Region" className="img-inv" />
                <span>{gameConfig.regionNames[info?.region || '']}</span>
            </div>
        </div>
    );
}
Info.propTypes = {
    info: PropTypes.object
};
Info.defaultProps = {
    info: {}
};

export default Info;
