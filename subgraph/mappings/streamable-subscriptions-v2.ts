import { ByteArray, crypto, log } from '@graphprotocol/graph-ts'

// Entities
import { User, Subscription, SubscriptionStatus } from '../generated/schema'

// Events
import { SubscriptionStarted, SubscriptionUpdated, SubscriptionCanceled, UserStatusChanged } from '../generated/StreamableERC20/StreamableERC20Contract'


export function handleSubscriptionStarted(event: SubscriptionStarted): void {
	const from = event.params['from'].toHex()
	const to = event.params['to'].toHex()
	const rate = event.params['rate']
	const maxAmount = event.params['maxAmount']
	const startBlock = event.params['startBlock']
	const endBlock = event.params['endBlock']
	const amountPaid = event.params['amountPaid']


	// Subscription

	// Subscription ID is the hash of (`from` concatenated to `to`)
	const subscriptionID = crypto.keccak256(ByteArray.fromHexString(from.concat(to)))
	const subscriptionEntity = Subscription.load(subscriptionID) || new Subscription(subscriptionID)

	subscriptionEntity.from = from
	subscriptionEntity.to = to
	subscriptionEntity.rate = rate
	subscriptionEntity.maxAmount = maxAmount

	subscriptionEntity.startBlock = startBlock
	subscriptionEntity.startTime = event.block.timestamp
	subscriptionEntity.endBlock = endBlock
	subscriptionEntity.amountPaid = amountPaid
	subscriptionEntity.status = SubscriptionStatus.ACTIVE

	subscriptionEntity.save()


	// `from` User
	const fromUserID = from
	const fromUserEntity = User.load(fromUserID) || new User(fromUserID)

	fromUserEntity.save()


	// `to` User
	const toUserID = to
	const toUserEntity = User.load(toUserID) || new User(toUserID)

	toUserEntity.save()
}


export function handleSubscriptionCanceled(event: SubscriptionCanceled): void {
	const from = event.params['from'].toHex()
	const to = event.params['to'].toHex()
	const amountPaid = event.params['amountPaid']


	// Subscription

	// Subscription ID is the hash of (`from` concatenated to `to`)
	const subscriptionID = crypto.keccak256(ByteArray.fromHexString(from.concat(to)))
	const subscriptionEntity = Subscription.load(subscriptionID)


	subscriptionEntity.endBlock = event.block
	subscriptionEntity.endTime = event.block.timestamp
	subscriptionEntity.amountPaid = amountPaid
	subscriptionEntity.status = SubscriptionStatus.CANCELLED

	subscriptionEntity.save()

}

export function handleSubscriptionUpdated(event: SubscriptionUpdated): void {
	const from = event.params['from'].toHex()
	const to = event.params['to'].toHex()
	const amountPaid = event.params['amountPaid']


	// Subscription

	// Subscription ID is the hash of (`from` concatenated to `to`)
	const subscriptionID = crypto.keccak256(ByteArray.fromHexString(from.concat(to)))
	const subscriptionEntity = Subscription.load(subscriptionID)

	subscriptionEntity.amountPaid = amountPaid
	subscriptionEntity.status = SubscriptionStatus.ACTIVE

	subscriptionEntity.save()
}


export function handleUserStatusChanged(event: UserStatusChanged): void {
	// const from = event.params['from'].toHex()
	// const to = event.params['to'].toHex()
	// const rate = event.params['rate']
	// const maxAmount = event.params['maxAmount']
	// const startBlock = event.params['startBlock']
	// const endBlock = event.params['endBlock']
	// const amountPaid = event.params['amountPaid']
}
