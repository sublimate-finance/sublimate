<script lang="ts">
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

  import Address from './Address.svelte'
  import Blockie from './Blockie.svelte'
	import Button from './Button.svelte'
	import WalletAccess from './WalletAccess.svelte'
</script>

<WalletAccess>
	<div>
		{#if $wallet.state === 'Idle'}
			<Button
				label="Connect MetaMask Wallet"
				disabled={!$builtin.available || $wallet.connecting}
				on:click={() => wallet.connect('builtin')}>
				Connect MetaMask Wallet
			</Button>
			<Button
				label="Connect Torus Wallet"
				disabled={$wallet.connecting}
				on:click={() => wallet.connect('torus-google')}>
				Connect Torus Wallet (Google)
			</Button>
			<Button
				label="Connect Torus Wallet"
				disabled={$wallet.connecting}
				on:click={() => wallet.connect('torus-facebook')}>
				Connect Torus Wallet (Facebook)
			</Button>
			<Button
				label="Connect Torus Wallet"
				disabled={$wallet.connecting}
				on:click={() => wallet.connect('torus-discord')}>
				Connect Torus Wallet (Discord)
			</Button>
		{/if}
		{#if $wallet.state === 'Locked' && !$wallet.connecting}
			<Button
				label="Unlock Wallet"
				waitOnDisabled={$wallet.unlocking}
				on:click={() => wallet.unlock()}>
				Unlock Wallet
			</Button>
		{/if}
		{#if $wallet.state === 'Ready' && !$wallet.connecting}
			<Button
				label="Disconnect Wallet"
				waitOnDisabled={$wallet.connecting}
				on:click={() => wallet.disconnect()}>
				Disconnect Wallet
			</Button>
		{/if}
	</div>

	{#if $wallet.address}
    <Blockie address={$wallet.address} />
		<Address address={$wallet.address} format="middle-truncated" />
	{/if}
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
