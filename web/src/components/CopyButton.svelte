<script lang="ts">
	export let content

	let hasCopied = false

	function onClick(){
		// Write to clipboard
		navigator.clipboard.writeText(content)

		hasCopied = true
		setTimeout(() => hasCopied = false, 2000)
	}

	import Button from './Button.svelte'
</script>

<Button {...$$props} on:click={onClick}>
	{#if hasCopied}
		Copied!
	{:else}
		<slot>Copy</slot>
	{/if}
</Button>
