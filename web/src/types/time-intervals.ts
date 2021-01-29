export enum TimeInterval {
	Block = 'block',
	Day = 'day',
	Month = 'month',
	Year = 'year'
}

export const timeIntervals = Object.values(TimeInterval)

console.log(TimeInterval, Object.values(TimeInterval), Object.entries(TimeInterval))
