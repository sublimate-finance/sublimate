<script lang="ts">
	import {getRouter} from '@curi/svelte'
	import {createEventDispatcher} from 'svelte'

	let _class: string = ''
	export {_class as class}

	export let params = {}
	export let state: any = null

	export let href: string = undefined
	export let blank: boolean = false
	export let type: string = undefined
	export let label: string

	export let disabled: boolean = false
	export let waitOnDisabled: boolean = false

	const dispatch = createEventDispatcher()

	let router = getRouter()
	let canNavigate = (event, target) => {
		return (
			!event.defaultPrevented &&
			!target &&
			event.button === 0 &&
			!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
		)
	}

	let url
	let target
	let handlePageLink
	$: {
		if (href && !href.startsWith('http')) {
			const split1 = href.split('#')
			const split2 = split1[0].split('?')
			const page = split2[0]
			const hash = split1[1]
			const query = split2[1]
			url = router.url({name: page, params, hash, query})
			target = $$restProps.target
			handlePageLink = (event) => {
				if (canNavigate(event, target)) {
					event.preventDefault()
					router.navigate({url, state})
				}
			}
		}
	}

	import {scale} from 'svelte/transition'
</script>

<style>
</style>

{#if href}
	{#if handlePageLink}
		<a
			aria-label={label}
			title={label}
			href={url}
			class="button {_class}"
			disabled={disabled || undefined}
			on:click={handlePageLink}
			transition:scale>
			<slot>Name</slot>
		</a>
	{:else}
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
	{/if}
{:else if type}
	<button class="button" aria-label={label} title={label} {type} disabled={disabled || undefined} transition:scale>
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
