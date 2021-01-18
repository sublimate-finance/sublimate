import HomePage from './pages/home.svelte'

type ComponentModule = {default: unknown}
export default [
	{
		name: 'Home',
		path: '',
		component: HomePage, // Home Page is bundled for faster user interaction
	},
	{
		name: 'Explore',
		path: 'explore',
		asyncComponent: (): Promise<ComponentModule> =>
			import('./pages/explore.svelte'),
	},
	{
		name: 'NotFound',
		path: '.*',
		asyncComponent: (): Promise<ComponentModule> =>
			import('./pages/404.svelte'),
	},
]
