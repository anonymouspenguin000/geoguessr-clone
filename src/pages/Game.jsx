import {Wrapper} from '@googlemaps/react-wrapper';
import {useState, useRef} from 'react';

import GameUI from '../components/GameUI';
import Map from "../components/UI/Map";

import readableTime from "../utils/readable/readable-time";
import spbw from "../utils/spbw";

import guessPin from '../assets/img/guess-pin.png';
//import realPin from '../assets/img/real-pin.png';

import api from '../config/api';
import eventValues from '../config/events.json';
import cls from './game.module.css';

// <Temp>
const tempLoc = {lat: 42.345573, lng: -71.098326};
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
            itvId: -1,
            nextSec() {
                this.time++;
                if (this.ref?.current) this.ref.current.innerHTML = readableTime(this.time);
            }
        }
    }).current;
    utils.compass.ref = useRef();
    utils.timer.ref = useRef();
    window.onbeforeunload = () => true;

    const markers = useRef([]);
    const [panoLoaded, setPanoLoaded] = useState(false);
    const [guessPos, setGuessPos] = useState(null);

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
        setGuessPos(position);
    }
    const setZoom = (pano, zoom, incr = false) => pano.setZoom(incr ? pano.getZoom() + zoom : zoom);

    return (
        <div className={cls.game}>
            <GameUI
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
                                    removeAllPins();
                                    placePin(map, evt.latLng, guessPin);
                                });
                            }}
                        />
                    </Wrapper>,
                    guessDisabled: !guessPos
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
            <div className={cls.pano}>
                <Wrapper apiKey={api.googleMapsApiKey}>
                    <Map
                        type="pano"
                        className={spbw(cls.pano, 'pano-no-spoilers')}
                        options={{
                            position: tempLoc,
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
                            window.addEventListener(eventValues.gGoToStart, () => pano.setPosition(tempLoc));
                            window.addEventListener(eventValues.gZoomIn, () => setZoom(pano, 0.5, true));
                            window.addEventListener(eventValues.gZoomOut, () => setZoom(pano, -0.5, true));
                        }}
                    />
                </Wrapper>
            </div>
        </div>
    );
}

export default Game;
