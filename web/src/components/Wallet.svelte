<script lang="ts">
	import { utils } from 'ethers'

	import { onMount } from 'svelte'
	let walletStores, transactions, balance, chain, fallback, builtin, wallet, flow
	onMount(async () => walletStores = {transactions, balance, chain, fallback, builtin, wallet, flow} = (await import('../stores/wallet')).getWalletStores())

	let balanceETH
	let balanceStreamableWrappedETH
	let balanceStreamableDAI

	const decimals = 18
	$: if(walletStores) (async () => {
		while(true){
			if(wallet.contracts && wallet.address){
				balanceStreamableWrappedETH = await wallet.contracts.StreamableWrappedETH.lastUpdatedBalanceOf(wallet.address)
				balanceStreamableDAI = await wallet.contracts.StreamableDAI.lastUpdatedBalanceOf(wallet.address)
			}
			await new Promise(r => setTimeout(r, 2000))
		}
	})()
	// $: flow?.execute(async contracts => {
	// 	while(true){
	// 		if(wallet.address){
	// 			balanceStreamableWrappedETH = (await contracts.StreamableWrappedETH.lastUpdatedBalanceOf(wallet.address))
	// 			balanceStreamableDAI = (await contracts.StreamableDAI.lastUpdatedBalanceOf(wallet.address))
	// 		}

	// 		await new Promise(r => setTimeout(r, 5000))
	// 	}
	// })

	let modalIsOpen = false

	import Address from './Address.svelte'
	import Blockie from './Blockie.svelte'
	import Button from './Button.svelte'
	import Modal from './Modal.svelte'
	import TokenValue from './TokenValue.svelte'
</script>

<style>
	:global(.wallet-badge) {
		--space-outer: 0.5em;
		--space-inner: 1em;
		line-height: 1;
	}

	.wallet-options {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));

		--space-inner: 0.75em;
		gap: var(--space-inner);
	}

	.address-badge {
		display: flex;
		align-items: center;
		background-color: white;
		border-radius: inherit;
		padding: var(--space-outer);
		line-height: 1;
	}
</style>

{#if walletStores}
	<div class="stack">
		{#if $wallet.address}
			<!-- <button class="flex flex-row items-center space-x-3 px-2 py-1 pl-4 bg-purple-200 rounded-md border-none neumorphic" on:click={() => modalIsOpen = !modalIsOpen}>
				<TokenValue value={ethAmount} token="ETH" />
				<div class="flex flex-row items-center rounded-md bg-white pl-3 pr-1 py-1 space-x-1 font-semibold">
					<Address address={$wallet.address} format="middle-truncated" linked={false} />
					<div class="rounded-full overflow-hidden w-4 h-4">
						<Blockie address={$wallet.address} />
					</div>
				</div>
			</button> -->
			<Button class="wallet-badge button row neumorphic" on:click={() => modalIsOpen = !modalIsOpen}>
				{#if balanceETH !== undefined}
					<TokenValue value={utils.formatUnits(balanceETH, decimals)} token="ETH" showDecimalPlaces={10} />
				{/if}
				{#if balanceStreamableWrappedETH !== undefined}
					<TokenValue value={utils.formatUnits(balanceStreamableWrappedETH, decimals)} token="strETH" showDecimalPlaces={10} />
				{/if}
				{#if balanceStreamableDAI !== undefined}
					<TokenValue value={utils.formatUnits(balanceStreamableDAI, decimals)} token="strDAI" showDecimalPlaces={10} />
				{/if}
				<div class="address-badge row">
					<Address address={$wallet.address} format="middle-truncated" linked={false} />
					<div class="rounded-full overflow-hidden w-4 h-4">
						<Blockie address={$wallet.address} />
					</div>
				</div>
			</Button>
		{:else}
			<div>
				<Button class="accented" on:click={() => modalIsOpen = !modalIsOpen}>
					Connect Wallet
				</Button>
			</div>
		{/if}
	</div>

	<Modal bind:isOpen={modalIsOpen} title="Connect Wallet" width="30rem">
		{#if $wallet.address}
			<div>
				<p>
					You're signed in as
					<Blockie address={$wallet.address} />
					<Address address={$wallet.address} format="middle-truncated" />!
				</p>
			</div>
		{/if}
		<div class="stack">
			{#if $wallet.state === 'Ready' && !$wallet.connecting}
				<div>
					<Button
						label="Disconnect Wallet"
						waitOnDisabled={$wallet.connecting}
						on:click={() => wallet.disconnect()}>
						Disconnect Wallet
					</Button>
				</div>
			{:else}
				<div class="column">
					<p>Sign in with an Ethereum wallet to customize your creator page, contribute to other creators, and more!</p>
					<div class="wallet-options">
						{#if $wallet.state === 'Idle'}
							<Button
								label="Connect MetaMask Wallet"
								disabled={!$builtin.available || $wallet.connecting}
								on:click={() => wallet.connect('builtin')}>
								MetaMask
							</Button>
							<Button
								label="Connect WalletConnect Wallet"
								disabled={!$builtin.available || $wallet.connecting}
								on:click={() => wallet.connect('walletconnect')}>
								WalletConnect
							</Button>
							<Button
								label="Connect Torus Wallet"
								disabled={$wallet.connecting}
								on:click={() => wallet.connect('torus-google')}>
								Torus (Google)
							</Button>
							<Button
								label="Connect Torus Wallet"
								disabled={$wallet.connecting}
								on:click={() => wallet.connect('torus-facebook')}>
								Torus (Facebook)
							</Button>
							<Button
								label="Connect Torus Wallet"
								disabled={$wallet.connecting}
								on:click={() => wallet.connect('torus-discord')}>
								Torus (Discord)
							</Button>
						{:else if $wallet.state === 'Locked' && !$wallet.connecting}
							<Button
								label="Unlock Wallet"
								waitOnDisabled={$wallet.unlocking}
								on:click={() => wallet.unlock()}>
								Unlock Wallet
							</Button>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</Modal>
{/if}
