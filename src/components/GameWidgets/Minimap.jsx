import {useState, useRef} from 'react';
import PropTypes from "prop-types";

import Button from "../UI/Button";

import spbw from "../../utils/spbw";

import biggerImg from '../../assets/img/minimap-bigger.png';
import smallerImg from '../../assets/img/minimap-smaller.png';
import collapseImg from '../../assets/img/toggle-minimap.png';

import gameValues from '../../config/game.json';
import cls from './minimap.module.css';

const mmPatterns = gameValues.minimapPatterns;

function Minimap({ children, guessDisabled, onGuess }) {
    const btnRowRef = useRef();
    const [mmCollapsed, setMmCollapsed] = useState(false);
    const [mmPattern, setMmPattern] = useState(0);

    return (
        <div className={spbw('widget-group', cls.minimap)} style={{
            '--mm-wid': mmPatterns[mmPattern].w,
            '--mm-hgt': mmCollapsed ? window.getComputedStyle(btnRowRef.current).height : mmPatterns[mmPattern].h
        }}>
            <div className={cls.btn_row} ref={btnRowRef}>
                <div>
                    <button
                        className={spbw('btn-game', cls.tool_btn)}
                        onClick={() => setMmPattern(Math.min(mmPattern + 1, mmPatterns.length - 1))}
                        title="Bigger"
                    >
                        <img src={biggerImg} alt="+" />
                    </button>
                    <button
                        className={spbw('btn-game', cls.tool_btn)}
                        onClick={() => setMmPattern(Math.max(mmPattern - 1, 0))}
                        title="Smaller"
                    >
                        <img src={smallerImg} alt="-" />
                    </button>
                </div>
                <div>
                    <span className={spbw(cls.flippable, mmCollapsed && cls.flippable_flipped)}>
                        <button
                            className={spbw('btn-game', cls.tool_btn)}
                            onClick={() => setMmCollapsed(!mmCollapsed)}
                            title="Collapse"
                        >
                            <img src={collapseImg} alt="v" />
                        </button>
                    </span>
                </div>
            </div>
            <div className={cls.map}>{children}</div>
            <div>
                <Button className="btn-block" disabled={guessDisabled} onClick={onGuess}>Guess</Button>
            </div>
        </div>
    );
}
Minimap.propTypes = {
    guessDisabled: PropTypes.bool,
    onGuess: PropTypes.func
};
Minimap.defaultProps = {
    guessDisabled: true,
    onGuess: () => {}
};

export default Minimap;
