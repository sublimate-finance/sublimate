<script lang="ts">
	export let segment: string

	import { scale } from 'svelte/transition'
	import Header from '../components/Header.svelte'
</script>

<Header {segment} />
<main class="stack">
	{#key segment}
		<div transition:scale={{start: 0.9}}>
			<slot />
		</div>
	{/key}
</main>
