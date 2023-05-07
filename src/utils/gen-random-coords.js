import calcGeoArea from "./calc/calc-geo-area";
import scaleArray from "./scale-array";
import randChance from "./rand-chance";
import randRange from "./rand-range";

import geoPolygons from '../config/geo-polygons.json';
// Just a note:
// JSON.stringify(obj.map(el => el.map(el => el.map(el => +el.toFixed(6)))));

function allPolygons(obj) { // I think it will be useful when I make nested regions
    if (obj instanceof Array) return obj;
    return Object.values(obj).reduce((res, curr) => [...res, ...allPolygons(curr)]);
}

export default function genRandomCoords(region) {
    const regPlg = allPolygons(region === 'wrl' ? geoPolygons : geoPolygons[region]).map(el => {
        const lt1 = el[0][0];
        const lt2 = el[1][0];
        const ln1 = el[0][1];
        const ln2 = el[1][1];
        return [[Math.min(lt1, lt2), Math.min(ln1, ln2)], [Math.max(lt1, lt2), Math.max(ln1, ln2)]];
    });
    const proportions = scaleArray(regPlg.map(el => calcGeoArea(...el)), 10000, 6);

    const randPlg = regPlg[randChance(proportions)];
    return [
        randRange(randPlg[0][0], randPlg[1][0], false),
        randRange(randPlg[0][1], randPlg[1][1], false)
    ];
}
