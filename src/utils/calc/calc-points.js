import gameConfig from '../../config/game.json';

const calcPoints = (a, t) => {
    const tpe = gameConfig.value.tpeMul * ~~(t / gameConfig.value.tpeTime) + 1;
    return ~~(a / tpe * gameConfig.value.maxPoints);
};

export default calcPoints;
