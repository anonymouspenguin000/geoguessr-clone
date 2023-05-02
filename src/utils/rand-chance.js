export default function randChance(prpt) {
    const randomVal = Math.random() * prpt.reduce((r, c) => r + c, 0);
    let last = 0;
    for (let i = 0; i < prpt.length; i++) {
        const curr = last + prpt[i];
        if (randomVal < curr) return i;
        last = curr;
    }
}
/*
// I'll leave it here ;)
function runTest(chances, count) {
    const res = new Array(chances.length).fill(0);
    for (let i = 0; i < count; i++) {
        res[randChance(chances)]++;
    }
    const resChances = res.map(el => el / count);
    return {
        res,
        chances: resChances,
        proportions: resChances.map(el => +(el / Math.max(...resChances) * Math.max(...chances)).toFixed(2))
    };
}
// Ex: runTest([1, 2, 5, 9], 100000);
*/
