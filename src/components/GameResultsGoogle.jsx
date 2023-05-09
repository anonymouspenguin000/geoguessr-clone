import {Wrapper} from "@googlemaps/react-wrapper";

import GameResults from "./GameResults";
import Map from "./UI/Map";

import arrToLLObj from "../utils/arr-to-ll-obj";
import geoUrl from "../utils/geo-url";

import guessPin from "../assets/img/guess-pin.png";
import realPin from "../assets/img/real-pin.png";

import api from "../config/api";
// import cls from "../pages/game.module.css";

function GameResultsGoogle({ classNames, getParams, utils, realPos, guessPos, mapData }) {
    return (
        <GameResults
            data={{
                region: getParams.region,
                realPos: realPos.current,
                time: utils.timer.time,
                guessPos
            }}
            map={<Wrapper apiKey={api.googleMapsApiKey}>
                <Map
                    className={classNames.minimap}
                    options={{
                        center: {lat: 0, lng: 0},
                        minZoom: 1,
                        zoom: 1,
                        disableDefaultUI: true
                    }}
                    onMount={map => {
                        mapData.removeAllPins();
                        mapData.placePin(map, arrToLLObj(guessPos), guessPin, geoUrl(guessPos));
                        mapData.placePin(map, arrToLLObj(realPos.current), realPin, geoUrl(realPos.current));

                        let mapLoaded = false;

                        map.addListener('tilesloaded', () => {
                            if (mapLoaded) return;
                            setTimeout(() => {
                                const bounds = new window.google.maps.LatLngBounds();
                                mapData.markers.current.forEach(m => bounds.extend(m.position));
                                map.fitBounds(bounds);
                            }, 1000);
                            mapLoaded = true;
                        });
                    }}
                />
            </Wrapper>}
        />
    );
}

export default GameResultsGoogle;
