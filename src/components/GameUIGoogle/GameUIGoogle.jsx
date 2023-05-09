import {Wrapper} from "@googlemaps/react-wrapper";
import api from "../../config/api";
import Map from "../UI/Map/Map";
import spbw from "../../utils/spbw";
import guessPin from "../../assets/img/guess-pin.png";
import storageValues from "../../config/storage.json";
import eventValues from "../../config/events.json";
import GameUI from "../GameUI/GameUI";
import PropTypes from "prop-types";

function GameUiGoogle({ classNames, getParams, utils, realPos, guessPos, markers, setGuessPos, setGameEnd }) {
    return (
        <GameUI
            className={classNames?.game_ui}
            utils={utils}
            minimap={{
                children: <Wrapper apiKey={api.googleMapsApiKey}>
                    <Map
                        className={spbw(classNames?.minimap, classNames?.place_point)}
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
                                markers.removeAllPins();
                                markers.placePin(map, pos, guessPin);
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
    );
}
GameUiGoogle.propTypes = {
    classNames: PropTypes.object,
    getParams: PropTypes.object,
    utils: PropTypes.object,
    realPos: PropTypes.object,
    guessPos: PropTypes.array,
    markers: PropTypes.object,
    setGuessPos: PropTypes.func,
    setGameEnd: PropTypes.func
};

export default GameUiGoogle;
