export enum TimeInterval {
	Block = 'block',
	Day = 'day',
	Month = 'month',
	Year = 'year'
}

export const timeIntervals = Object.values(TimeInterval)

export const averageBlocksPerTimeInterval: Record<TimeInterval, number> = {
	'year': 1000,
	'month': 1000 / 12,
	'day': 1000 / 365.25,
	'block': 1
}
