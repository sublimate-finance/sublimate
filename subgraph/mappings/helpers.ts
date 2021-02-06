import { log, BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'
import {StreamableToken, User, UserStreamableTokenData} from "../generated/schema";
import {StreamableERC20Contract} from "../generated/StreamableWrappedETH/StreamableERC20Contract";
export const ZERO_BI = BigInt.fromI32(0)

export function loadOrCreateUser(address: string): User {
	let user = User.load(address)
	if (user == null) {
		user = new User(address)
		user.save()
	}
	return user
}

export function createUserStreamableTokenData(id: string, userId: string, tokenId: string): UserStreamableTokenData {
	const userStreamableTokenData = new UserStreamableTokenData(id)
	userStreamableTokenData.user = userId
	userStreamableTokenData.token = tokenId
	userStreamableTokenData.totalIncomingRate = ZERO_BI
	userStreamableTokenData.totalMaxIncomingAmount = ZERO_BI
	userStreamableTokenData.totalSubscribers = 0
	userStreamableTokenData.totalIncomingSubscriptions = 0

	userStreamableTokenData.totalOutgoingRate = ZERO_BI
	userStreamableTokenData.totalMaxOutgoingAmount = ZERO_BI
	userStreamableTokenData.totalOutgoingSubscriptions = 0
	userStreamableTokenData.totalSubscribedTo = 0
	userStreamableTokenData.save()
	return userStreamableTokenData
}

export function createStreamableToken(id: Address): StreamableToken {
	const streamableToken = new StreamableToken(id.toHex())
	const contract = getStreamableERC20Contract(id)
	streamableToken.symbol = contract.symbol()
	streamableToken.name = contract.name()
	streamableToken.decimals = contract.decimals()
	streamableToken.save()
	return streamableToken
}

export function getUserStreamableTokenDataId(userId: string, tokenId: string): string {
	return `${userId}-${tokenId}`;
}

export function getSubscriptionId(tokenAddress: string, from: string, to: string, startBlock: BigInt): string {
	return `${tokenAddress}-${from}-${to}-${startBlock}`
}

export function getStreamableERC20Contract(address: Address): StreamableERC20Contract {
	return StreamableERC20Contract.bind(address)
}

export function getLastUpdatedBalanceOf(contractAddress: Address, userAddress: Address): BigInt {
	const contract = getStreamableERC20Contract(userAddress)
	return contract.lastUpdatedBalanceOf(userAddress)
}
