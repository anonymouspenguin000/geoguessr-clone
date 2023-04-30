import {Wrapper} from '@googlemaps/react-wrapper';
import {useState, useRef, useEffect} from 'react';

import GameUI from '../components/GameUI';
import GameResults from "../components/GameResults";
import Map from "../components/UI/Map";

import readableTime from "../utils/readable/readable-time";
import spbw from "../utils/spbw";
import geoUrl from "../utils/geo-url";
import arrToLLObj from "../utils/arrToLLObj";

import guessPin from '../assets/img/guess-pin.png';
import realPin from '../assets/img/real-pin.png';

import api from '../config/api';
import storageValues from '../config/storage.json';
import eventValues from '../config/events.json';
import cls from './game.module.css';

// <Temp>
const realPos = [42.345573, -71.098326];
// </Temp>

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
    const [panoLoaded, setPanoLoaded] = useState(false);

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
                ? <GameResults
                    className={cls.results}
                    data={{
                        region: getParams.region,
                        guessPos, realPos,
                        time: utils.timer.time
                    }}
                    map={<Wrapper apiKey={api.googleMapsApiKey}>
                        <Map
                            className={cls.minimap}
                            options={{
                                center: {lat: 0, lng: 0},
                                minZoom: 1,
                                zoom: 1,
                                disableDefaultUI: true
                            }}
                            onMount={map => {
                                removeAllPins();
                                placePin(map, arrToLLObj(guessPos), guessPin, geoUrl(guessPos));
                                placePin(map, arrToLLObj(realPos), realPin, geoUrl(realPos));

                                let mapLoaded = false;

                                map.addListener('tilesloaded', () => {
                                    if (mapLoaded) return;
                                    setTimeout(() => {
                                        const bounds = new window.google.maps.LatLngBounds();
                                        markers.current.forEach(m => bounds.extend(m.position));
                                        map.fitBounds(bounds);
                                    }, 1000);
                                    mapLoaded = true;
                                });
                            }}
                        />
                    </Wrapper>}
                />
                : <GameUI
                    className={cls.ui}
                    utils={utils}
                    minimap={{
                        children: <Wrapper apiKey={api.googleMapsApiKey}>
                            <Map
                                className={cls.minimap}
                                options={{
                                    center: {lat: 0, lng: 0},
                                    minZoom: 2,
                                    zoom: 2,
                                    disableDefaultUI: true,
                                    mapTypeControl: true,
                                    zoomControl: true
                                }}
                                onMount={map => {
                                    map.addListener('click', evt => {
                                        const pos = evt.latLng;
                                        removeAllPins();
                                        placePin(map, pos, guessPin);
                                        setGuessPos([pos.lat(), pos.lng()]);
                                    });
                                }}
                            />
                        </Wrapper>,
                        guessDisabled: !guessPos,
                        onGuess() {
                            if (!panoLoaded || !window.confirm('Are you sure?')) return;
                            clearInterval(utils.timer.itvId);

                            utils.timer.gts = Date.now();

                            const last = JSON.parse(localStorage.getItem(storageValues.hist) || '[]');
                            localStorage.setItem(storageValues.hist, JSON.stringify([...last, {
                                rg: getParams.region,
                                gp: guessPos,
                                rp: realPos,
                                tm: utils.timer.gts
                            }]));

                            window.onbeforeunload = null;
                            setGameEnd(true);
                        }
                    }}
                    buttonEvents={{
                        quit() {
                            window.dispatchEvent(new CustomEvent(eventValues.gQuit));
                        },
                        goToStart() {
                            window.dispatchEvent(new CustomEvent(eventValues.gGoToStart));
                        },
                        zoomIn() {
                            window.dispatchEvent(new CustomEvent(eventValues.gZoomIn));
                        },
                        zoomOut() {
                            window.dispatchEvent(new CustomEvent(eventValues.gZoomOut));
                        }
                    }}
                    infoData={{
                        region: getParams.region
                    }}
                />
            }
            {!gameEnd && <div className={cls.pano}>
                <Wrapper apiKey={api.googleMapsApiKey}>
                    <Map
                        type="pano"
                        className={spbw(cls.pano, 'pano-no-spoilers')}
                        options={{
                            position: arrToLLObj(realPos),
                            pov: {
                                heading: Math.random() * 360,
                                pitch: 0
                            },
                            showRoadLabels: false,
                            disableDefaultUI: true,
                            linksControl: true
                        }}
                        onMount={pano => {
                            pano.addListener('pano_changed', () => {
                                if (panoLoaded) return;
                                pano.setZoom(0);
                                utils.timer.itvId = setInterval(() => utils.timer.nextSec(), 1000);
                                setPanoLoaded(true);
                            });
                            pano.addListener('pov_changed', () => utils.compass.setAngle(360 - pano.getPov().heading));
                            window.addEventListener(eventValues.gGoToStart, () => pano.setPosition(realPos));
                            window.addEventListener(eventValues.gZoomIn, () => setZoom(pano, 0.5, true));
                            window.addEventListener(eventValues.gZoomOut, () => setZoom(pano, -0.5, true));
                        }}
                    />
                </Wrapper>
            </div>}
        </div>
    );
}

export default Game;
