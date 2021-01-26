<script lang="ts">
	import {wallet, builtin} from '../stores/wallet'

	let modalIsOpen = false

	import Address from './Address.svelte'
	import Blockie from './Blockie.svelte'
	import Button from './Button.svelte'
	import Modal from './Modal.svelte'
</script>

<style>
	.wallet-options {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
		gap: var(--space-inner);
	}
</style>

{#if $wallet.address}
	<button class="flex flex-row items-center space-x-3 px-2 py-1 pl-4 bg-purple-200 rounded-md border-none shadow-inner" on:click={() => modalIsOpen = !modalIsOpen}>
		<span class="">
			12.765 ETH <!-- FIXME: text is not misaligned vertically due missing css reset -->
		</span>
		<div class="flex flex-row items-center rounded-md bg-white pl-3 pr-1 py-1 space-x-1 font-semibold">
			<Address address={$wallet.address} format="middle-truncated" linked={false} />
			<div class="rounded-full overflow-hidden w-4 h-4">
				<Blockie address={$wallet.address} />
			</div>
		</div>
	</button>
{:else}
	<Button on:click={() => modalIsOpen = !modalIsOpen}>
		Connect Wallet
	</Button>
{/if}

{#if modalIsOpen}
	<Modal title="Connect Wallet" width="30rem" on:close={() => modalIsOpen = false}>
		{#if $wallet.address}
			<div>
				You're signed in as
				<Blockie address={$wallet.address} />
				<Address address={$wallet.address} format="middle-truncated" />
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
				<div class="wallet-options">
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
					{:else if $wallet.state === 'Locked' && !$wallet.connecting}
						<Button
							label="Unlock Wallet"
							waitOnDisabled={$wallet.unlocking}
							on:click={() => wallet.unlock()}>
							Unlock Wallet
						</Button>
					{/if}
				</div>
			{/if}
		</div>
	</Modal>
{/if}
