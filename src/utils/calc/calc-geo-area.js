import bboxPolygon from "@turf/bbox-polygon";
import area from "@turf/area";

export default function calcGeoArea(pointA, pointB) {
    return area(bboxPolygon([
        ...pointA.slice().reverse(),
        ...pointB.slice().reverse(),
    ]), );
}
