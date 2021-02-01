<script lang="ts">
	let modalIsOpen = false
	let ethAmount = 12.795

	import { onMount } from 'svelte'
	let walletStores; onMount(async () => walletStores = (await import('../stores/wallet')).getWalletStores())

	import Address from './Address.svelte'
	import Blockie from './Blockie.svelte'
	import Button from './Button.svelte'
	import Modal from './Modal.svelte'
	import TokenValue from './TokenValue.svelte'
</script>

<style>
	:global(.wallet-badge) {
		--space-outer: 0.5em;
		--space-inner: 0.5em;
	}

	.wallet-options {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
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
		{#if $walletStores.wallet.address}
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
				<TokenValue value={ethAmount} token="ETH" />
				<div class="address-badge row">
					<Address address={$walletStores.wallet.address} format="middle-truncated" linked={false} />
					<div class="rounded-full overflow-hidden w-4 h-4">
						<Blockie address={$walletStores.wallet.address} />
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

	{#if modalIsOpen}
		<Modal title="Connect Wallet" width="30rem" on:close={() => modalIsOpen = false}>
			{#if $walletStores.wallet.address}
				<div>
					<p>
						You're signed in as
						<Blockie address={$walletStores.wallet.address} />
						<Address address={$walletStores.wallet.address} format="middle-truncated" />!
					</p>
				</div>
			{/if}
			<div class="stack">
				{#if $walletStores.wallet.state === 'Ready' && !$walletStores.wallet.connecting}
					<div>
						<Button
							label="Disconnect Wallet"
							waitOnDisabled={$walletStores.wallet.connecting}
							on:click={() => walletStores.wallet.disconnect()}>
							Disconnect Wallet
						</Button>
					</div>
				{:else}
					<div class="column">
						<p>Sign in with an Ethereum wallet to customize your creator page, contribute to other creators, and more!</p>
						<div class="wallet-options">
							{#if $walletStores.wallet.state === 'Idle'}
								<Button
									label="Connect MetaMask Wallet"
									disabled={!$walletStores.builtin.available || $walletStores.wallet.connecting}
									on:click={() => walletStores.wallet.connect('builtin')}>
									MetaMask
								</Button>
								<Button
									label="Connect WalletConnect Wallet"
									disabled={!$walletStores.builtin.available || $walletStores.wallet.connecting}
									on:click={() => walletStores.wallet.connect('walletconnect')}>
									WalletConnect
								</Button>
								<Button
									label="Connect Torus Wallet"
									disabled={$walletStores.wallet.connecting}
									on:click={() => walletStores.wallet.connect('torus-google')}>
									Torus (Google)
								</Button>
								<Button
									label="Connect Torus Wallet"
									disabled={$walletStores.wallet.connecting}
									on:click={() => walletStores.wallet.connect('torus-facebook')}>
									Torus (Facebook)
								</Button>
								<Button
									label="Connect Torus Wallet"
									disabled={$walletStores.wallet.connecting}
									on:click={() => walletStores.wallet.connect('torus-discord')}>
									Torus (Discord)
								</Button>
							{:else if $walletStores.wallet.state === 'Locked' && !$walletStores.wallet.connecting}
								<Button
									label="Unlock Wallet"
									waitOnDisabled={$walletStores.wallet.unlocking}
									on:click={() => walletStores.wallet.unlock()}>
									Unlock Wallet
								</Button>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		</Modal>
	{/if}
{/if}
