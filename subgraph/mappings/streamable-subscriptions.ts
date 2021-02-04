import { ByteArray, crypto, log } from '@graphprotocol/graph-ts'

// Entities
import { User, Subscription } from '../generated/schema'

// Events
import { SubscriptionStarted, SubscriptionStopped, SubscriptionCanceled } from '../generated/StreamableERC20/StreamableERC20Contract'


export function handleSubscriptionStarted(event: SubscriptionStarted): void {
	const from = event.params['from'].toHex()
	const to = event.params['to'].toHex()
	const rate = event.params['rate']
	const maxAmount = event.params['maxAmount']


	// Subscription

	// Subscription ID is the hash of (`from` concatenated to `to`)
	const subscriptionID = crypto.keccak256(ByteArray.fromHexString(from.concat(to)))
	const subscriptionEntity = Subscription.load(subscriptionID) || new Subscription(subscriptionID)

	subscriptionEntity.from = from
	subscriptionEntity.to = to
	subscriptionEntity.rate = rate
	subscriptionEntity.maxAmount = maxAmount

	subscriptionEntity.startBlock = event.block.number
	subscriptionEntity.startTime = event.block.timestamp
	// subscriptionEntity.endBlock =
	// subscriptionEntity.endTime =

	subscriptionEntity.save()


	// `from` User

	const fromUserID = from
	const fromUserEntity = User.load(fromUserID) || new User(fromUserID)

	// fromUserID.balance =
	// ...

	fromUserEntity.save()


	// `to` User

	const toUserID = to
	const toUserEntity = User.load(toUserID) || new User(toUserID)

	// toUserID.balance =
	// ...

	toUserEntity.save()
}


export function handleSubscriptionStopped(event: SubscriptionStopped): void {
	const from = event.params['from'].toHex()
	const to = event.params['to'].toHex()


	// Subscription

	// Subscription ID is the hash of (`from` concatenated to `to`)
	const subscriptionID = crypto.keccak256(ByteArray.fromHexString(from.concat(to)))
	const subscriptionEntity = Subscription.load(subscriptionID) || new Subscription(subscriptionID)

	// ...

	subscriptionEntity.save()


	// `from` User

	const fromUserID = from
	const fromUserEntity = User.load(fromUserID) || new User(fromUserID)

	// ...

	fromUserEntity.save()


	// `to` User

	const toUserID = to
	const toUserEntity = User.load(toUserID) || new User(toUserID)

	// ...

	toUserEntity.save()
}


export function handleSubscriptionCanceled(event: SubscriptionCanceled): void {
	const from = event.params['from'].toHex()
	const to = event.params['to'].toHex()


	// Subscription

	// Subscription ID is the hash of (`from` concatenated to `to`)
	const subscriptionID = crypto.keccak256(ByteArray.fromHexString(from.concat(to)))
	const subscriptionEntity = Subscription.load(subscriptionID) || new Subscription(subscriptionID)

	// ...

	subscriptionEntity.save()


	// `from` User

	const fromUserID = from
	const fromUserEntity = User.load(fromUserID) || new User(fromUserID)

	// ...

	fromUserEntity.save()


	// `to` User

	const toUserID = to
	const toUserEntity = User.load(toUserID) || new User(toUserID)

	// ...

	toUserEntity.save()
}
