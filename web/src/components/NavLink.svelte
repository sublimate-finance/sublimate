<script lang="ts">
	export let name: string
	export let params: any = {}
	export let partial: boolean = false

	import Link from '../_routing/curi/Link.svelte'
	import {getRouter, getResponse} from '@curi/svelte'
	import {active as activeInteraction} from '@curi/interactions'

	let router = getRouter()
	let response = getResponse()

	let active: boolean
	$: route = router.route(name)
	$: active =
		$response && activeInteraction(route, $response, {params, partial})
</script>

<style>
	li {
		display: flex;
		align-items: center;
		padding: calc(var(--space-inner) / 2);
	}
</style>

<li>
	<Link class={active ? 'active' : ''} {name} {params}>
		<slot />
	</Link>
</li>
