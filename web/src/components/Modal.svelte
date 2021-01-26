<script lang="ts">
	import {createEventDispatcher, onDestroy} from 'svelte'

	export let closeButton: boolean = true
	export let title: string
	export let cancelable: boolean = true
	export let width

	const dispatch = createEventDispatcher()
	const close = () => cancelable && dispatch('close')

	let modal

	function onKeydown(evt: KeyboardEvent | undefined) {
		evt = evt || (window.event as KeyboardEvent)
		let isEscape = false
		if ('key' in evt) {
			isEscape = evt.key === 'Escape' || evt.key === 'Esc'
		} else {
			isEscape = (evt as KeyboardEvent).keyCode === 27
		}
		if (isEscape) {
			close()
			return
		}

		if (evt.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*')
			const tabbable = Array.from(nodes).filter(
				(n: any) => n.tabIndex >= 0
			)

			let index = tabbable.indexOf(document.activeElement)
			if (index === -1 && evt.shiftKey) index = 0

			index += tabbable.length + (evt.shiftKey ? -1 : 1)
			index %= tabbable.length

			;(tabbable[index] as HTMLElement).focus &&
				(tabbable[index] as HTMLElement).focus()
			evt.preventDefault()
		}
	}

	const previously_focused =
		typeof document !== 'undefined' && document.activeElement

	if (previously_focused) {
		onDestroy(() => {
			const htmlElement = previously_focused as HTMLElement
			if (htmlElement.focus) {
				htmlElement.focus()
			}
		})
	}

	import { fade, scale } from 'svelte/transition';
</script>

<style>
	.modal-container {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		inset: 0;
		z-index: 1;
	}
	.modal-overlay {
		position: fixed;
		inset: 0;
		background-color: var(--accent-color);
		opacity: 0.3;
	}

	.modal {
		backdrop-filter: blur(--overlay-backdrop-filter);
		position: relative;
		--space-inner: 1rem;

		width: var(--modal-width);
		max-width: 100%;
	}

	.modal-content {
		display: grid;
		gap: var(--space-inner);
	}

	.modal-close {
		position: absolute;
		right: 0;
		top: 0;
		cursor: pointer;
		fill: currentColor;
	}
</style>

<svelte:window on:keydown={onKeydown} />

<div class="modal-container" style="--modal-width: {width}" transition:fade={{duration: 300}}>
	<div on:click={close} class="modal-overlay" />

	<div class="modal card" transition:scale={{duration: 300}}>
		{#if title || closeButton}
			<div class="bar modal">
				{#if title}
					<h3>{title}</h3>
				{/if}
				{#if closeButton}
					<div on:click={close} class="modal-close">
						<svg width="18" height="18" viewBox="0 0 18 18">
							<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
						</svg>
					</div>
				{/if}
			</div>
		{/if}

		<div class="modal-content" bind:this={modal}>
			<slot />
		</div>
		<div class="flex justify-end pt-2">
			<slot name="footer" />
		</div>
	</div>
</div>
