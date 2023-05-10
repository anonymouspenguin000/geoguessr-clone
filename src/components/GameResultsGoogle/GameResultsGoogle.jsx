import PropTypes from 'prop-types';
import {Wrapper} from '@googlemaps/react-wrapper';

import GameResults from '../GameResults/GameResults';
import Map from '../UI/Map/Map';

import arrToLLObj from '../../utils/arr-to-ll-obj';
import geoUrl from '../../utils/geo-url';

import guessPin from '../../assets/img/guess-pin.png';
import realPin from '../../assets/img/real-pin.png';

import api from '../../config/api';

function GameResultsGoogle({ classNames, getParams, utils, realPos, guessPos, markers }) {
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
                        markers.removeAllPins();
                        markers.placePin(map, arrToLLObj(guessPos), guessPin, geoUrl(guessPos));
                        markers.placePin(map, arrToLLObj(realPos.current), realPin, geoUrl(realPos.current));

                        let mapLoaded = false;

                        map.addListener('tilesloaded', () => {
                            if (mapLoaded) return;
                            setTimeout(() => {
                                const bounds = new window.google.maps.LatLngBounds();
                                markers.getMarkers().forEach(m => bounds.extend(m.position));
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
GameResultsGoogle.propTypes = {
    classNames: PropTypes.object.isRequired,
    getParams: PropTypes.object.isRequired,
    utils: PropTypes.object.isRequired,
    realPos: PropTypes.object.isRequired,
    guessPos: PropTypes.array.isRequired,
    markers: PropTypes.object.isRequired
};

export default GameResultsGoogle;
