import type { BigNumber } from 'ethers'

type ID = string
type Int = number
type BigInt = BigNumber

export enum SubscriptionStatus {
	UNDEFINED = 'UNDEFINED', // Subscription not created yet
	ACTIVE = 'ACTIVE', // Subscription is active
	STOPPED = 'STOPPED', // Subscription is stopped
	CANCELED = 'CANCELED', // Subscription got canceled by the user
	FINISHED = 'FINISHED' // Subscription finished normally
}

export type Subscription = {
	id: ID // token + from + to + startBlock

	// References
	token: StreamableToken
	from: User
	to: User
	fromUserTokenData: UserStreamableTokenData
	toUserTokenData: UserStreamableTokenData

	// Data
	status: SubscriptionStatus

	rate: BigInt // tokens per block
	maxAmount: BigInt // tokens
	amountPaid: BigInt // tokens

	startBlock: BigInt // block number
	startTime: BigInt // timestamp
	endBlock: BigInt // block number (optional)
	endTime: BigInt // timestamp (optional)
}


export type User = {
	id: ID // address

	// Token balances and statistics
	tokens: UserStreamableTokenData[]

	// Incoming subscriptions
	incomingSubscriptions: Subscription[]
		// Aggregated statistics (counting active subscriptions only)
		totalIncomingSubscriptions: Int // length of incomingSubscriptions
		totalSubscribers: Int // unique subscribers

	// Outgoing subscriptions
	outgoingSubscriptions: Subscription[]
		// Aggregated statistics (counting active subscriptions only)
		totalOutgoingSubscriptions: Int // length of outgoingSubscriptions
		totalSubscribedTo: Int // unique users subscribed to

	// Historical snapshots
	history: UserSnapshot[]
}


export type StreamableToken = {
	id: ID // token address
	symbol: string
	name: string
	decimals: BigInt
}


// Data for a given user on a given Streamable Token contract
export type UserStreamableTokenData = {
	id: ID // address + token.address

	// References
	user: User
	token: StreamableToken

	// Data
	blockAtLastUpdate: BigInt // block
	balance: BigInt // tokens
	availableAmount: BigInt

	// Incoming subscriptions
	incomingSubscriptions: Subscription[]
		// Aggregated statistics (counting active subscriptions only)
		totalIncomingRate: BigInt // tokens per block
		totalMaxIncomingAmount: BigInt // tokens
		totalIncomingSubscriptions: Int // length of incomingSubscriptions
		totalSubscribers: Int // unique subscribers

	// Outgoing subscriptions
	outgoingSubscriptions: Subscription[]
		// Aggregated statistics (counting active subscriptions only)
		totalOutgoingRate: BigInt // tokens per block
		totalMaxOutgoingAmount: BigInt // tokens
		totalOutgoingSubscriptions: Int // length of outgoingSubscriptions
		totalSubscribedTo: Int // unique users subscribed to

	// Historical snapshots
	history: UserStreamableTokenDataSnapshot[]
}


// Historical data - write once every block

// Active subscriptions only
export type SubscriptionSnapshot = {
	id: ID // from + to + token + startBlock + blockNumber

	// References
	token: StreamableToken
	from: UserSnapshot
	to: UserSnapshot
	fromUserTokenData: UserStreamableTokenDataSnapshot
	toUserTokenData: UserStreamableTokenDataSnapshot

	// Data
	rate: BigInt // tokens per block
	maxAmount: BigInt // tokens
	amountPaid: BigInt // tokens

	startBlock: BigInt // block number
	startTime: BigInt // timestamp
	endBlock: BigInt // block number (optional)
	endTime: BigInt // timestamp (optional)


	// Snapshot info
	blockNumber: BigInt // block number
	timestamp: BigInt // date

	// Snapshot back-references
	currentFrom: User
	currentTo: User
	currentFromUserTokenData: UserStreamableTokenData
	currentToUserTokenData: UserStreamableTokenData
	currentSubscription: Subscription
}


export type UserSnapshot = {
	id: ID // address + blockNumber

	// Token balances and statistics
	tokens: UserStreamableTokenDataSnapshot[]

	// Incoming subscriptions
	incomingSubscriptions: SubscriptionSnapshot[]
		// Aggregated statistics (counting active subscriptions only)
		totalIncomingSubscriptions: Int // length of incomingSubscriptions
		totalSubscribers: Int // unique subscribers

	// Outgoing subscriptions
	outgoingSubscriptions: SubscriptionSnapshot[]
		// Aggregated statistics (counting active subscriptions only)
		totalOutgoingSubscriptions: Int // length of outgoingSubscriptions
		totalSubscribedTo: Int // unique users subscribed to


	// Snapshot info
	blockNumber: BigInt // block number
	timestamp: BigInt // date

	// Snapshot back-references
	currentUser: User
}


export type UserStreamableTokenDataSnapshot = {
	id: ID // user.address + token + blockNumber

	// References
	user: UserSnapshot
	token: StreamableToken

	// Data
	balance: BigInt
	availableAmount: BigInt

	// Incoming subscriptions
	incomingSubscriptions: SubscriptionSnapshot[]
		// Aggregated statistics (counting active subscriptions only)
		totalIncomingRate: BigInt // tokens per block
		totalMaxIncomingAmount: BigInt // tokens
		totalIncomingSubscriptions: Int // length of incomingSubscriptions
		totalSubscribers: Int // unique subscribers

	// Outgoing subscriptions
	outgoingSubscriptions: SubscriptionSnapshot[]
		// Aggregated statistics (counting active subscriptions only)
		totalOutgoingRate: BigInt // tokens per block
		totalMaxOutgoingAmount: BigInt // tokens
		totalOutgoingSubscriptions: Int // length of outgoingSubscriptions
		totalSubscribedTo: Int // unique users subscribed to


	// Snapshot info
	blockNumber: BigInt // block number
	timestamp: BigInt // date

	// Snapshot back-references
	currentUser: User
	currentUserStreamableTokenData: UserStreamableTokenData
}
