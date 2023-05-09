import {Wrapper} from "@googlemaps/react-wrapper";
import PropTypes from "prop-types";

import Map from "./UI/Map";

import spbw from "../utils/spbw";
import arrToLLObj from "../utils/arr-to-ll-obj";
import genRandomCoords from "../utils/gen-random-coords";

import api from "../config/api";
import eventValues from "../config/events.json";

function PanoramaGoogle({ className, getParams, utils, realPos, mapData }) {
    return (
        <Wrapper apiKey={api.googleMapsApiKey}>
            <Map
                type="pano"
                className={spbw(className, 'pano-no-spoilers')}
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
                        svSvc.getPanorama({
                            location: arrToLLObj(genRandomCoords(getParams.region)),
                            radius: 10000
                        }).then(({ data }) => {
                            const loc = data.location;
                            if (!data.links.length) return getRandomLocation(n);
                            realPos.current = [loc.latLng.lat(), loc.latLng.lng()];
                            pano.setPano(loc.pano);
                            pano.setZoom(0);
                            utils.timer.itvId = setInterval(() => utils.timer.nextSec(), 1000);
                        }).catch((e => e.code === 'ZERO_RESULTS' && getRandomLocation(n - 1)));
                    }
                    getRandomLocation(10);

                    pano.addListener('pov_changed', () => utils.compass.setAngle(360 - pano.getPov().heading));
                    window.addEventListener(eventValues.gGoToStart, () => pano.setPosition(arrToLLObj(realPos.current)));
                    window.addEventListener(eventValues.gZoomIn, () => mapData.setZoom(pano, 0.5, true));
                    window.addEventListener(eventValues.gZoomOut, () => mapData.setZoom(pano, -0.5, true));
                }}
            />
        </Wrapper>
    );
}
PanoramaGoogle.propTypes = {
    className: PropTypes.string,
    getParams: PropTypes.object,
    utils: PropTypes.object,
    realPos: PropTypes.object,
    mapData: PropTypes.object
};

export default PanoramaGoogle;
