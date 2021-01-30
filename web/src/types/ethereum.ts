export namespace Ethereum {
	export type NetworkID = number
	export type Network = 'mainnet' | 'ropsten' | 'rinkeby' | 'goerli' | 'kovan' | 'classic'

	export type Address = string
	export type TransactionID = string
	export type BlockNumber = number

	export type ContractAddress = string
}

// https://github.com/ethereum-lists/chains
// https://chainid.network
export const evmNetworkByID: Record<Ethereum.NetworkID, Ethereum.Network> = {
	1: 'mainnet',
	3: 'ropsten',
	4: 'rinkeby',
	5: 'goerli',
	42: 'kovan'
}