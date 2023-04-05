const readableDate = ts => new Date(ts).toISOString().split('T')[0];

export default readableDate;
