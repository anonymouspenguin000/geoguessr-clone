const readableTime = s => {
    if (s === Infinity) return '-';
    const _norm = n => n < 10 ? '0' + n : n;
    const
        sec = _norm(s % 60),
        min = _norm(~~(s / 60) % 60),
        hr = _norm(~~(s / 3600));
    return `${ hr }:${ min }:${ sec }`;
};

export default readableTime;
