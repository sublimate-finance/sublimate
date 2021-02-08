<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	let _class: string = ''
	export {_class as class}

	export let href: string = undefined
	export let blank: boolean = false
	export let type: string = undefined
	export let label: string

	export let disabled: boolean = false

	const dispatch = createEventDispatcher()

	import {scale} from 'svelte/transition'
</script>

<style>
</style>

{#if href}
	<a
		aria-label={label}
		title={label}
		{href}
		class="button {_class}"
		rel={blank === true ? 'noopener noreferrer' : ''}
		target={blank === true ? '_blank' : ''}
		disabled={disabled || undefined}
		transition:scale>
		<slot>Name</slot>
	</a>
{:else if type}
	<button class="button {_class}" aria-label={label} title={label} {type} disabled={disabled || undefined} transition:scale>
		<slot>Name</slot>
	</button>
{:else}
	<button
		on:click={() => dispatch('click')}
		aria-label={label}
		title={label}
		type="button"
		class="button {_class}"
		disabled={disabled || undefined}
		transition:scale>
		<slot>Name</slot>
	</button>
{/if}
