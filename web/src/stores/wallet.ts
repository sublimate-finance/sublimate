import WalletStores from 'web3w'
import {PortisModuleLoader} from 'web3w-portis-loader'
import {TorusModuleLoader} from 'web3w-torus-loader'
import {WalletConnectModuleLoader} from 'web3w-walletconnect-loader'
import contractsInfo from '../contracts.json'
import {notifications} from './notifications'

let walletStores: ReturnType<typeof WalletStores>

export function getWalletStores(){
	if(!walletStores){
		const chainId = '42' // import.meta.env.VITE_CHAIN_ID
		let nodeUrl: string | undefined
		let finality = 12
		if (chainId === '1337' || chainId === '31337') {
			const localEthNode = undefined // import.meta.env.VITE_ETH_NODE_URI_LOCALHOST
			if (localEthNode && localEthNode !== '') {
				nodeUrl = localEthNode
			} else {
				nodeUrl = 'http://localhost:8545'
			}
			finality = 2
		}

		walletStores = WalletStores({
			chainConfigs: contractsInfo,
			builtin: {autoProbe: true},
			transactions: {
				autoDelete: false,
				finality,
			},
			localStoragePrefix:
				globalThis.basepath &&
				(globalThis.basepath.startsWith('/ipfs/') ||
				globalThis.basepath.startsWith('/ipns/'))
					? globalThis.basepath.slice(6)
					: undefined, // ensure local storage is not conflicting across web3w-based apps on ipfs gateways
			options: [
				'builtin',
				new PortisModuleLoader('1b6e507b-5355-432c-a729-8945e0c54b38', {chainId}),
				new WalletConnectModuleLoader({
					nodeUrl,
					chainId,
					infuraId: 'bc0bdd4eaac640278cdebc3aa91fabe4',
				}),
				new TorusModuleLoader({verifier: 'google', nodeUrl, chainId}),
				new TorusModuleLoader({verifier: 'facebook', nodeUrl, chainId}),
				new TorusModuleLoader({verifier: 'discord', nodeUrl, chainId}),
			],
		})

		// USEFUL FOR DEBUGGING:
		if (typeof window !== 'undefined') {
			// console.log('adding walletStores');
			/* eslint-disable @typescript-eslint/no-explicit-any */
			;(window as any).walletStores = walletStores
			/* eslint-enable @typescript-eslint/no-explicit-any */
		}


		walletStores.transactions.subscribe(($transactions) => {
			for (const tx of $transactions.concat()) {
				if (tx.confirmations > 0 && !tx.acknowledged) {
					if (tx.status === 'failure') {
						// Notify failure
						notifications.queue({
							id: tx.hash,
							delay: 0,
							title: 'Transaction Error',
							text: `The <a href="https://kovan.etherscan.io/tx/${tx.hash}" target="_blank">transaction</a> failed.`,
							type: 'error',
							onAcknowledge: () => walletStores.transactions.acknowledge(tx.hash, 'failure'),
						})
					} else if (tx.status === 'cancelled') {
						// Notify cancelled
						notifications.queue({
							id: tx.hash,
							delay: 0, // 3
							title: 'Transaction Canceled',
							text: `The <a href="https://kovan.etherscan.io/tx/${tx.hash}" target="_blank">transaction</a> was canceled.`,
							type: 'info',
							onAcknowledge: () => walletStores.transactions.acknowledge(tx.hash, 'cancelled'),
						})
					} else if (tx.status === 'success') {
						// Notify successful
						notifications.queue({
							id: tx.hash,
							delay: 0, // 3
							title: 'Transaction Successful',
							text: `The <a href="https://kovan.etherscan.io/tx/${tx.hash}" target="_blank">transaction</a> has completed successfully.`,
							type: 'info',
							onAcknowledge: () => walletStores.transactions.acknowledge(tx.hash, tx.status),
						})

						// auto acknowledge
						// walletStores.transactions.acknowledge(tx.hash, tx.status)
					}
				}
			}
		})
	}

	return walletStores
}
