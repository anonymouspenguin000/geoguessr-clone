import naturalValues from '../../config/natural.json';

export default function calcGeoDistance(coords1, coords2) { // Thx https://www.movable-type.co.uk/scripts/latlong.html
    const [ lat1, lng1 ] = coords1;
    const [ lat2, lng2 ] = coords2;

    let f1 = lat1 * Math.PI / 180;
    let f2 = lat2 * Math.PI / 180;
    let df = (lat2 - lat1) * Math.PI / 180;
    let dg = (lng2 - lng1) * Math.PI / 180;

    let a = Math.sin(df / 2) * Math.sin(df / 2) +
        Math.cos(f1) * Math.cos(f2) *
        Math.sin(dg / 2) * Math.sin(dg / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return naturalValues.earth_radius * c; // Distance in meters
}
