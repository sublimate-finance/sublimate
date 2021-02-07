import { log, BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'
import {
	DataContainer,
	StreamableToken, StreamableSubscription, SubscriptionSnapshot,
	User,
	UserSnapshot,
	UserStreamableTokenData,
	UserStreamableTokenDataSnapshot
} from "../generated/schema";
import {StreamableERC20Contract} from "../generated/StreamableWrappedETH/StreamableERC20Contract";
export const ZERO_BI = BigInt.fromI32(0)
export const DATA_CONTAINER_ID = '1'
export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

export function loadOrCreateUser(address: string): User | null {
	let user = User.load(address)
	if (user == null) {
		user = new User(address)
	}
	return user
}

export function loadOrCreateDataContainer(): DataContainer | null {
	let dataContainer = loadDataContainer()
	if(dataContainer == null) {
		dataContainer = new DataContainer(DATA_CONTAINER_ID)
		dataContainer.subscriptions = []
		dataContainer.userStreamableTokenData = []
	}
	return dataContainer
}

export function loadDataContainer(): DataContainer | null {
	return DataContainer.load(DATA_CONTAINER_ID)
}

export function createUserStreamableTokenData(id: string, userId: string, tokenId: string): UserStreamableTokenData {
	const userStreamableTokenData = new UserStreamableTokenData(id)
	userStreamableTokenData.user = userId
	userStreamableTokenData.token = tokenId


	userStreamableTokenData.blockAtLastUpdate = ZERO_BI
	userStreamableTokenData.balance = ZERO_BI
	userStreamableTokenData.availableAmount = ZERO_BI

	userStreamableTokenData.lifetimeReceivedAmount = ZERO_BI

	userStreamableTokenData.totalReceivedAmount = ZERO_BI
	userStreamableTokenData.totalIncomingRate = ZERO_BI
	userStreamableTokenData.totalMaxIncomingAmount = ZERO_BI
	userStreamableTokenData.totalSubscribers = 0
	userStreamableTokenData.totalIncomingSubscriptions = 0

	userStreamableTokenData.lifetimePaidAmount = ZERO_BI

	userStreamableTokenData.totalPaidAmount = ZERO_BI
	userStreamableTokenData.totalOutgoingRate = ZERO_BI
	userStreamableTokenData.totalMaxOutgoingAmount = ZERO_BI
	userStreamableTokenData.totalOutgoingSubscriptions = 0
	userStreamableTokenData.totalSubscribedTo = 0
	return userStreamableTokenData
}

export function createStreamableToken(id: Address): StreamableToken {
	const streamableToken = new StreamableToken(id.toHex())
	const contract = getStreamableERC20Contract(id)
	streamableToken.symbol = contract.symbol()
	streamableToken.name = contract.name()
	streamableToken.decimals = BigInt.fromI32(contract.decimals())
	streamableToken.save()
	return streamableToken
}

export function createSubscriptionSnapshot(subscriptionId: string, blockNumber: BigInt, blockTime: BigInt): SubscriptionSnapshot {
	const subscription = StreamableSubscription.load(subscriptionId)
	const subscriptionSnapshotId = getSubscriptionSnapshotId(subscription.token, subscription.from, subscription.to, subscription.startBlock, blockNumber)
	const subscriptionSnapshot = new SubscriptionSnapshot(subscriptionSnapshotId)
	subscriptionSnapshot.token = subscription.token
	subscriptionSnapshot.rate = subscription.rate
	subscriptionSnapshot.maxAmount = subscription.maxAmount
	subscriptionSnapshot.amountPaid = subscription.amountPaid
	subscriptionSnapshot.startBlock = subscription.startBlock
	subscriptionSnapshot.endBlock = subscription.endBlock
	subscriptionSnapshot.endTime = subscription.endTime
	subscriptionSnapshot.blockNumber = blockNumber
	subscriptionSnapshot.timestamp = blockTime

	const fromUserSnapshot = createUserSnapshot(subscription.from, blockNumber, blockTime)
	const toUserSnapshot = createUserSnapshot(subscription.to, blockNumber, blockTime)

	const fromUserStreamableTokenDataSnapshot = createUserStreamableTokenDataSnapshot(subscription.from, subscription.token, subscription.fromUserTokenData, fromUserSnapshot.id, blockNumber, blockTime)
	const toUserStreamableTokenDataSnapshot = createUserStreamableTokenDataSnapshot(subscription.to, subscription.token, subscription.toUserTokenData, toUserSnapshot.id, blockNumber, blockTime)

	subscriptionSnapshot.from = fromUserSnapshot.id
	subscriptionSnapshot.to = toUserSnapshot.id
	subscriptionSnapshot.fromUserTokenData = fromUserStreamableTokenDataSnapshot.id
	subscriptionSnapshot.toUserTokenData = toUserStreamableTokenDataSnapshot.id

	subscriptionSnapshot.currentFrom = subscription.from
	subscriptionSnapshot.currentTo = subscription.to
	subscriptionSnapshot.currentFromUserTokenData = subscription.fromUserTokenData
	subscriptionSnapshot.currentToUserTokenData = subscription.toUserTokenData
	subscriptionSnapshot.currentSubscription = subscription.id
	subscriptionSnapshot.save()
	return subscriptionSnapshot
}

export function createUserSnapshot(address: string, blockNumber: BigInt, blockTime: BigInt): UserSnapshot {
	const userSnapshotId = getUserSnapshotId(address, blockNumber)
	const userSnapshot = new UserSnapshot(userSnapshotId)
	userSnapshot.blockNumber = blockNumber
	userSnapshot.timestamp = blockTime
	userSnapshot.currentUser = address
	userSnapshot.save()
	return userSnapshot
}

export function createUserStreamableTokenDataSnapshot(userAddress: string, tokenAddress: string, userStreamableDataId: string, userSnapshotId: string, blockNumber: BigInt, blockTime: BigInt): UserStreamableTokenDataSnapshot {
	const userStreamableTokenDataSnapshotId = getUserStreamableTokenDataSnapshotId(userAddress, tokenAddress,  blockNumber)
	const userStreamableTokenDataId = getUserStreamableTokenDataId(userAddress, tokenAddress)
	const userStreamableTokenData = UserStreamableTokenData.load(userStreamableTokenDataId)
	const userStreamableTokenDataSnapshot = new UserStreamableTokenDataSnapshot(userStreamableTokenDataSnapshotId)
	userStreamableTokenDataSnapshot.user = userSnapshotId
	userStreamableTokenDataSnapshot.token = tokenAddress
	userStreamableTokenDataSnapshot.balance = getLastUpdatedBalanceOf(Address.fromString(tokenAddress), Address.fromString(userAddress))
	userStreamableTokenDataSnapshot.availableAmount = userStreamableTokenData.availableAmount

	userStreamableTokenDataSnapshot.totalIncomingRate = userStreamableTokenData.totalIncomingRate
	userStreamableTokenDataSnapshot.totalMaxIncomingAmount = userStreamableTokenData.totalMaxIncomingAmount
	userStreamableTokenDataSnapshot.totalIncomingSubscriptions = userStreamableTokenData.totalIncomingSubscriptions
	userStreamableTokenDataSnapshot.totalSubscribers = userStreamableTokenData.totalSubscribers

	userStreamableTokenDataSnapshot.totalOutgoingRate = userStreamableTokenData.totalOutgoingRate
	userStreamableTokenDataSnapshot.totalMaxOutgoingAmount = userStreamableTokenData.totalMaxOutgoingAmount
	userStreamableTokenDataSnapshot.totalOutgoingSubscriptions = userStreamableTokenData.totalOutgoingSubscriptions
	userStreamableTokenDataSnapshot.totalSubscribedTo = userStreamableTokenData.totalSubscribedTo

	userStreamableTokenDataSnapshot.blockNumber = blockNumber
	userStreamableTokenDataSnapshot.timestamp = blockTime

	userStreamableTokenDataSnapshot.currentUser = userAddress
	userStreamableTokenDataSnapshot.currentUserStreamableTokenData = userStreamableTokenDataId
	userStreamableTokenDataSnapshot.save()
	return userStreamableTokenDataSnapshot
}

export function calculateTotalPaidAndTotalReceivedAmountForUserStreamableTokenData(userStreamableTokenDataId: string): UserStreamableTokenData | null {
	const userStreamableTokenDataEntity = UserStreamableTokenData.load(userStreamableTokenDataId)
	let totalPaidAmount = BigInt.fromI32(0)
	let totalReceivedAmount = BigInt.fromI32(0)
	const incomingSubscriptions = userStreamableTokenDataEntity.incomingSubscriptions
	for (let i = 0; i < incomingSubscriptions.length; i++) {
		totalReceivedAmount = totalReceivedAmount.plus(StreamableSubscription.load(incomingSubscriptions[i]).amountPaid)
	}

	const outgoingSubscriptions = userStreamableTokenDataEntity.outgoingSubscriptions
	for (let i = 0; i < outgoingSubscriptions.length; i++) {
		totalPaidAmount = totalPaidAmount.plus(StreamableSubscription.load(outgoingSubscriptions[i]).amountPaid)
	}

	userStreamableTokenDataEntity.totalReceivedAmount = totalReceivedAmount
	userStreamableTokenDataEntity.totalPaidAmount = totalPaidAmount
	userStreamableTokenDataEntity.save()
	return userStreamableTokenDataEntity
}



export function getUserStreamableTokenDataId(userAddress: string, tokenAddress: string): string {
	return `${userAddress}-${tokenAddress}`;
}

export function getUserStreamableTokenDataSnapshotId(userAddress: string, tokenAddress: string, blockNumber: BigInt): string {
	return `${userAddress}-${tokenAddress}-${blockNumber}`;
}

export function getSubscriptionId(tokenAddress: string, from: string, to: string, startBlock: BigInt): string {
	return `${tokenAddress}-${from}-${to}-${startBlock}`
}

export function getSubscriptionSnapshotId(tokenAddress: string, from: string, to: string, startBlock: BigInt, blockNumber: BigInt): string {
	return `${from}-${to}-${tokenAddress}-${startBlock}-${blockNumber}`
}

export function getUserSnapshotId(address: string, blockNumber: BigInt): string {
	return `${address}-${blockNumber}`
}


export function getStreamableERC20Contract(address: Address): StreamableERC20Contract {
	return StreamableERC20Contract.bind(address)
}

export function getLastUpdatedBalanceOf(contractAddress: Address, userAddress: Address): BigInt {
	const contract = getStreamableERC20Contract(userAddress)
	return contract.lastUpdatedBalanceOf(userAddress)
}
