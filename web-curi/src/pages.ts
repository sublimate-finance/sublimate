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
		name: '(Test)',
		path: 'test',
		asyncComponent: (): Promise<ComponentModule> =>
			import('./pages/test.svelte'),
	},
	{
		name: 'Dashboard',
		path: 'dashboard',
		asyncComponent: (): Promise<ComponentModule> =>
			import('./pages/dashboard.svelte')
	},
	{
		name: 'Creator',
		path: 'creator',
		asyncComponent: (): Promise<ComponentModule> =>
			import('./pages/creator.svelte')
	},
	{
		name: 'NotFound',
		path: '(.*)',
		asyncComponent: (): Promise<ComponentModule> =>
			import('./pages/404.svelte'),
	}
]