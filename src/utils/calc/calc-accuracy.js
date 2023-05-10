import naturalConfig from '../../config/natural.json';

const calcAccuracy = d => Math.max(1 - d / (naturalConfig.earth_circumference / 4), 0);

export default calcAccuracy;
