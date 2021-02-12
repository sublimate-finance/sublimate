// TODO: Replace with The Graph
export const creators = [
	{
		id: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
		address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
		profile: {
			name: 'Vitalik Buterin',
			ens: 'vitalik.eth',
			summary: 'Ethereum.',
			about: 'Daylight savings time delenda est.',
			avatar: 'https://pbs.twimg.com/profile_images/977496875887558661/L86xyLF4_400x400.jpg',
			cover: 'https://picsum.photos/1920/1080?1',
			website: 'https://vitalik.ca',
			twitter: 'https://twitter.com/VitalikButerin',
		},

		tokens: [{
			token: {
				symbol: 'strETH',
				decimals: 18
			},

			totalIncomingRate: 14e14,
			totalIncomingAmount: 14e14 * 3,
			totalIncomingSubscriptions: 1987,
			totalSubscribers: 1987 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}, {
			token: {
				id: '0x6b175474e89094c44da98b954eedeac495271d0f',
				symbol: 'strDAI',
				decimals: 18
			},

			totalIncomingRate: 89e14,
			totalIncomingAmount: 89e14 * 3,
			totalIncomingSubscriptions: 7934,
			totalSubscribers: 7934 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}],
		// 20483
		// 84907

		totalIncomingSubscriptions: 1987 + 7934,
		totalSubscribers: (1987 + 7934) * 0.9 | 0,
		totalOutgoingSubscriptions: 1987 + 7934,
		totalSubscribedTo: (1987 + 7934) * 0.9 | 0
	},
	{
		id: '0x30E7d7FfF85C8d0E775140b1aD93C230D5595207',
		address: '0x30E7d7FfF85C8d0E775140b1aD93C230D5595207',
		profile: {
			name: 'The Defiant',
			ens: '', // 'thedefiant.eth',
			summary: 'The DeFi news platform',
			about: 'Finance is being rebuilt to put people in control. Here’s where you can track and join this revolution.',
			avatar: 'https://pbs.twimg.com/profile_images/1311463933287505920/G50MgnEo_400x400.jpg',
			cover: 'https://picsum.photos/1920/1080?3',
			website: 'https://thedefiant.io',
			twitter: 'https://twitter.com/DefiantNews',
		},

		tokens: [{
			token: {
				symbol: 'strETH',
				decimals: 18
			},

			totalIncomingRate: 3.1e14,
			totalIncomingAmount: 3.1e14 * 3,
			totalIncomingSubscriptions: 12,
			totalSubscribers: 12 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 4,
			totalSubscribedTo: 2
		}, {
			token: {
				id: '0x6b175474e89094c44da98b954eedeac495271d0f',
				symbol: 'strDAI',
				decimals: 18
			},

			totalIncomingRate: 10e14,
			totalIncomingAmount: 10e14 * 3,
			totalIncomingSubscriptions: 2,
			totalSubscribers: 2,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}],

		// 3423/month
		// 674

		totalIncomingSubscriptions: 12 + 0,
		totalSubscribers: (12 + 0) * 0.9 | 0,
		totalOutgoingSubscriptions: 7,
		totalSubscribedTo: 4
	},
	// {
	// 	id: '0xae138430C6B78B536bC957e77640290858e149A91E',
	// 	address: '0xae138430C6B78B536bC957e77640290858e149A91E',
	// 	profile: {
	// 		name: 'Andre Cronje',
	// 		ens: 'andrecronje.eth',
	// 		summary: 'I test in prod',
	// 		about: '',
	// 		avatar: 'Placeholder',
	// 		cover: 'https://picsum.photos/1920/1080?2',
	// 		website: 'https://yearn.finance',
	// 		twitter: 'https://twitter.com/AndreCronjeTech',
	// 	},

	// 	tokens: [{
	// 		token: {
	// 			symbol: 'strETH',
	// 			decimals: 18
	// 		},

	// 		totalIncomingRate: 23e14,
	// 		totalIncomingAmount: 23e14 * 3,
	// 		totalIncomingSubscriptions: 321,
	// 		totalSubscribers: 321 * 0.9 | 0,

	// 		totalOutgoingRate: 0.00005e18,
	// 		totalMaxOutgoingAmount: 0.0002e18,
	// 		totalOutgoingSubscriptions: 3,
	// 		totalSubscribedTo: 2
	// 	}, {
	// 		token: {
	//			id: '0x6b175474e89094c44da98b954eedeac495271d0f',
	// 			symbol: 'strDAI',
	// 			decimals: 18
	// 		},

	// 		totalIncomingRate: 3,
	// 		totalIncomingAmount: 3 * 3,
	// 		totalIncomingSubscriptions: 7,
	// 		totalSubscribers: 7 * 0.9 | 0,

	// 		totalOutgoingRate: 0.00005e18,
	// 		totalMaxOutgoingAmount: 0.0002e18,
	// 		totalOutgoingSubscriptions: 3,
	// 		totalSubscribedTo: 2
	// 	}],
	// 	// 3402/month
	// 	// 590

	// 	totalIncomingSubscriptions: 321 + 7,
	// 	totalSubscribers: (321 + 7) * 0.9 | 0,
	// 	totalOutgoingSubscriptions: 321 + 7,
	// 	totalSubscribedTo: (321 + 7) * 0.9 | 0
	// },
	{
		id: '0xe03d6dfE9957e96CF3cB9f64ddFc1Dd80a5DAC55',
		address: '0xe03d6dfE9957e96CF3cB9f64ddFc1Dd80a5DAC55',
		profile: {
			name: 'Alex Masmej',
			ens: 'alex.eth',
			summary: 'Cofounder & CEO @tryShowtime',
			about: 'Cofounder & CEO @tryShowtime, the NFT social network. Previously: created a token called $ALEX.',
			avatar: 'https://pbs.twimg.com/profile_images/1258389717671870465/D_KLr6J5_400x400.jpg',
			cover: 'https://picsum.photos/1920/1080?5',
			website: 'https://tryshowtime.com',
			twitter: 'https://twitter.com/AlexMasmej',
		},

		tokens: [{
			token: {
				id: '0x8BA6DcC667d3FF64C1A2123cE72FF5F0199E5315',
				symbol: 'str$ALEX',
				decimals: 18
			},

			totalIncomingRate: 4e14,
			totalIncomingAmount: 4e14 * 3,
			totalIncomingSubscriptions: 10,
			totalSubscribers: 10 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}, {
			token: {
				id: '0x6b175474e89094c44da98b954eedeac495271d0f',
				symbol: 'strDAI',
				decimals: 18
			},

			totalIncomingRate: 32e14,
			totalIncomingAmount: 32 * 3,
			totalIncomingSubscriptions: 789,
			totalSubscribers: 789 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}],
		// 1897/month
		// 324

		totalIncomingSubscriptions: 10 + 789,
		totalSubscribers: (10 + 789) * 0.9 | 0,
		totalOutgoingSubscriptions: 10 + 789,
		totalSubscribedTo: (10 + 789) * 0.9 | 0
	},
	{
		id: '0x15A3F40976F8010f1744bc5358144b099BFDdfa',
		address: '0x15A3F40976F8010f1744bc5358144b099BFDdfa',
		profile: {
			name: 'NateAlex',
			ens: '',
			summary: 'NFT addict/collector',
			about: 'NFT addict/collector. Creator of http://chainfaces.co, http://infinft.com, http://squiggly.wtf, http://wg0.wrapped.army, and http://wiptoken.com',
			avatar: 'https://pbs.twimg.com/profile_images/1345818933358714882/zb10N7RP_400x400.jpg',
			cover: 'https://picsum.photos/1920/1080?6',
			website: 'https://chainfaces.co',
			twitter: 'https://twitter.com/NateAlexNFT',
		},

		tokens: [{
			token: {
				symbol: 'strETH',
				decimals: 18
			},

			totalIncomingRate: 4.6e14,
			totalIncomingAmount: 4.6e14 * 3,
			totalIncomingSubscriptions: 4,
			totalSubscribers: 4 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}, {
			token: {
				id: '0x6b175474e89094c44da98b954eedeac495271d0f',
				symbol: 'strDAI',
				decimals: 18
			},

			totalIncomingRate: 290e13,
			totalIncomingAmount: 290e13 * 3,
			totalIncomingSubscriptions: 2,
			totalSubscribers: 2 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}],
		// 1200/month
		// 34

		totalIncomingSubscriptions: 6,
		totalSubscribers: 6 * 0.9 | 0,
		totalOutgoingSubscriptions: 6,
		totalSubscribedTo: 4
	},
	{
		id: '0x77dcb3ac387f7da0737948ac897d8eadd4ce4264',
		address: '0x77dcb3ac387f7da0737948ac897d8eadd4ce4264',
		profile: {
			name: 'Stani Kulechov',
			ens: 'stani.eth',
			summary: 'Founder and CEO, Aave',
			about: 'Aave is an open source and non-custodial liquidity protocol for earning interest on deposits and borrowing assets.',
			avatar: 'https://pbs.twimg.com/profile_images/1322199309476126721/uX7iWP7J_400x400.jpg',
			cover: 'https://pbs.twimg.com/profile_banners/867100084248469505/1571663796/1500x500',
			website: 'https://aave.com',
			twitter: 'https://twitter.com/StaniKulechov',
		},

		tokens: [{
			token: {
				id: '0x328c4c80bc7aca0834db37e6600a6c49e12da4de',
				symbol: 'straSNX',
				decimals: 18,
			},

			totalIncomingRate: 7.85e14,
			totalIncomingAmount: 7.85e14 * 3,
			totalIncomingSubscriptions: 83,
			totalSubscribers: 83 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}, {
			token: {
				id: '0x6b175474e89094c44da98b954eedeac495271d0f',
				symbol: 'strDAI',
				decimals: 18
			},

			totalIncomingRate: 23e14,
			totalIncomingAmount: 23e14 * 3,
			totalIncomingSubscriptions: 3,
			totalSubscribers: 3 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}],
		// 0
		// 0

		totalIncomingSubscriptions: 83 + 3,
		totalSubscribers: (83 + 3) * 0.9 | 0,
		totalOutgoingSubscriptions: 83 + 3,
		totalSubscribedTo: (83 + 3) * 0.9 | 0
	},
	{
		id: '0xb2a03e995c98981013fefc5e140fb5a9da326c230',
		address: '0xb2a03e995c98981013fefc5e140fb5a9da326c230',
		profile: {
			name: 'Elon Musk',
			ens: '', // 'elon.eth',
			summary: '#bitcoin ₿',
			about: '',
			avatar: 'https://pbs.twimg.com/media/Etm4yFZUcAAoN5u?format=jpg&name=medium',
			cover: 'https://picsum.photos/1920/1080?4',
			website: '',
			twitter: 'https://twitter.com/elonmusk',
		},

		tokens: [{
			token: {
				id: '0xfc4b8ed459e00e5400be803a9bb3954234fd50e3',
				symbol: 'strwBTC',
				decimals: 18
			},

			totalIncomingRate: 23e14,
			totalIncomingAmount: 23e14 * 3,
			totalIncomingSubscriptions: 8,
			totalSubscribers: 8 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}, {
			token: {
				id: '0x6b175474e89094c44da98b954eedeac495271d0f',
				symbol: 'strDAI',
				decimals: 18
			},

			totalIncomingRate: 892e13,
			totalIncomingAmount: 892e13 * 3,
			totalIncomingSubscriptions: 0,
			totalSubscribers: 0 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}],
		// 200/month
		// 3

		totalIncomingSubscriptions: 8 + 0,
		totalSubscribers: (8 + 0) * 0.9 | 0,
		totalOutgoingSubscriptions: 8 + 0,
		totalSubscribedTo: (8 + 0) * 0.9 | 0
	},
	{
		id: '0x248601e0b0084ee51d53154ee148146b05216053',
		address: '0x248601e0b0084ee51d53154ee148146b05216053',
		profile: {
			name: 'Altcoin Daily',
			ens: '', // 'altcoindaily.eth',
			summary: 'Bitcoiners using alts to stack more BTC.',
			about: 'Brothers Aaron & Austin. Huge #bitcoin fundamentalists. Bitcoiners using alts to stack more BTC. Follow our YouTube channel for DAILY news & opinion videos!',
			avatar: 'https://pbs.twimg.com/profile_images/959000053267415041/FMOGeFYe_400x400.jpg',
			cover: 'https://picsum.photos/1920/1080?7',
			website: 'https://youtube.com/c/AltcoinDaily',
			twitter: 'https://twitter.com/AltcoinDailyio',
		},

		tokens: [{
			token: {
				symbol: 'strETH',
				decimals: 18
			},

			totalIncomingRate: 12e13,
			totalIncomingAmount: 12e13 * 3,
			totalIncomingSubscriptions: 23,
			totalSubscribers: 23 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}, {
			token: {
				id: '0x6b175474e89094c44da98b954eedeac495271d0f',
				symbol: 'strDAI',
				decimals: 18
			},

			totalIncomingRate: 4e13,
			totalIncomingAmount: 4e13 * 3,
			totalIncomingSubscriptions: 6,
			totalSubscribers: 6 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}],
		// 1342/month
		// 243

		totalIncomingSubscriptions: 23 + 0,
		totalSubscribers: (23 + 6) * 0.9 | 0,
		totalOutgoingSubscriptions: 23 + 0,
		totalSubscribedTo: (23 + 6) * 0.9 | 0
	},
	{
		id: '0x4f0fa30d9a0a7bdd053210e6f220255fd64a3a22',
		address: '0x4f0fa30d9a0a7bdd053210e6f220255fd64a3a22',
		profile: {
			name: 'Coin Bureau',
			ens: 'guy.eth',
			summary: 'The Crypto Coin Authority',
			about: 'The Crypto Coin Authority. Bringing you the latest news, reviews and information to hit the blockchain.',
			avatar: 'https://pbs.twimg.com/profile_images/1346484573736153090/HjiIfcSv_400x400.jpg',
			cover: 'https://picsum.photos/1920/1080?8',
			website: 'https://https://guy.coinbureau.com/socials',
			twitter: 'https://twitter.com/Coinbureau',
		},

		tokens: [{
			token: {
				symbol: 'strETH',
				decimals: 18
			},

			totalIncomingRate: 2.7e14,
			totalIncomingAmount: 2.7e14 * 3,
			totalIncomingSubscriptions: 298,
			totalSubscribers: 298 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}, {
			token: {
				id: '0x6b175474e89094c44da98b954eedeac495271d0f',
				symbol: 'strDAI',
				decimals: 18
			},

			totalIncomingRate: 5e13,
			totalIncomingAmount: 5e13 * 3,
			totalIncomingSubscriptions: 0,
			totalSubscribers: 0 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}],

		// 4763/month
		// 1230

		totalIncomingSubscriptions: 298 + 0,
		totalSubscribers: (298 + 0) * 0.9 | 0,
		totalOutgoingSubscriptions: 298 + 0,
		totalSubscribedTo: (298 + 0) * 0.9 | 0
	},
	{
		id: '0xe72f79190bc8f92067c6a62008656c6a9077f6aa',
		address: '0xe72f79190bc8f92067c6a62008656c6a9077f6aa',
		profile: {
			name: 'The Daily Gwei',
			ens: '',
			summary: 'Daily newsletter and daily video recaps of the Ethereum ecosystem.',
			about: 'The Daily Gwei turbocharges your Ethereum knowledge with a daily newsletter and daily video recaps of the entire ecosystem.',
			avatar: 'https://pbs.twimg.com/profile_images/1330140249473867776/445LpXfZ_400x400.jpg',
			cover: 'https://picsum.photos/1920/1080?9',
			website: 'https://thedailygwei.substack.com',
			twitter: 'https://twitter.com/Thedailygwei',
		},

		tokens: [{
			token: {
				symbol: 'strETH',
				decimals: 18
			},

			totalIncomingRate: 1.4e14,
			totalIncomingAmount: 1.4e14 * 3,
			totalIncomingSubscriptions: 54,
			totalSubscribers: 54 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}, {
			token: {
				id: '0x6b175474e89094c44da98b954eedeac495271d0f',
				symbol: 'strDAI',
				decimals: 18
			},

			totalIncomingRate: 2e13,
			totalIncomingAmount: 2e13 * 3,
			totalIncomingSubscriptions: 32,
			totalSubscribers: 32 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}],
		// 0
		// 0

		totalIncomingSubscriptions: 54 + 32,
		totalSubscribers: (54 + 32) * 0.9 | 0,
		totalOutgoingSubscriptions: 54 + 32,
		totalSubscribedTo: (54 + 32) * 0.9 | 0
	},
	{
		id: '0xe72f79190bc8f92067c6a62008656c6a9077f6aa',
		address: '0xe72f79190bc8f92067c6a62008656c6a9077f6aa',
		profile: {
			name: 'Unstoppable Brad',
			ens: 'brad.crypto',
			summary: 'Replace cryptocurrency addresses with a human readable name.',
			about: '',
			avatar: 'https://picsum.photos/200/200',
			cover: 'https://picsum.photos/1920/1080?9',
			website: 'https://unstoppabledomains.com/',
			twitter: 'https://twitter.com/unstoppableweb',
		},

		tokens: [{
			token: {
				symbol: 'strETH',
				decimals: 18
			},

			totalIncomingRate: 1.2e14,
			totalIncomingAmount: 1.2e14 * 3,
			totalIncomingSubscriptions: 64,
			totalSubscribers: 64 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}, {
			token: {
				id: '0x6b175474e89094c44da98b954eedeac495271d0f',
				symbol: 'strDAI',
				decimals: 18
			},

			totalIncomingRate: 2e13,
			totalIncomingAmount: 2e13 * 3,
			totalIncomingSubscriptions: 32,
			totalSubscribers: 32 * 0.9 | 0,

			totalOutgoingRate: 0.00005e18,
			totalMaxOutgoingAmount: 0.0002e18,
			totalOutgoingSubscriptions: 3,
			totalSubscribedTo: 2
		}],
		// 0
		// 0

		totalIncomingSubscriptions: 64 + 32,
		totalSubscribers: (64 + 32) * 0.9 | 0,
		totalOutgoingSubscriptions: 64 + 32,
		totalSubscribedTo: (64 + 32) * 0.9 | 0
	},

	// Andre Cronje (demo)
	{
		id: '0x0FEB417e1420953ed23B6dB4a8788c51912042a5c',
		address: '0x0FEB417e1420953ed23B6dB4a8788c51912042a5c',
		profile: {
			name: '',
			ens: '',
			summary: '',
			about: '',
			avatar: 'https://picsum.photos/200/200',
			cover: 'https://picsum.photos/1920/1080',
			website: '',
			twitter: ''
		},

		tokens: [{
			token: {
				symbol: 'strETH',
				decimals: 18
			},

			totalIncomingRate: 0,
			totalMaxIncomingAmount: 0,
			totalIncomingSubscriptions: 0,
			totalSubscribers: 0,

			totalOutgoingRate: 0, //
			totalMaxOutgoingAmount: 0, //
			totalOutgoingSubscriptions: 1, //
			totalSubscribedTo: 1 //
		}, {
			token: {
				id: '0x6b175474e89094c44da98b954eedeac495271d0f',
				symbol: 'strDAI',
				decimals: 18
			},

			totalIncomingRate: 0,
			totalMaxIncomingAmount: 0,
			totalIncomingSubscriptions: 0,
			totalSubscribers: 0,

			totalOutgoingRate: 0, //
			totalMaxOutgoingAmount: 0, //
			totalOutgoingSubscriptions: 1, //
			totalSubscribedTo: 1 //
		}, {
			token: {
				id: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
				symbol: 'strYFI',
				decimals: 18
			},

			totalIncomingRate: 0,
			totalMaxIncomingAmount: 0,
			totalIncomingSubscriptions: 0,
			totalSubscribers: 0,

			totalOutgoingRate: 0, //
			totalMaxOutgoingAmount: 0, //
			totalOutgoingSubscriptions: 1, //
			totalSubscribedTo: 1 //
		}],

		totalIncomingSubscriptions: 0,
		totalSubscribers: 0,
		totalOutgoingSubscriptions: 2,
		totalSubscribedTo: 2
	},
]


export const featuredCreators = creators.slice(0, 3)
