/* eslint-disable prefer-const */

import {BigInt, ByteArray, crypto, ethereum, log} from '@graphprotocol/graph-ts'
import {
	ZERO_BI,
	ADDRESS_ZERO,
	DATA_CONTAINER_ID,
	loadOrCreateUser,
	createUserStreamableTokenData,
	getUserStreamableTokenDataId,
	getSubscriptionId,
	createStreamableToken,
	getLastUpdatedBalanceOf,
	createSubscriptionSnapshot, loadOrCreateDataContainer, loadDataContainer
} from './helpers'
// Entities
import { User, Subscription, StreamableToken, UserStreamableTokenData, DataContainer, SubscriptionSnapshot, UserSnapshot, UserStreamableTokenDataSnapshot } from '../generated/schema'

// Events
import { SubscriptionStarted as SubscriptionStartedEvent,
	SubscriptionUpdated as SubscriptionUpdatedEvent,
	SubscriptionCanceled as SubscriptionCanceledEvent,
	UserStatusChanged as UserStatusChangedEvent,
	Deposit as DepositEvent,
	Withdrawal as WithdrawalEvent,
	Approval as ApprovalEvent,
	Transfer as TransferEvent
} from '../generated/StreamableWrappedETH/StreamableWrappedETHContract'
import { StreamableERC20Contract } from '../generated/StreamableWrappedETH/StreamableERC20Contract'


const SubscriptionStatus_UNDEFINED = 'UNDEFINED' // Subscription not created yet
const SubscriptionStatus_ACTIVE = 'ACTIVE' // Subscription is active
const SubscriptionStatus_STOPPED = 'STOPPED' // Subscription is stopped
const SubscriptionStatus_CANCELED = 'CANCELED' // Subscription got canceled by the user
const SubscriptionStatus_FINISHED = 'FINISHED'// Subscription finished normally


export function handleBlock(block: ethereum.Block): void {
	const dataContainer = DataContainer.load(DATA_CONTAINER_ID)
	const subscriptions = dataContainer.subscriptions

    // this will go over all the subscriptions and create SubscriptionSnapshot, UserSnapshot and UserStreamableTokenDataSnapshot entities
	for (let i =0; i < subscriptions.length; i++) {
		createSubscriptionSnapshot(subscriptions[i], block.number, block.timestamp)
	}

}

export function handleUserStatusChanged(event: UserStatusChangedEvent): void {
	let account = event.params.account
	let accountHex = event.params.account.toHex()
	let incomingRate = event.params.incomingRate
	let totalMaxIncomingAmount = event.params.totalMaxIncomingAmount
	let outgoingRate = event.params.outgoingRate
	let totalMaxOutgoingAmount = event.params.totalMaxOutgoingAmount
	let blockAtLastUpdate = event.params.blockAtLastUpdate
	let availableAmount = event.params.availableBalance

	let tokenAddress = event.address
	let tokenAddressHex = event.address.toHex()
	let userStreamableTokenDataId = getUserStreamableTokenDataId(accountHex, tokenAddressHex)


	let user = UserStreamableTokenData.load(userStreamableTokenDataId)
	user.blockAtLastUpdate = blockAtLastUpdate
	user.balance = getLastUpdatedBalanceOf(tokenAddress, account)
	user.availableAmount = availableAmount

	user.totalIncomingRate = incomingRate
	user.totalMaxIncomingAmount = totalMaxIncomingAmount
	user.totalOutgoingRate = outgoingRate
	user.totalMaxOutgoingAmount = totalMaxOutgoingAmount

	user.save()
}


export function handleSubscriptionStarted(event: SubscriptionStartedEvent): void {
	// Event params
	let from = event.params.from.toHex()
	let to = event.params.to.toHex()
	let rate = event.params.rate
	let maxAmount = event.params.maxAmount
	let startBlock = event.params.startBlock
	let endBlock = event.params.endBlock
	let amountPaid = event.params.amountPaid


	// Block info
	let startTime = event.block.timestamp
	let tokenAddress = event.address
	let tokenAddressHex = event.address.toHex()

	// Subscription
	// Subscription ID = tokenAddress + from + to + startBlock
	let subscriptionID = getSubscriptionId(tokenAddressHex, from, to, startBlock)


	// load or create entities

	// load or create token entity
	let streamableTokenEntity = StreamableToken.load(tokenAddressHex)
	// The entity might not exist if this is the first subscription
	if(streamableTokenEntity == null) {
		streamableTokenEntity = createStreamableToken(tokenAddress)
	}

	// create subscription entity
	let subscriptionEntity = new Subscription(subscriptionID)

	// load or create users
	let userFrom = loadOrCreateUser(from)
	userFrom.totalOutgoingSubscriptions = userFrom.totalOutgoingSubscriptions + 1
	// TODO: Change this
	userFrom.totalSubscribedTo = userFrom.totalSubscribedTo + 1
	userFrom.save()

	let userTo = loadOrCreateUser(to)
	userTo.totalIncomingSubscriptions = userTo.totalIncomingSubscriptions + 1
	// TODO: Change this
	userTo.totalSubscribers = userTo.totalSubscribers + 1
	userTo.save()

	// load or create UserStreamableTokenData

	let fromUserTokenDataId = getUserStreamableTokenDataId(from, tokenAddressHex)
	let fromUserTokenDataEntity = UserStreamableTokenData.load(fromUserTokenDataId)
	if (fromUserTokenDataEntity == null) {
		fromUserTokenDataEntity = createUserStreamableTokenData(fromUserTokenDataId, from, tokenAddressHex)
	} else {
		fromUserTokenDataEntity.totalOutgoingRate = fromUserTokenDataEntity.totalOutgoingRate.plus(rate)
		fromUserTokenDataEntity.totalMaxOutgoingAmount = fromUserTokenDataEntity.totalMaxOutgoingAmount.plus(maxAmount)
		fromUserTokenDataEntity.totalSubscribedTo = fromUserTokenDataEntity.totalSubscribedTo + 1
		fromUserTokenDataEntity.totalOutgoingSubscriptions = fromUserTokenDataEntity.totalOutgoingSubscriptions + 1
	}
	fromUserTokenDataEntity.save()

	let toUserTokenDataId = getUserStreamableTokenDataId(to, tokenAddressHex)
	let toUserTokenDataEntity = UserStreamableTokenData.load(toUserTokenDataId)
	if (toUserTokenDataEntity == null) {
		toUserTokenDataEntity = createUserStreamableTokenData(toUserTokenDataId, to, tokenAddressHex)
	} else {
		toUserTokenDataEntity.totalIncomingRate = toUserTokenDataEntity.totalIncomingRate.plus(rate)
		toUserTokenDataEntity.totalMaxIncomingAmount = toUserTokenDataEntity.totalMaxIncomingAmount.plus(maxAmount)
		toUserTokenDataEntity.totalSubscribers = toUserTokenDataEntity.totalSubscribers + 1
		toUserTokenDataEntity.totalIncomingSubscriptions = toUserTokenDataEntity.totalIncomingSubscriptions + 1
	}
	toUserTokenDataEntity.save()


	subscriptionEntity.token = streamableTokenEntity.id

	subscriptionEntity.from = userFrom.id
	subscriptionEntity.to = userTo.id
	subscriptionEntity.fromUserTokenData = fromUserTokenDataEntity.id
	subscriptionEntity.toUserTokenData = toUserTokenDataEntity.id

	subscriptionEntity.status = SubscriptionStatus_ACTIVE


	subscriptionEntity.rate = rate
	subscriptionEntity.maxAmount = maxAmount
	subscriptionEntity.amountPaid = amountPaid

	subscriptionEntity.startBlock = startBlock
	subscriptionEntity.startTime = startTime
	subscriptionEntity.endBlock = endBlock


	streamableTokenEntity.save()
	subscriptionEntity.save()

	let dataContainer = loadOrCreateDataContainer()
	let subscriptions = dataContainer.subscriptions
	subscriptions.push(subscriptionEntity.id)
	dataContainer.subscriptions = subscriptions
	dataContainer.save()

}


export function handleSubscriptionUpdated(event: SubscriptionUpdatedEvent): void {
	let from = event.params.from.toHex()
	let to = event.params.to.toHex()
	let startBlock = event.params.startBlock
	let amountPaid = event.params.amountPaid

	let tokenAddress = event.address.toHex()

	// Subscription ID = tokenAddress + from + to + startBlock
	let subscriptionID = getSubscriptionId(tokenAddress, from, to, startBlock)

	// Subscription ID = from + to + startBlock
	let subscriptionEntity = Subscription.load(subscriptionID)


	subscriptionEntity.amountPaid = amountPaid
	subscriptionEntity.save()

}


export function handleSubscriptionCanceled(event: SubscriptionCanceledEvent): void {
	// Event params
	let from = event.params.from.toHex()
	let to = event.params.to.toHex()
	let startBlock = event.params.startBlock
	let amountPaid = event.params.amountPaid
	let rate = event.params.rate
	let maxAmount = event.params.maxAmount

	let tokenAddress = event.address.toHex()

	let userFrom = loadOrCreateUser(from)
	userFrom.totalOutgoingSubscriptions = userFrom.totalOutgoingSubscriptions - 1
	// TODO: Change this
	userFrom.totalSubscribedTo = userFrom.totalSubscribedTo - 1
	userFrom.save()

	let userTo = loadOrCreateUser(to)
	userTo.totalIncomingSubscriptions = userTo.totalIncomingSubscriptions - 1
	// TODO: Change this
	userTo.totalSubscribers = userTo.totalSubscribers - 1
	userTo.save()


	let fromUserTokenDataId = getUserStreamableTokenDataId(from, tokenAddress)
	let fromUserTokenDataEntity = UserStreamableTokenData.load(fromUserTokenDataId)

	fromUserTokenDataEntity.lifetimePaidAmount = fromUserTokenDataEntity.lifetimePaidAmount.plus(amountPaid)
	fromUserTokenDataEntity.totalOutgoingRate = fromUserTokenDataEntity.totalOutgoingRate.minus(rate)
	fromUserTokenDataEntity.totalMaxOutgoingAmount = fromUserTokenDataEntity.totalMaxOutgoingAmount.minus(maxAmount)
	fromUserTokenDataEntity.totalSubscribedTo = fromUserTokenDataEntity.totalSubscribedTo - 1
	fromUserTokenDataEntity.totalOutgoingSubscriptions = fromUserTokenDataEntity.totalOutgoingSubscriptions - 1
	fromUserTokenDataEntity.save()

	let toUserTokenDataId = getUserStreamableTokenDataId(to, tokenAddress)
	let toUserTokenDataEntity = UserStreamableTokenData.load(toUserTokenDataId)

	toUserTokenDataEntity.lifetimeReceivedAmount = fromUserTokenDataEntity.lifetimeReceivedAmount.plus(amountPaid)
	toUserTokenDataEntity.totalIncomingRate = toUserTokenDataEntity.totalIncomingRate.minus(rate)
	toUserTokenDataEntity.totalMaxIncomingAmount = toUserTokenDataEntity.totalMaxIncomingAmount.minus(maxAmount)
	toUserTokenDataEntity.totalSubscribers = toUserTokenDataEntity.totalSubscribers - 1
	toUserTokenDataEntity.totalIncomingSubscriptions = toUserTokenDataEntity.totalIncomingSubscriptions - 1
	toUserTokenDataEntity.save()

	// Subscription ID = tokenAddress + from + to + startBlock
	let subscriptionID = getSubscriptionId(tokenAddress, from, to, startBlock)
	let subscriptionEntity = Subscription.load(subscriptionID)

	subscriptionEntity.amountPaid = amountPaid
	subscriptionEntity.endTime = event.block.timestamp
	subscriptionEntity.status = SubscriptionStatus_CANCELED


	subscriptionEntity.save()

	let dataContainer = loadDataContainer()
	let subscriptions = dataContainer.subscriptions
	let filteredSubscriptions = new Array<string>()
	for(let i = 0; i < subscriptions.length; i++) {
		if(subscriptions[i] != subscriptionEntity.id) {
			filteredSubscriptions.push(subscriptions[i])
		}
	}
	dataContainer.subscriptions = filteredSubscriptions
	dataContainer.save()
}



export function handleTransfer(event: TransferEvent): void {
	let from = event.params.from
	let toHex = event.params.to.toHex()
	let value = event.params.value

	let tokenAddress = event.address
	let tokenAddressHex = event.address.toHex()
	// handle mint event
	if (from.toHex() == ADDRESS_ZERO) {
		// load or create token entity
		let streamableTokenEntity = StreamableToken.load(tokenAddressHex)
		// The entity might not exist if this is the first subscription
		if(streamableTokenEntity == null) {
			streamableTokenEntity = createStreamableToken(tokenAddress)
		}

		loadOrCreateUser(toHex)

		let userTokenDataEntityId = getUserStreamableTokenDataId(toHex, tokenAddressHex)
		let userTokenDataEntity = UserStreamableTokenData.load(userTokenDataEntityId)
		if (userTokenDataEntity == null) {
			userTokenDataEntity = createUserStreamableTokenData(userTokenDataEntityId, toHex, tokenAddressHex)
		}

		userTokenDataEntity.blockAtLastUpdate = event.block.number
		userTokenDataEntity.balance = userTokenDataEntity.balance.plus(value)
		userTokenDataEntity.availableAmount = userTokenDataEntity.availableAmount.plus(value)
		userTokenDataEntity.save()
	}

}
