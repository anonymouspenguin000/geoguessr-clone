import PropTypes from "prop-types";

import Utils from './GameWidgets/Utils';
import Info from './GameWidgets/Info';
import Buttons from "./GameWidgets/Buttons";
import Minimap from "./GameWidgets/Minimap";

function GameUI({className, utils, minimap}) {
    return (
        <div className={className}>
            <div className="widget-row">
                <Utils
                    className={!Object.values(utils || {}).some(el => el?.shown) ? 'invisible' : ''}
                    utilData={utils}
                />
                <Info infoData={{region: 'wrl'}}/>
            </div>
            <div className="widget-row widget-row-bottom">
                <Buttons/>
                <Minimap {...minimap} />
            </div>
        </div>
    );
}

GameUI.propTypes = {
    className: PropTypes.string,
    utils: PropTypes.object,
    minimap: PropTypes.object
};
GameUI.defaultProps = {
    className: '',
    utils: {},
    minimap: {}
};

export default GameUI;
