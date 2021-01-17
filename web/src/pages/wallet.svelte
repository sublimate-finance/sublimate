<script lang="ts">
	import Button from '../components/Button.svelte'
	import WalletAccess from '../templates/WalletAccess.svelte'
	import {wallet, builtin, chain, flow, transactions} from '../stores/wallet'
	import type {Contract} from '@ethersproject/contracts'

	let contractInterfaces:
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
	$: (contractInterfaces as any) = // TODO investigate
		$chain.contracts &&
		Object.keys($chain.contracts)
			.filter(
				(n: string) =>
					!n.endsWith('_Implementation') && !n.endsWith('_Proxy')
			)
			.map((n) => ({contract: $chain.contracts[n], name: n}))
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
								return wallet.contracts[name].functions[
									f.format()
								](...args)
							},
						}
					}),
			}))
</script>

<WalletAccess>
	<div>
		<!-- <Button
			label="probe builtin wallet (like metamask)"
			waitOnDisabled={$builtin.probing}
			disabled={$builtin.state === 'Ready' || $builtin.probing}
			on:click={() => builtin.probe()}>
			probe Builtin
		</Button> -->
		<Button
			label="connect via builtin wallet"
			disabled={!$builtin.available || $wallet.connecting}
			on:click={() => wallet.connect('builtin')}>
			builtin
		</Button>
		<Button
			label="connect via discord"
			disabled={$wallet.connecting}
			on:click={() => wallet.connect('torus-discord')}>
			discord
		</Button>
		<Button
			label="unlock wallet"
			waitOnDisabled={$wallet.unlocking}
			disabled={$wallet.state !== 'Locked' || $wallet.unlocking}
			on:click={() => wallet.unlock()}>
			unlock
		</Button>
		<Button
			label="disconnect from wallet"
			waitOnDisabled={$wallet.connecting}
			disabled={$wallet.state !== 'Ready' || $wallet.connecting}
			on:click={() => wallet.disconnect()}>
			disconnect
		</Button>
	</div>

	<div>
		{#if $wallet.address}
			<p>
				<label for="wallet">Wallet</label>
				<span id="wallet">{$wallet.address}</span>
			</p>
		{/if}
	</div>
	<div>
		{#if $chain.contracts}
			<h2>Contracts</h2>

			{#each contractInterfaces as contractInterface}
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
		{#if $wallet.address && $chain.chainId}
			<h2>Transactions</h2>
			{#each $transactions as tx}
				<h3>{tx.contractName}.{tx.method}({tx.args})</h3>
			{/each}
		{/if}
	</div>
</WalletAccess>
