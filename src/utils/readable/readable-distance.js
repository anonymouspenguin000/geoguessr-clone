const readableDistance = d => d > 1000 ? (d / 1000).toFixed(2) + 'km' : ~~d + 'm';

export default readableDistance;
