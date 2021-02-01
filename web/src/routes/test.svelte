<script lang="ts">
	import {BigNumber, utils} from 'ethers'
	const {hexConcat, keccak256} = utils

	export function test(address: string, name: string): BigNumber {
		return BigNumber.from(
			hexConcat([
				address,
				name
				// keccak256(['address', 'string'], [address, name]),
				// keccak256(['string', 'address'], [name, address]),
			])
		)
	}

	import {logs} from 'named-logs';

	import { onMount } from 'svelte'
	let walletStores
	let messages
	onMount(async () => {
		walletStores = (await import('../stores/wallet')).getWalletStores()

		messages = (await import('../stores/messages')).messages
		messages.fetch()
	})

	async function setMessage() {
		await walletStores.flow.execute((contracts) =>
			contracts.GreetingsRegistry.setMessage(message)
		);
	}

	const console = logs('app:home');

	let message: string = undefined;

	console.log(
		'CommonLib',
		test('0x0000000000000000000000000000000000000001', 'hello')
	);

	import Blockie from '../components/Blockie.svelte';
	import Button from '../components/Button.svelte';
	import Contracts from '../components/Contracts.svelte';
	import LoadingSpinner from '../components/LoadingSpinner.svelte';
	import WalletAccess from '../components/WalletAccess.svelte';
</script>

<style>
</style>

<Contracts />

{#if walletStores}
	<WalletAccess>
		<section class="py-8 px-4">
			{#if !$messages.state}
				<div>Messages not loaded</div>
			{:else if $messages.error}
				<div>Error: {$messages.error}</div>
			{:else if $messages.state === 'Fetching'}
				<div>Loading Messages...</div>
			{:else}
				{#each $messages.data as message, index}
					<!-- <Blockie address={name.id} /> -->
					<div
						class={`flex flex-wrap items-center -mx-2 ${$walletStores.wallet.address && message.id.toLowerCase() === $walletStores.wallet.address.toLowerCase() ? 'font-bold' : 'font-normal'}`}>
						<!-- <div class="px-2 mb-6">
							<h2 class="text-xl">{`${name.id.slice(0, 4)}...${name.id.slice(name.id.length - 4)}`} :</h2>
						</div> -->
						<Blockie address={message.id} class="m-1" />
						<span class="px-2">
							<p>
								{message.message}
								{#if message.pending}
									<LoadingSpinner />
								{/if}
							</p>
						</span>
					</div>
				{/each}
			{/if}
		</section>

		<form class="w-full max-w-sm">
			<div class="flex items-center border-b border-pink-600 py-2">
				<input
					class="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-gray-300 mr-3 py-1 px-2
						leading-tight focus:outline-none"
					type="text"
					placeholder="Hello world!"
					aria-label="Your Message"
					bind:value={message} />
				<button
					disabled={!message || message === ''}
					on:click={setMessage}
					class="button flex-shrink-0 bg-pink-600 hover:bg-pink-700 border-pink-600 hover:border-pink-700 text-sm border-4
						text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
					type="button">
					Say It!
				</button>
			</div>
		</form>

		{#if $walletStores.wallet.state === 'Ready'}
			<form class="mt-5 w-full max-w-sm">
				<div class="flex items-center">
					<Button
						disabled={$walletStores.wallet.unlocking || $walletStores.chain.connecting}
						on:click={() => walletStores.wallet.disconnect()}>
						Disconnect
					</Button>
				</div>
			</form>
		{/if}
	</WalletAccess>
{/if}
