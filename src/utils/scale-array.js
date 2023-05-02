export default function scaleArray(arr, maxVal, fixed = Infinity) {
    const max = Math.max(...arr);
    return arr.map(el => (wt => fixed === Infinity ? wt : +wt.toFixed(fixed))(el / max * maxVal));
}
