import { ByteArray, crypto, log } from '@graphprotocol/graph-ts'

// Entities
import { User, Subscription } from '../generated/schema'

// Events
import { SubscriptionStarted, SubscriptionUpdated, SubscriptionCanceled } from '../generated/StreamableWrappedETH/StreamableWrappedETHContract'


export function handleSubscriptionStarted(event: SubscriptionStarted): void {
	// Event params
	let from = event.params.from.toHex()
	let to = event.params.to.toHex()
	let rate = event.params.rate
	let maxAmount = event.params.maxAmount


	// Block info
	let startBlock = event.block.number
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
	// subscriptionEntity.endBlock =
	// subscriptionEntity.endTime =

	subscriptionEntity.save()


	// `from` User

	let fromUserID = from
	let fromUserEntity = User.load(fromUserID) || new User(fromUserID)

	// fromUserID.balance =
	// ...

	fromUserEntity.save()


	// `to` User

	let toUserID = to
	let toUserEntity = User.load(toUserID) || new User(toUserID)

	// toUserID.balance =
	// ...

	toUserEntity.save()
}


export function handleSubscriptionUpdated(event: SubscriptionUpdated): void {
	// Event params
	let from = event.params.from.toHex()
	let to = event.params.to.toHex()


	// Block info
	let startBlock = event.block.number
	let startTime = event.block.timestamp


	// Subscription

	// Subscription ID = from + to + startBlock
	let subscriptionID = `${from}-${to}-${startBlock}`
	let subscriptionEntity = Subscription.load(subscriptionID) || new Subscription(subscriptionID)

	// ...

	subscriptionEntity.save()


	// `from` User

	let fromUserID = from
	let fromUserEntity = User.load(fromUserID) || new User(fromUserID)

	// ...

	fromUserEntity.save()


	// `to` User

	let toUserID = to
	let toUserEntity = User.load(toUserID) || new User(toUserID)

	// ...

	toUserEntity.save()
}


export function handleSubscriptionCanceled(event: SubscriptionCanceled): void {
	// Event params
	let from = event.params.from.toHex()
	let to = event.params.to.toHex()


	// Block info
	let startBlock = event.block.number
	let startTime = event.block.timestamp


	// Subscription

	// Subscription ID = from + to + startBlock
	let subscriptionID = `${from}-${to}-${startBlock}`
	let subscriptionEntity = Subscription.load(subscriptionID) || new Subscription(subscriptionID)

	// ...

	subscriptionEntity.save()


	// `from` User

	let fromUserID = from
	let fromUserEntity = User.load(fromUserID) || new User(fromUserID)

	// ...

	fromUserEntity.save()


	// `to` User

	let toUserID = to
	let toUserEntity = User.load(toUserID) || new User(toUserID)

	// ...

	toUserEntity.save()
}
