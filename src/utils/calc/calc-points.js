import gameValues from '../../config/game.json';

const calcPoints = (a, t) => Math.floor(a * (1 / (1 + t / gameValues.value.pts_second_divider)) * gameValues.value.max_points);

export default calcPoints;
