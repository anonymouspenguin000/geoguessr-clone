import PropTypes from "prop-types";

import Utils from '../GameWidgets/Utils/Utils';
import Info from '../GameWidgets/Info/Info';
import Buttons from "../GameWidgets/Buttons/Buttons";
import Minimap from "../GameWidgets/Minimap/Minimap";

function GameUI({ className, utils, minimap, infoData, buttonEvents }) {
    return (
        <div className={className}>
            <div className="widget-row">
                <Utils
                    className={!Object.values(utils || {}).some(el => el?.shown) ? 'invisible' : ''}
                    utilData={utils}
                />
                <Info infoData={infoData}/>
            </div>
            <div className="widget-row widget-row-bottom">
                <Buttons events={buttonEvents} />
                <Minimap {...minimap} />
            </div>
        </div>
    );
}

GameUI.propTypes = {
    className: PropTypes.string,
    utils: PropTypes.object,
    minimap: PropTypes.object,
    infoData: PropTypes.object,
    buttonEvents: PropTypes.object
};
GameUI.defaultProps = {
    className: '',
    utils: {},
    minimap: {},
    infoData: {},
    buttonEvents: {}
};

export default GameUI;
