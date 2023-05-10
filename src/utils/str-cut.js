const strCut = (str, len) => (len < 0 || str.length <= len) ? ''+str : str.slice(0, len) + '…';

export default strCut;
