import {Wrapper} from '@googlemaps/react-wrapper';
import {useState, useRef, useEffect} from 'react';

import GameUI from '../components/GameUI';
import GameResults from "../components/GameResults";
import Map from "../components/UI/Map";

import readableTime from "../utils/readable/readable-time";
import spbw from "../utils/spbw";
import geoUrl from "../utils/geo-url";
import arrToLLObj from "../utils/arr-to-ll-obj";
import genRandomCoords from "../utils/gen-random-coords";

import guessPin from '../assets/img/guess-pin.png';
import realPin from '../assets/img/real-pin.png';

import api from '../config/api';
import storageValues from '../config/storage.json';
import eventValues from '../config/events.json';
import cls from './game.module.css';

// <Temp>
//const realPos = [42.345573, -71.098326];
//const realPos = [48.156692, 11.399507];
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
    //const panoLoaded = useRef(false);

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
                ? <GameResults
                    data={{
                        region: getParams.region,
                        realPos: realPos.current,
                        time: utils.timer.time,
                        guessPos
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
                                placePin(map, arrToLLObj(realPos.current), realPin, geoUrl(realPos.current));

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
                                    zoomControl: true,
                                    controlSize: 30
                                }}
                                onMount={map => {
                                    map.addListener('click', evt => {
                                        const pos = evt.latLng;
                                        removeAllPins();
                                        placePin(map, pos, guessPin);
                                        setGuessPos([+pos.lat(), +pos.lng()]);
                                    });
                                }}
                            />
                        </Wrapper>,
                        guessDisabled: !guessPos,
                        onGuess() {
                            if (!realPos.current || !window.confirm('Are you sure?')) return;
                            clearInterval(utils.timer.itvId);

                            utils.timer.gts = Date.now();

                            const last = JSON.parse(localStorage.getItem(storageValues.hist) || '[]');
                            const params = JSON.parse(localStorage.getItem(storageValues.pref) || '{}');
                            if (!params.pauseProgress) localStorage.setItem(storageValues.hist, JSON.stringify([...last, {
                                rg: getParams.region,
                                gp: guessPos,
                                rp: realPos.current,
                                tm: utils.timer.time,
                                dt: utils.timer.gts
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
                            if (!realPos.current) return;
                            window.dispatchEvent(new CustomEvent(eventValues.gGoToStart));
                        },
                        zoomIn() {
                            if (!realPos.current) return;
                            window.dispatchEvent(new CustomEvent(eventValues.gZoomIn));
                        },
                        zoomOut() {
                            if (!realPos.current) return;
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
                            pov: {
                                heading: Math.random() * 360,
                                pitch: 0
                            },
                            showRoadLabels: false,
                            disableDefaultUI: true,
                            linksControl: true
                        }}
                        onMount={pano => {
                            const svSvc = new window.google.maps.StreetViewService();

                            function getRandomLocation(n = 1) {
                                if (n <= 0) return;
                                console.log(n);
                                svSvc.getPanorama({
                                    location: arrToLLObj(genRandomCoords(getParams.region)),
                                    radius: 10000
                                }).then(({ data }) => {
                                    const loc = data.location;
                                    if (!data.links.length) return getRandomLocation(n);
                                    console.log(loc);
                                    realPos.current = [loc.latLng.lat(), loc.latLng.lng()];
                                    pano.setPano(loc.pano);
                                    pano.setZoom(0);
                                    utils.timer.itvId = setInterval(() => utils.timer.nextSec(), 1000);
                                }).catch((e => e.code === 'ZERO_RESULTS' && getRandomLocation(n - 1)));
                            }
                            getRandomLocation(10);

                            pano.addListener('pov_changed', () => utils.compass.setAngle(360 - pano.getPov().heading));
                            window.addEventListener(eventValues.gGoToStart, () => pano.setPosition(arrToLLObj(realPos.current)));
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
