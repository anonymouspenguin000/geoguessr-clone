const randRange = (min, max, intg = true) => (wt => intg ? Math.round(wt) : wt)(Math.random() * (max - min) + min);

export default randRange;
