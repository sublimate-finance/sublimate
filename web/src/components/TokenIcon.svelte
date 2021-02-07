<script lang="ts">
	import type { Ethereum } from '../types/ethereum'
	import type { TickerSymbol } from '../types/currency'
	import * as CryptoIcons from 'svelte-cryptoicon'

	export let token: TickerSymbol
	export let tokenAddress: Ethereum.ContractAddress | undefined
	export let tokenIcon: string

	$: isStreamable = token.startsWith('str')

	$: _token = isStreamable ? token.replace(/^str/, '') : token

	$: Icon = _token && CryptoIcons[_token[0].toUpperCase() + _token.slice(1).toLowerCase()]

	let loadingError = false
</script>

<picture class:is-streamable={isStreamable} title={token + (tokenAddress ? ` (${tokenAddress})` : '')}>
	{#if isStreamable}
		<div class="streamable-frame">
			<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="url(#p)" d="M6 6h38v38H6z"/><circle cx="25" cy="25" r="23.5" stroke="url(#paint0_linear)" stroke-width="3"/><defs><linearGradient id="paint0_linear" x1="25" y1="0" x2="25" y2="50" gradientUnits="userSpaceOnUse"><stop stop-color="#E894F6"/><stop offset="1" stop-color="#7D60F4" stop-opacity=".8"/></linearGradient><pattern id="p" patternContentUnits="objectBoundingBox" width="1" height="1"></pattern></defs></svg>
		</div>
	{/if}
	{#if globalThis.window && Icon}
		<svelte:component this={Icon} size="1.25em" />
	{:else if !loadingError && (tokenAddress || tokenIcon)}
		{#if tokenAddress}
			<source srcset="https://token-icons.s3.amazonaws.com/{tokenAddress.toLowerCase()}.png">
			<source srcset="https://tokens.1inch.exchange/{tokenAddress.toLowerCase()}.png">
		{/if}
		{#if tokenIcon}
			<source srcset={tokenIcon}>
		{/if}
		<img on:error={() => loadingError = true}>
	{:else}
		<i class="placeholder-icon" data-icon={_token?.slice(0, 4) ?? '?'}></i>
	{/if}
</picture>

<style>
	picture {
		display: inline-flex;
		/* height: 1em; */
		align-self: center;
		align-items: center;
	}
	picture.is-streamable {
		transform: scale(0.9);
		position: relative;
	}
	/* picture.is-streamable:before {
		content: '';
		width: 1.5em;
		height: 1.5em;

		background: 0 0/1em 1em url("data:image/svg+xml,%3Csvg width='50' height='50' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cpath fill='url(%23p)' d='M6 6h38v38H6z'/%3E%3Ccircle cx='25' cy='25' r='23.5' stroke='url(%23paint0_linear)' stroke-width='3'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear' x1='25' y1='0' x2='25' y2='50' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23E894F6'/%3E%3Cstop offset='1' stop-color='%237D60F4' stop-opacity='.8'/%3E%3C/linearGradient%3E%3Cpattern id='p' patternContentUnits='objectBoundingBox' width='1' height='1'%3E%3C/pattern%3E%3C/defs%3E%3C/svg%3E");
	} */
	.streamable-frame {
		position: absolute;
		inset: -0.2em;
		/* margin-top: -0.2em; */
	}
	.streamable-frame svg {
		width: 100%;
	}

	img, .placeholder-icon {
		font-size: 1.25em;
		width: 1em;
		height: 1em;
	}

	.placeholder-icon {
		background-color: rgba(50, 50, 50, 0.75);
		color: #fff;

		display: inline-flex;
		place-items: center;
		place-content: center;
		border-radius: 50%;
		overflow: hidden;
	}
	.placeholder-icon:before {
		content: attr(data-icon);

		font-size: 0.37em;
		font-style: normal;
		font-weight: 500;
	}
</style>
