<script lang="ts">
	export let title: string = undefined
	export let estimatedGas

	import { onMount } from 'svelte'
	let walletStores, transactions, balance, chain, fallback, builtin, wallet, flow
	onMount(async () => walletStores = {transactions, balance, chain, fallback, builtin, wallet, flow} = (await import('../stores/wallet')).getWalletStores())

	const chainNames = {
		'1': 'Mainnet',
		'3': 'Ropsten',
		'4': 'Rinkeby',
		'5': 'Goerli',
		'42': 'Kovan',
		'1337': 'Localhost',
		'31337': 'Localhost',
	}
	const chainId = '42' // import.meta.env.VITE_CHAIN_ID

	const base: string = globalThis.basepath || '/'

	const walletImages = {
		// Browser built-in vendors
		'Metamask': 'images/metamask.svg',
		'Opera': 'images/opera.svg',

		'walletconnect': 'images/walletconnect.svg',
		'torus-google': 'images/torus/google.svg',
		'torus-facebook': 'images/torus/facebook.svg',
		'torus-discord': 'images/torus/discord.svg'
	}

	let walletOptions: {id: string, name: string, img: string}[] = []
	$: if(walletStores)
		walletOptions = $wallet.options
			.filter(option => !(option === 'builtin' && !$builtin.available))
			.map(option => ({
				id: option,
				name: option === 'builtin' ? $builtin.vendor : option,
				img: walletImages[option === 'builtin' ? $builtin.vendor : option],
			}))

	import Button from '../components/Button.svelte'
	import LoadingSpinner from '../components/LoadingSpinner.svelte'
	import Modal from '../components/Modal.svelte'
	import {scale} from 'svelte/transition'
</script>

<style>
	hr:first-child {
		display: none;
	}
</style>

{#if walletStores}
	{#if $flow.inProgress}
		<Modal
			{title}
			cancelable={!$wallet.connecting}
			isOpen={true}
			on:close={() => flow.cancel()}
			closeButton={false}
			width="clamp(0%, 35rem, 90%)"
			>
			{#if $wallet.state === 'Idle'}
				{#if $wallet.loadingModule}
					Loading module:
					{$wallet.selected}
				{:else if $wallet.connecting}
					Connecting to wallet...
				{:else}
					<div class="text-center">
						<p>You need to connect your wallet.</p>
					</div>
					<div class="flex flex-wrap justify-center pb-3">
						{#each walletOptions as {id, name, img}}
							<Button
								label="Connect {name} Wallet"
								disabled={!$builtin.available || $wallet.connecting}
								on:click={() => wallet.connect(id)}>
								<img src="{base}{img}" alt={name} width="25" />
								{name}
							</Button>
						{/each}
					</div>
					<!-- Built-in needs installation -->
					{#if $wallet.options.some(option => option === 'builtin' && !$builtin.available)}
						<div class="text-center">OR</div>
						<div class="flex justify-center">
							<Button label="Download Metamask" blank={true} href="https://metamask.io/download.html" class="m-4 w-max-content">
								<img
									class="cursor-pointer p-0 mx-2 h-10 w-10 object-contain"
									alt={`Download Metamask}`}
									src={`${base}images/metamask.svg`} />
								Download MetaMask
							</Button>
						</div>
					{/if}
				{/if}
			{:else if $wallet.state === 'Locked'}
				{#if $wallet.unlocking}
					Please allow access to this application in your wallet.
				{:else}
					<Button label="Unlock Wallet" on:click={() => wallet.unlock()}>Unlock</Button>
				{/if}
			{:else if $chain.state === 'Idle'}
				{#if $chain.connecting}
					<span><LoadingSpinner /> Connecting to the blockchain...</span>
				{:else}
					(Nothing to see here...)
				{/if}
			{:else if $chain.state === 'Connected'}
				{#if $chain.loadingData}
					<span><LoadingSpinner /> Loading contracts...</span>
				{:else if $chain.notSupported}
					Please switch to the {chainNames[chainId]} chain (id: {chainId})
				{/if}
			{:else}
				{#if $$slots.default}
					<slot />
					<hr transition:scale>
				{/if}
				<div class="stack">
					{#if $wallet.pendingUserConfirmation}
						<div class="bar" transition:scale>
							<span><LoadingSpinner /> Approving transaction...</span>
							<!-- <span><LoadingSpinner /> Please approve the transaction in your wallet...</span> -->
							{#if estimatedGas}
								<small>Estimated Gas: <mark>{estimatedGas} gas units</mark></small>
							{/if}
						</div>

					<!-- Temporary for demo -->
					{:else if $flow.executionError && $flow.executionError.message === 'The execution failed due to an exception.' && $flow.executionError.data === 'Reverted'}
						Transaction sent.

					{:else if $flow.executionError}
						<div class="bar" transition:scale>
							<p>
								{#if $flow.executionError.code === 4001}
									You canceled the transaction.
								{:else if $flow.executionError.data && $flow.executionError.data.message}
									{$flow.executionError.data.message}
								{:else if $flow.executionError.message}
									{$flow.executionError.message}
									{#if $flow.executionError.data}
										<pre>{$flow.executionError.data}</pre>
									{/if}
								{:else}
									Error: {$flow.executionError}
								{/if}
							</p>
							<Button label="Retry" on:click={() => flow.retry()}>Retry</Button>
						</div>
					{/if}
				</div>
			{/if}
		</Modal>
	{/if}
{/if}
