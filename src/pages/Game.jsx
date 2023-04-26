import {Wrapper} from '@googlemaps/react-wrapper';
import {useState, useRef} from 'react';

import GameUI from '../components/GameUI';
import Map from "../components/UI/Map";

import readableTime from "../utils/readable/readable-time";

import guessPin from '../assets/img/guess-pin.png';
//import realPin from '../assets/img/real-pin.png';

import api from '../config/api';
import cls from './game.module.css';

console.log(guessPin);

const utils = {
    compass: {
        shown: true,
        angle: 0
    },
    timer: {
        shown: true,
        time: 0
    }
};

// <Temp>
let tempIv1;
let tempIv2;
// </Temp>

function Game() {
    const [guessPos, setGuessPos] = useState(null);
    utils.compass.ref = useRef();
    utils.timer.ref = useRef();

    let markers = [];
    function removeAllPins() {
        markers.forEach(el => el.setMap(null));
        markers = [];
    }
    function placePin(map, position, icon, url) {
        setGuessPos(position);
        const marker = new window.google.maps.Marker({map, position, icon});
        markers.push(marker);
        if (url) marker.addListener('click', () => {
            const lnk = document.createElement('a');
            lnk.href = url;
            lnk.target = '_blank';
            lnk.click();
        })
    }

    // <Temp>
    if (tempIv1 === undefined) tempIv1 = setInterval(() => utils.timer.ref?.current && (utils.timer.ref.current.innerHTML = readableTime(++utils.timer.time)), 1000);
    if (tempIv2 === undefined) tempIv2 = setInterval(() => utils.compass.ref?.current && (utils.compass.ref.current.style.transform = `rotate(${utils.compass.angle += 5}deg)`), 20);
    // </Temp>

    return (
        <div className={cls.game}>
            <GameUI className={cls.ui} utils={utils} minimap={{
                children:
                    <Wrapper apiKey={api.googleMapsApiKey}>
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
            />
            <div className={cls.pano}></div>
        </div>
    );
}

export default Game;
