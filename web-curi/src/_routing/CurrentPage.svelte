<script lang="ts">
	import {getResponse} from '@curi/svelte';
	const response = getResponse();

	import { scale } from 'svelte/transition'
</script>

<main class="stack">
	{#if $response}
		{#key $response.body}
			<div transition:scale={{start: 0.9}}>
				<svelte:component this={$response.body} />
			</div>
		{/key}
	{:else}
		<slot />
	{/if}
</main>
