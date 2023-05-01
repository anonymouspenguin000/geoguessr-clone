import {useState} from "react";
import PropTypes from "prop-types";

import Dropdown from "./UI/Dropdown";
import Button from "./UI/Button";
import Checkbox from "./UI/Checkbox";

import spbw from "../utils/spbw";

import gameValues from '../config/game.json';
import cls from './enter-game.module.css';

function EnterGame({ className }) {
    const [pressTimeout, setPressTimeout] = useState(-1);
    const [prefOpened, setPrefOpened] = useState(false);
    const [expOpened, setExpOpened] = useState(false);

    const prefBtnDown = () => {
        setPressTimeout(setTimeout(() => {
            if (expOpened) return;
            setExpOpened(true);
            setPressTimeout(-1);
        }, 2000));
    };
    const prefBtnClick = evt => {
        clearTimeout(pressTimeout);
        if (pressTimeout + 1) {
            if (prefOpened) {
                setPrefOpened(false);
                setExpOpened(false);
            } else setPrefOpened(true);
        }
        evt.preventDefault();
    };

    return (
        <div className={spbw(cls.enter_game, className)}>
            <form action="/game" method="get">
                <Dropdown className={cls.form_item} optionList={Object.entries(gameValues.regionNames)} name="region" />
                <fieldset hidden={!expOpened} className={spbw('fieldset', cls.form_item)}>
                    <legend className="fieldset-legend">Experiments</legend>
                    {/*<label className="fieldset-item">*/}
                    {/*    <Checkbox name="smlscrn" className="checkbox checkbox-mr"/>*/}
                    {/*    Small screen*/}
                    {/*</label>*/}
                    Empty :(
                </fieldset>
                <fieldset hidden={!prefOpened} className={spbw('fieldset', cls.form_item)}>
                    <legend className="fieldset-legend">Preferences</legend>
                    <label className="fieldset-item">
                        <Checkbox name="compass" className="checkbox checkbox-mr"/>
                        Compass
                    </label>
                    <label className="fieldset-item">
                        <Checkbox name="timer" defaultChecked={true} className="checkbox checkbox-mr"/>
                        Timer
                    </label>
                </fieldset>
                <div className={cls.form_item}>
                    <Button
                        className="block"
                        onPointerDown={prefBtnDown}
                        onClick={prefBtnClick}
                        onContextMenu={() => false}
                    >
                        Preferences...
                    </Button>
                </div>
                <div className={cls.form_item}>
                    <Button type="submit" className="special block">Start</Button>
                </div>
            </form>
        </div>
    );
}

EnterGame.propTypes = {
    className: PropTypes.string
};
EnterGame.defaultProps = {
    className: ''
}

export default EnterGame;
