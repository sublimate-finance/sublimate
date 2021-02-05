export enum TimeInterval {
	Block = 'block',
	Day = 'day',
	Month = 'month',
	Year = 'year'
}

export const timeIntervals = Object.values(TimeInterval)

// Estimation: 13 secs/block
// TODO: Derive this from average block time via Chainlink or external API
export const averageBlocksPerTimeInterval: Record<TimeInterval, number> = {
	'year': 2427508,
	'month': 202154,
	'day': 6646,
	'block': 1
}
