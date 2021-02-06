/* eslint-disable prefer-const */

import { ByteArray, crypto, ethereum, log } from '@graphprotocol/graph-ts'

// Entities
import { User, Subscription } from '../generated/schema'

// Events
import { SubscriptionStarted, SubscriptionUpdated, SubscriptionCanceled, UserStatusChanged } from '../generated/StreamableWrappedETH/StreamableWrappedETHContract'


const SubscriptionStatus_UNDEFINED = 'UNDEFINED' // Subscription not created yet
const SubscriptionStatus_ACTIVE = 'ACTIVE' // Subscription is active
const SubscriptionStatus_STOPPED = 'STOPPED' // Subscription is stopped
const SubscriptionStatus_CANCELED = 'CANCELED' // Subscription got canceled by the user
const SubscriptionStatus_FINISHED = 'FINISHED'// Subscription finished normally


export function handleBlock(block: ethereum.Block): void {
	let blockHash = block.hash.toHex()


}


export function handleUserStatusChanged(event: UserStatusChanged): void {
	let account = event.params.account
	let incomingRate = event.params.incomingRate
	let totalMaxIncomingAmount = event.params.totalMaxIncomingAmount
	let outgoingRate = event.params.outgoingRate
	let totalMaxOutgoingAmount = event.params.totalMaxOutgoingAmount
	let blockAtLastUpdate = event.params.blockAtLastUpdate
	let balance = event.params.balance
	let availableAmount = event.params.availableBalance

	let user = User.load(account.toHex())
	user.incomingRate = incomingRate;
	user.totalMaxIncomingAmount = totalMaxIncomingAmount;
	user.outgoingRate = outgoingRate;
	user.totalMaxOutgoingAmount = totalMaxOutgoingAmount;
	user.blockAtLastUpdate = blockAtLastUpdate;
	user.balance = balance;
	user.availableAmount = availableAmount;
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
	subscriptionEntity.status = SubscriptionStatus_ACTIVE

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
	subscriptionEntity.status = SubscriptionStatus_ACTIVE
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
	subscriptionEntity.status = SubscriptionStatus_CANCELED


	subscriptionEntity.save()

}
