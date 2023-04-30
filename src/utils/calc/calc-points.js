import gameValues from '../../config/game.json';

const calcPoints = (a, t) => {
    const tpe = gameValues.value.tpeMul * ~~(t / gameValues.value.tpeTime) + 1;
    console.log(tpe);
    return ~~(a / tpe * gameValues.value.maxPoints);
};

export default calcPoints;
