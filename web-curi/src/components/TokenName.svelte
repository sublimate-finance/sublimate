<script lang="ts">
	import type { Ethereum } from '../types/ethereum'
	import type { TickerSymbol } from '../types/currency'

	export let token: TickerSymbol
	export let tokenAddress: Ethereum.ContractAddress
	export let tokenIcon: string

	import TokenIcon from './TokenIcon.svelte'
</script>

<style>
	.token-value-container {
		display: inline-grid;
		grid-auto-flow: column;
		justify-content: start;
		align-items: baseline;
		--padding-inner: 0.33em;
		gap: var(--padding-inner);
	}

	.token-name {
		/* font-weight: 300;
		font-size: 0.8em; */

		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>

<span class="token-value-container">
	<TokenIcon {token} {tokenAddress} {tokenIcon} />
	<span class="token-name">{token}</span>
</span>