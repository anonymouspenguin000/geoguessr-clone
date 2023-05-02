import {point as turfPoint} from "@turf/helpers";
import distance from "@turf/distance";

export default function calcGeoDistance(pointA, pointB) {
    return distance(
        turfPoint(pointA.slice().reverse()),
        turfPoint(pointB.slice().reverse()),
        {units: "meters"}
    );
}
