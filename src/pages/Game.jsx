import {useState, useRef, useEffect} from 'react';

import GameResultsGoogle from "../components/GameResultsGoogle";
import GameUIGoogle from "../components/GameUIGoogle";
import PanoramaGoogle from "../components/PanoramaGoogle";

import readableTime from "../utils/readable/readable-time";

import eventValues from '../config/events.json';
import cls from './game.module.css';

window.addEventListener(eventValues.gQuit, () => {
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

    const markers = useRef([]);
    const realPos = useRef();

    const [guessPos, setGuessPos] = useState(null);
    const [gameEnd, setGameEnd] = useState(false);

    useEffect(() => {
        window.onbeforeunload = () => true;
    }, []);

    const removeAllPins = () => {
        markers.current.forEach(el => el.setMap(null));
        markers.current = [];
    }
    const placePin = (map, position, icon, url) => {
        const marker = new window.google.maps.Marker({map, position, icon});
        markers.current.push(marker);
        if (url) marker.addListener('click', () => {
            const lnk = document.createElement('a');
            lnk.href = url;
            lnk.target = '_blank';
            lnk.click();
        });
    }
    const setZoom = (pano, zoom, incr = false) => pano.setZoom(incr ? pano.getZoom() + zoom : zoom);

    return (
        <div className={cls.game}>
            {gameEnd
                ? <GameResultsGoogle
                    classNames={{minimap: cls.minimap}}
                    getParams={getParams}
                    utils={utils}
                    realPos={realPos}
                    guessPos={guessPos}
                    mapData={{removeAllPins, placePin, markers}}
                />
                : <GameUIGoogle
                    classNames={{game_ui: cls.ui, minimap: cls.minimap, place_point: cls.place_point}}
                    getParams={getParams}
                    utils={utils}
                    realPos={realPos}
                    guessPos={guessPos}
                    mapData={{removeAllPins, placePin, markers}}
                    setGuessPos={setGuessPos}
                    setGameEnd={setGameEnd}
                />
            }
            {!gameEnd && <PanoramaGoogle
                className={cls.pano}
                getParams={getParams}
                utils={utils}
                realPos={realPos}
                mapData={{setZoom}}
            />}
        </div>
    );
}

export default Game;
