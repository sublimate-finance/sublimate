<script lang="ts">
	export let title: string = undefined

	import { onMount } from 'svelte'
	let walletStores; onMount(async () => walletStores = (await import('../stores/wallet')).getWalletStores())

	const chainNames = {
		'1': 'mainnet',
		'3': 'ropsten',
		'4': 'rinkeby',
		'5': 'goerli',
		'42': 'kovan',
		'1337': 'localhost chain',
		'31337': 'localhost chain',
	}
	const chainId = '1337' // import.meta.env.VITE_CHAIN_ID
	const chainName = (() => {
		const name = chainNames[chainId]
		if (name) {
			return name
		}
		return `chain with id ${chainId}`
	})()

	const base: string = globalThis.basepath || '/'

	let options: {img: string; id: string; name: string}[] = []

	$: if(walletStores)
		options = $walletStores.wallet.options
			.filter((v) => v !== 'builtin' || $walletStores.builtin.available)
			.map((v) => {
				return {
					img: ((v) => {
						if (v === 'builtin') {
							if ($walletStores.builtin.state === 'Ready') {
								if ($walletStores.builtin.vendor === 'Metamask') {
									return 'images/metamask.svg'
								} else if ($walletStores.builtin.vendor === 'Opera') {
									return 'images/opera.svg'
								}
							}
							return 'images/web3-default.png'
						} else {
							if (v.startsWith('torus-')) {
								const verifier = v.slice(6)
								return `images/torus/${verifier}.svg`
							}
							return `images/${v}.svg`
						}
					})(v),
					id: v,
					name: v,
				}
			})

	import Button from '../components/Button.svelte'
	import Toast from '../components/Toast.svelte'
	import Modal from '../components/Modal.svelte'
</script>

<slot />

{#if walletStores}
	{#if $walletStores.flow.inProgress}
		<Modal
			{title}
			cancelable={!$walletStores.wallet.connecting}
			on:close={() => walletStores.flow.cancel()}
			closeButton={false}>
			{#if $walletStores.wallet.state === 'Idle'}
				{#if $walletStores.wallet.loadingModule}
					Loading module:
					{$walletStores.wallet.selected}
				{:else if $walletStores.wallet.connecting}
					Connecting to wallet...
				{:else}
					<div class="text-center">
						<p>You need to connect your wallet.</p>
					</div>
					<div class="flex flex-wrap justify-center pb-3">
						{#each options as option}
							<img
								class="cursor-pointer p-2 m-2 border-2 h-12 w-12 object-contain"
								alt={`Login with ${option.name}`}
								src={`${base}${option.img}`}
								on:click={() => walletStores.wallet.connect(option.id)} />
						{/each}
					</div>
					<!-- Built-in needs installation -->
					{#if $walletStores.wallet.options.filter((v) => v === 'builtin' && !$walletStores.builtin.available).length > 0}
						<div class="text-center">OR</div>
						<div class="flex justify-center">
							<Button
								label="Download Metamask"
								blank={true}
								href="https://metamask.io/download.html"
								class="m-4 w-max-content">
								<img
									class="cursor-pointer p-0 mx-2 h-10 w-10 object-contain"
									alt={`Download Metamask}`}
									src={`${base}images/metamask.svg`} />
								Download MetaMask
							</Button>
						</div>
					{/if}
				{/if}
			{:else if $walletStores.wallet.state === 'Locked'}
				{#if $walletStores.wallet.unlocking}
					Please accept the application to access your wallet.
				{:else}
					<Button label="Unlock Wallet" on:click={() => walletStores.wallet.unlock()}>
						Unlock
					</Button>
				{/if}
			{:else if $walletStores.chain.state === 'Idle'}
				{#if $walletStores.chain.connecting}Connecting...{/if}
			{:else if $walletStores.chain.state === 'Connected'}
				{#if $walletStores.chain.loadingData}
					Loading contracts...
				{:else if $walletStores.chain.notSupported}Please switch to {chainName}{/if}
			{:else if $walletStores.wallet.pendingUserConfirmation}
				Please accept transaction...
			{:else if $walletStores.flow.executionError}
				{#if $walletStores.flow.executionError.code === 4001}
					You rejected the request
				{:else if $walletStores.flow.executionError.message}
					{$walletStores.flow.executionError.message}
				{:else}Error: {$walletStores.flow.executionError}{/if}
				<Button label="Retry" on:click={() => walletStores.flow.retry()}>Retry</Button>
			{/if}
		</Modal>
	{/if}
{/if}
