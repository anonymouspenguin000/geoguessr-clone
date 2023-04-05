export default function uniqueTimestamp() {
    let ts;
    return function () {
        let curr;
        do {
            curr = Date.now();
        } while (curr === ts);
        ts = curr;
        return curr;
    }
}
