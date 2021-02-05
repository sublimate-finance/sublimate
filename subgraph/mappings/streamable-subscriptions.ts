/* eslint-disable prefer-const */

import { ByteArray, crypto, log } from '@graphprotocol/graph-ts'

// Entities
import { User, Subscription } from '../generated/schema'

// Events
import { SubscriptionStarted, SubscriptionUpdated, SubscriptionCanceled, UserStatusChanged } from '../generated/StreamableWrappedETH/StreamableWrappedETHContract'


enum SubscriptionStatus {
	UNDEFINED = 'UNDEFINED', // Subscription not created yet
	ACTIVE = 'ACTIVE', // Subscription is active
	STOPPED = 'STOPPED', // Subscription is stopped
	CANCELED = 'CANCELED', // Subscription got canceled by the user
	FINISHED = 'FINISHED' // Subscription finished normally
}


export function handleUserStatusChanged(event: UserStatusChanged): void {
	let account = event.params.account
	let incomingRate = event.params.incomingRate
	let totalMaxIncomingAmount = event.params.totalMaxIncomingAmount
	let outgoingRate = event.params.outgoingRate
	let totalMaxOutgoingAmount = event.params.totalMaxOutgoingAmount
	let blockAtLastUpdate = event.params.blockAtLastUpdate
	let balance = event.params.balance
	let availableBalance = event.params.availableBalance

	let user = User.load(account)
	user.incomingRate = incomingRate;
	user.totalMaxIncomingAmount = totalMaxIncomingAmount;
	user.outgoingRate = outgoingRate;
	user.totalMaxOutgoingAmount = totalMaxOutgoingAmount;
	user.blockAtLastUpdate = blockAtLastUpdate;
	user.balance = balance;
	user.availableBalance = availableBalance;
	user.save()


}


export function handleSubscriptionStarted(event: SubscriptionStarted): void {
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

	// Subscription
	// Subscription ID = from + to + startBlock
	let subscriptionID = `${from}-${to}-${startBlock}`
	let subscriptionEntity = Subscription.load(subscriptionID) || new Subscription(subscriptionID)

	subscriptionEntity.from = from
	subscriptionEntity.to = to
	subscriptionEntity.rate = rate
	subscriptionEntity.maxAmount = maxAmount

	subscriptionEntity.startBlock = startBlock
	subscriptionEntity.startTime = startTime
	subscriptionEntity.endBlock = endBlock
	subscriptionEntity.amountPaid = amountPaid
	subscriptionEntity.status = SubscriptionStatus.ACTIVE

	subscriptionEntity.save()

	// `from` User

	let fromUserID = from
	let fromUserEntity = User.load(fromUserID) || new User(fromUserID)

	// ...

	fromUserEntity.save()

	// `to` User

	let toUserID = to
	let toUserEntity = User.load(toUserID) || new User(toUserID)
	toUserEntity.save()
}


export function handleSubscriptionUpdated(event: SubscriptionUpdated): void {
	// Event params
	let from = event.params.from.toHex()
	let to = event.params.to.toHex()
	let startBlock = event.params.startBlock
	let amountPaid = event.params.amountPaid

	// Subscription ID = from + to + startBlock
	let subscriptionID = `${from}-${to}-${startBlock}`
	let subscriptionEntity = Subscription.load(subscriptionID)

	// ...
	subscriptionEntity.amountPaid = amountPaid
	subscriptionEntity.status = SubscriptionStatus.ACTIVE
	subscriptionEntity.save()

}


export function handleSubscriptionCanceled(event: SubscriptionCanceled): void {
	// Event params
	let from = event.params.from.toHex()
	let to = event.params.to.toHex()
	let startBlock = event.params.startBlock
	let amountPaid = event.params.amountPaid

	// Subscription ID = from + to + startBlock
	let subscriptionID = `${from}-${to}-${startBlock}`
	let subscriptionEntity = Subscription.load(subscriptionID)

	subscriptionEntity.amountPaid = amountPaid
	subscriptionEntity.status = SubscriptionStatus.CANCELED

	subscriptionEntity.save()

}
