import {derived, Readable} from 'svelte/store'
import {QueryState, queryStore} from '../_graphql'
// import {getWalletStores} from './wallet'

import type { Subscription, User, StreamableToken, UserStreamableTokenData, SubscriptionStatus } from '../types/subgraph'

// const {transactions} = getWalletStores()

export function getUser(address: string) {
	return queryStore<User>(`
		query ($id: String!) {
			user(id: $id) {
				id

				tokens {
					id

					token {
						id
						symbol
						name
						decimals
					}

					balance
					availableAmount

					totalIncomingRate
					totalMaxIncomingAmount
					totalIncomingSubscriptions
					totalSubscribers

					totalOutgoingRate
					totalMaxOutgoingAmount
					totalOutgoingSubscriptions
					totalSubscribedTo
				}

				incomingSubscriptions {
					id

					token {
						id
						symbol
						name
						decimals
					}
					from {
						id
					}
					to {
						id
					}

					status

					rate
					maxAmount
					amountPaid

					startBlock
					startTime
					endBlock
					endTime
				}
				totalIncomingSubscriptions
				totalSubscribers

				outgoingSubscriptions {
					id

					token {
						id
						symbol
						name
						decimals
					}
					from {
						id
					}
					to {
						id
					}

					status

					rate
					maxAmount
					amountPaid

					startBlock
					startTime
					endBlock
					endTime
				}
				totalOutgoingSubscriptions
				totalSubscribedTo

				history {
					id

					tokens {
						id

						token {
							id
							symbol
							name
							decimals
						}

						balance
						availableAmount

						totalIncomingRate
						totalMaxIncomingAmount
						totalIncomingSubscriptions
						totalSubscribers

						totalOutgoingRate
						totalMaxOutgoingAmount
						totalOutgoingSubscriptions
						totalSubscribedTo
					}

					totalIncomingSubscriptions
					totalSubscribers

					totalOutgoingSubscriptions
					totalSubscribedTo

					blockNumber
					timestamp
				}
			}
		}
	`, {
		variables: {
			id: address
		}
		// transform: 'subscriptions' // allow to access subscriptions directly
	})
}

export function getSubscription(from: string, to: string, token: string) {
	return queryStore<User>(`
		query ($from: String!, $to: String!, $token: String!)  {
			subscription(from: $from, to: $to, token: { symbol: $token }){
				id

				status

				token

				from {
					id
				}
				to {
					id
				}
				rate
				maxAmount
				amountPaid

				startBlock
				startTime
				endBlock
				endTime
			}
		}
	`, {
		variables: {
			from,
			to,
			token
		}
		// transform: 'subscriptions' // allow to access subscriptions directly
	})
}


// export const subscriptionsQuery = queryStore<Subscription[]>(`
// 	query {
// 		subscriptions(orderBy: startBlock, orderDirection: desc, first: 100) {
// 			id

// 			status

// 			token

// 			from {
// 				address
// 			}
// 			to {
// 				address
// 			}
// 			rate
// 			maxAmount
// 			amountPaid

// 			startBlock
// 			startTime
// 			endBlock
// 			endTime
// 		}
// 	}
// `, {
// 	transform: 'subscriptions' // allow to access subscriptions directly
// })
// if(globalThis.window){
// 	console.log('subscriptionsQuery', subscriptionsQuery)
// 	globalThis.window['subscriptionsQuery'] = subscriptionsQuery
// }

// Extend query store to include data from pending transactions
// export const subscriptionsIncludingPending: Readable<QueryState<Subscription[]>> & typeof subscriptionsQuery
// = derived([subscriptionsQuery, transactions], ([$query, $transactions]) => {
// 	if (!$query.data)
// 		return $query

// 	const data = [...$query.data]
// 	for (const tx of $transactions) {
// 		if (!tx.finalized && tx.args) {
// 			// based on args: so need to ensure args are available
// 			if (tx.status != 'cancelled' && tx.status !== 'failure') {
// 				const entityID = tx.from.toLowerCase()
// 				let entity = data.find(e => e.id.toLowerCase() === entityID)
// 				if(!entity){
// 					// @ts-ignore
// 					entity = {
// 						id: tx.from.toLowerCase()
// 					}
// 					data.unshift(entity)
// 				}
// 				// entity.message = tx.args[0] as string
// 				// entity.pending = tx.confirmations < 1
// 				// entity.timestamp = Math.floor(Date.now() / 1000).toString()
// 			}
// 		}
// 	}

// 	return {
// 		...$query,
// 		data: data.sort((a, b) => b.startBlock.sub(a.startBlock).toNumber())
// 	}
// }) as typeof subscriptionsQuery
// subscriptionsIncludingPending.fetch = subscriptionsQuery.fetch.bind(subscriptionsQuery)
// subscriptionsIncludingPending.cancel = subscriptionsQuery.cancel.bind(subscriptionsQuery)
// subscriptionsIncludingPending.acknowledgeError = subscriptionsQuery.acknowledgeError.bind(subscriptionsQuery)
