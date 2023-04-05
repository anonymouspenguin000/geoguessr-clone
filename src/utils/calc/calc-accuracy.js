import naturalValues from '../../config/natural.json';

const calcAccuracy = d => Math.max(1 - d / (naturalValues.earth_circumference / 4), 0);

export default calcAccuracy;
