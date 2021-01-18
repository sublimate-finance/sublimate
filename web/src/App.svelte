<script lang="ts">
	import {Router, CurrentPage} from './_routing'
	import pages from './pages'

	import LoadingBar from './components/LoadingBar.svelte'
	import Nav from './components/Nav.svelte'
	import Navigating from './_routing/curi/Navigating.svelte'
	import Notifications from './components/Notifications.svelte'
</script>

<Router
	{pages}
	globalQueryStrings={['subgraph', 'debug', 'log', 'trace', '_d_eruda']}>
	<Notifications />
	<Nav links={['Home', 'Explore']} />
	<CurrentPage>
		<LoadingBar />
		Loading...
	</CurrentPage>
	<Navigating component={LoadingBar} />
</Router>
