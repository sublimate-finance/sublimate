<script lang="ts">
	import type {Contract} from '@ethersproject/contracts'

	import { onMount } from 'svelte'
	let walletStores; onMount(async () => walletStores = (await import('../stores/wallet')).getWalletStores())

	function getContractInterfaces(chainContracts, walletContracts):
		| {
			contract: Contract
			name: string
			functions: {
				name: string
				inputs: {name: string; elemId: string}[]
				call: () => Promise<any>
			}[]
		}[]
		| undefined
	{
		return chainContracts &&
			Object.keys(chainContracts)
				.filter(
					(n: string) =>
						!n.endsWith('_Implementation') && !n.endsWith('_Proxy')
				)
				.map((n) => ({contract: chainContracts[n], name: n}))
				.map(({contract, name}) => ({
					contract: contract,
					name: name,
					functions: contract.interface.fragments
						.filter(
							(f) => f.type === 'function' && !(f as any).constant
						)
						.map((f) => {
							const inputs = f.inputs.map((i) => ({
								name: i.name,
								elemId: `${name}:${f.name}:${i.name}`,
							}))
							return {
								name: f.name,
								inputs,
								call: () => {
									const args = []
									for (const input of inputs) {
										args.push(
											(document.getElementById(
												input.elemId
											) as HTMLInputElement).value
										)
									}
									return walletContracts[name].functions[
										f.format()
									](...args)
								},
							}
						}),
				}))
	}

	import Address from './Address.svelte'
	import Blockie from './Blockie.svelte'
	import Button from './Button.svelte'
	import Modal from './Modal.svelte'
	import WalletAccess from './WalletAccess.svelte'
</script>

{#if walletStores}
	<WalletAccess>
		<div>
			{#if $walletStores.chain.contracts}
				<h2>Contracts</h2>

				{#each getContractInterfaces($walletStores.chain.contracts, $walletStores.wallet.contracts) as contractInterface}
					<h3>{contractInterface.name}</h3>
					{#each contractInterface.functions as func}
						<form>
							<label for={func.name}>{func.name}(</label>
							{#each func.inputs as input}
								<span>
									<label for={input.elemId}>{input.name}:</label>
									<input id={input.elemId} />
								</span>
							{/each}
							<span>)</span>
							<Button
								secondary={true}
								id={func.name}
								label={func.name}
								on:click={() => func.call()}>
								Submit
							</Button>
						</form>
					{/each}
				{/each}
			{/if}
		</div>
		<div>
			{#if $walletStores.wallet.address && $walletStores.chain.chainId}
				<h2>Transactions</h2>
				{#each $walletStores.transactions as tx}
					<h3>{tx.contractName}.{tx.method}({tx.args})</h3>
				{/each}
			{/if}
		</div>
	</WalletAccess>
{/if}
