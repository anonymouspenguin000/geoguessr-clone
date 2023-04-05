export default function strCut (str, len) {
    return (len < 0 || str.length <= len) ? ''+str : str.slice(0, len) + '…';
}
