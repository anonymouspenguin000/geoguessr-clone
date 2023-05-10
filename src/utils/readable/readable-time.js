const readableTime = s => {
    if (s === Infinity) return '-';
    const _norm = n => n < 10 ? '0' + n : n;
    const
        _sec = _norm(s % 60),
        _min = _norm(~~(s / 60) % 60),
        _hr = _norm(~~(s / 3600));
    return `${ _hr }:${ _min }:${ _sec }`;
};

export default readableTime;
