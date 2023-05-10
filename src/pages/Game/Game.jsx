import {useState, useRef, useEffect} from 'react';

import GameResultsGoogle from '../../components/GameResultsGoogle/GameResultsGoogle';
import GameUIGoogle from '../../components/GameUIGoogle/GameUIGoogle';
import PanoramaGoogle from '../../components/PanoramaGoogle/PanoramaGoogle';

import readableTime from '../../utils/readable/readable-time';
import mapMarkers from '../../utils/map-markers';

import eventConfig from '../../config/events.json';
import cls from './game.module.css';

window.addEventListener(eventConfig.gQuit, () => {
    window.location.href = '/';
});

function Game() {
    const getParams = ['region', 'timer', 'compass'].reduce(
        (res, curr) => ({
            ...res,
            params: {
                ...res.params,
                [curr]: res.native.get(curr)
            }
        }),
        {params: {}, native: new URLSearchParams(window.location.search)}
    ).params;

    const utils = useRef({
        compass: {
            shown: getParams.compass === 'on',
            setAngle(angle) {
                if (this.ref?.current) this.ref.current.style.transform = `rotate(${angle}deg)`;
            }
        },
        timer: {
            shown: getParams.timer === 'on',
            time: 0,
            gts: -Infinity,
            itvId: -1,
            nextSec() {
                this.time++;
                if (this.ref?.current) this.ref.current.innerHTML = readableTime(this.time);
            }
        }
    }).current;
    utils.compass.ref = useRef();
    utils.timer.ref = useRef();

    const markers = useRef(mapMarkers()).current;

    const realPos = useRef(null);
    const [guessPos, setGuessPos] = useState(null);
    const [gameEnd, setGameEnd] = useState(false);

    useEffect(() => {
        window.onbeforeunload = () => true;
    }, []);

    return (
        <div className={cls.game}>
            {gameEnd
                ? <GameResultsGoogle
                    classNames={{minimap: cls.minimap}}
                    {...{getParams, utils, realPos, guessPos, markers}}
                />
                : <>
                    <GameUIGoogle
                        classNames={{game_ui: cls.ui, minimap: cls.minimap, place_point: cls.place_point}}
                        {...{getParams, utils, realPos, guessPos, markers, setGuessPos, setGameEnd}}
                    />
                    <PanoramaGoogle
                        className={cls.pano}
                        {...{getParams, utils, realPos}}
                    />
                </>
            }
        </div>
    );
}

export default Game;
